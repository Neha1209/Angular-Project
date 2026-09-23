import { Component, OnInit } from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IAccount } from '../services/interfaces';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    DecimalPipe,
    RouterLink,
  ],
  standalone: true,
})
export class AccountsComponent implements OnInit {
  accounts: IAccount[] = [];

  // Single source of truth for row height: drives both the viewport's
  // itemSize (positioning math) and the row's actual CSS height, via a
  // CSS custom property set in the template. Keeping these two in sync
  // manually is exactly what caused the earlier gap-between-rows bug.
  protected readonly rowHeight = 50;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<IAccount[]>('/api/accounts').subscribe({
      next: (accounts) => (this.accounts = accounts),
      error: (error) => console.error('Error fetching accounts:', error),
    });
  }

  trackByAccount(index: number, account: IAccount): string {
    return account.id;
  }
}
