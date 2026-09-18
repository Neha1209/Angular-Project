import {Injectable} from "@angular/core";
import { BehaviorSubject, filter, map, Observable } from 'rxjs'

type RefreshState =
    | { status: 'idle' }
    | { status: 'refreshing' }
    | { status: 'succeeded'; token: string }
    | { status: 'failed' };

@Injectable({ providedIn: 'root' })
//when multiple independent requests hit a 401 around the same time, only one of them 
//should actually trigger a refresh, and the rest should just wait for that one's result.

export class TokenRefreshCoordinator {
    isRefreshing: boolean = false;
    private state = new BehaviorSubject<RefreshState>({ status: 'idle' });

//called by whichever request is the first to hit a 401. Marks a refresh as in-progress.
startRefreshCycle() {
    this.isRefreshing = true;
    this.state.next({ status: 'refreshing' }); // Notify all subscribers that a refresh is in progress
}

//called once the actual refreshToken() HTTP call succeeds.
completeRefreshCycle(token: string) {
    this.isRefreshing = false;
    this.state.next({ status: 'succeeded', token });
}

//called if the refresh call itself fails
failRefreshCycle() {
    this.isRefreshing = false;
    this.state.next({ status: 'failed' });
}

onRefreshSettled(): Observable<RefreshState> {
  return this.state.pipe(
    filter((state): state is { status: 'succeeded'; token: string } | { status: 'failed' } =>
      state.status === 'succeeded' || state.status === 'failed'
    )
  );
}

} 