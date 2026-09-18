import { computed, Injectable, signal } from "@angular/core";
import { delay, of, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

  @Injectable({ providedIn: 'root' })
  export class AuthService {
    private _accessToken = signal<string | null>(null);
    isAuthenticated = computed(() => this._accessToken() !== null);

    getAccessToken(): string | null {
      return this._accessToken();
    }
    login(token: string): void {
      this._accessToken.set(token);
    }
    logout(): void {
      this._accessToken.set(null);
    }

    refreshToken(): Observable<string> {
      console.log('Refreshing token...');
      return of('valid-token').pipe(delay(500));
    }
  }