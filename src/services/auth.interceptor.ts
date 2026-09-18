import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { catchError, switchMap, take, throwError } from "rxjs";
import { TokenRefreshCoordinator } from "./token-coordinator.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const coordinator = inject(TokenRefreshCoordinator);
  const token = authService.getAccessToken();


  if (req.url.startsWith('/api') && token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(newReq).pipe(
      catchError((error) => {
        if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
          return throwError(() => error);
        }

        if (coordinator.isRefreshing) {
            return coordinator.onRefreshSettled().pipe(
              take(1),
              switchMap((state) => {
                if (state.status !== 'succeeded') {
                  authService.logout()
                  return throwError(() => new Error('Token refresh not completed'));
                }
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${state.token}`
                  }
                });
                return next(retryReq);
              })
            );
        }

        coordinator.startRefreshCycle();
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            authService.login(newToken);
            coordinator.completeRefreshCycle(newToken);
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError((err) => {
            coordinator.failRefreshCycle();
            authService.logout();
            return throwError(() => err);
          })
        );
      })
    );
  }
  return next(req);
};