import { Component } from "@angular/core";
import { AccountAggregateService } from "./account-aggregate.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, Subscription, switchMap } from "rxjs";
import { IAccount } from "../services/interfaces";

@Component({
    selector: "app-account-detail",
    template: `<section class="page">
  <header class="page-header">
    <h1>Account Detail</h1>
    <p class="page-subtitle">Account details will be displayed here.</p>
  </header>

  <div class="card" *ngIf="accountdetails; else loading">
    <dl class="detail-list">
      <div class="detail-row">
        <dt>Account ID</dt>
        <dd>{{ accountdetails.id }}</dd>
      </div>
      <div class="detail-row">
        <dt>Nickname</dt>
        <dd>{{ accountdetails.nickname }}</dd>
      </div>
      <div class="detail-row">
        <dt>Balance</dt>
        <dd class="balance">{{ accountdetails.balanceCents }} cents</dd>
      </div>
      <div class="detail-row">
        <dt>Currency</dt>
        <dd>{{ accountdetails.currency }}</dd>
      </div>
    </dl>
  </div>
  <ng-template #loading>
    <p class="empty-state">Loading account details…</p>
  </ng-template>
</section>`,
    imports: [CommonModule],
    standalone: true,
})
export class AccountDetailComponent {
    accountId: string = "";
    accountdetails: IAccount | null = null;
   private subscription?: Subscription

    constructor(
        private route: ActivatedRoute,
        private accountAggregateService: AccountAggregateService,
    ) {}

    ngOnInit() {
        this.subscription = this.route.paramMap
            .pipe(
                map((params) => params.get("id")!),
                switchMap((id) => this.accountAggregateService.getAccount(id)),
            )
            .subscribe({
                next: (account) => (this.accountdetails = account),
                error: (error) =>
                    console.error("Error fetching account details:", error),
            });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
