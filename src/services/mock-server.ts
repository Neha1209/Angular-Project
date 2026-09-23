import {
  HttpBackend,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount, IBeneficiary } from './interfaces';

@Injectable()
export class MockHttpBackend implements HttpBackend {
  private ACCOUNTS: IAccount[] = Array.from({ length: 100000 }, (_, i) => ({ id: `account-${i + 1}`, nickname: `Account ${i + 1}`, balanceCents: (i + 1) * 1000, currency: 'USD' }));
  
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      const timer = setTimeout(() => {
        if (req.method === 'GET' && req.url === '/api/accounts') {
          if (req.headers.get('Authorization') !== 'Bearer valid-token') {
            observer.error(
              new HttpErrorResponse({
                status: 401,
                statusText: 'Unauthorized',
                url: req.url,
              }),
            );
          } else {
            observer.next(
              new HttpResponse({
                status: 200,
                statusText: 'OK',
                body: this.ACCOUNTS
              }),
            );
            observer.complete();
          }
        } else if (req.method === 'GET' && req.url === '/api/beneficiaries/search') {
          const searchTerm = req.params.get('q')?.toLowerCase() || '';
          const beneficiaries = [
            {
              id: '789',
              name: 'John Doe',
              bankName: 'Bank of America',
              accountLast4: '1234',
            },
            {
              id: '012',
              name: 'Jane Smith',
              bankName: 'Chase Bank',
              accountLast4: '5678',
            },
            {
              id: '345',
              name: 'Alice Johnson',
              bankName: 'Wells Fargo',
              accountLast4: '9012',
            },
          ];
          const filteredBeneficiaries: IBeneficiary[] = beneficiaries.filter((beneficiary) =>
            beneficiary.name.toLowerCase().includes(searchTerm),
          );
          if (req.headers.get('Authorization') !== 'Bearer valid-token') {
            observer.error(
              new HttpErrorResponse({
                status: 401,
                statusText: 'Unauthorized',
                url: req.url,
              }),
            );
          } else {
            observer.next(
              new HttpResponse({
                status: 200,
                statusText: 'OK',
                body: filteredBeneficiaries,
              }),
            );
            observer.complete();
          }
        } else if (req.method === 'GET' && req.url.startsWith('/api/accounts/')) {
          const accountId = req.url.split('/').pop();
          const account = this.ACCOUNTS.find((a) => a.id === accountId);
          if (req.headers.get('Authorization') !== 'Bearer valid-token') {
            observer.error(
              new HttpErrorResponse({
                status: 401,
                statusText: 'Unauthorized',
                url: req.url,
              }),
            );
          } else if (!account) {
            observer.error(
              new HttpErrorResponse({
                status: 404,
                statusText: 'Not Found',
                url: req.url,
              }),
            );
          }
          else {
            observer.next(
              new HttpResponse({
                status: 200,
                statusText: 'OK',
                body: account,
              }),
            );
            observer.complete();
          }
        } else {
          observer.error(
            new HttpErrorResponse({
              status: 404,
              statusText: 'Not Found',
              url: req.url,
            }),
          );
        }
      }, 500);
      return () => clearTimeout(timer);
    });
  }
}
