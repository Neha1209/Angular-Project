import { Injectable } from '@angular/core';
import { IAccount } from '../services/interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountAggregateService {
    constructor(private http: HttpClient) { }
    private cache = new Map<string, IAccount>()

//checks the cache first (return of(cachedValue) on a hit — no HTTP call at all), and 
// on a miss, calls this.http.get<IAccount>(\/api/accounts/${id}`), storing the result 
// in the cache **only if the request succeeds
    getAccount (id: string): Observable<IAccount> {
        if (this.cache.has(id)) {
            return of(this.cache.get(id)!)
        } else {
            return this.http.get<IAccount>(`/api/accounts/${id}`).pipe(
                tap(account => this.cache.set(id, account))
            )
        }

    }
}
