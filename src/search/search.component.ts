import { Component, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subscription, debounceTime, distinctUntilChanged, of, switchMap } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { IBeneficiary } from "../services/interfaces";

@Component ({
  selector: 'app-search',
  template: `<section class="page">
  <header class="page-header">
    <h1>Search</h1>
    <p class="page-subtitle">Find a beneficiary by name, bank, or account.</p>
  </header>

  <input class="search-input" type="text" [formControl]="searchTerm" placeholder="Search beneficiaries..." />

  <div class="results-list">
    @for (b of results(); track b.id) {
      <div class="result-card">
        <div class="result-card__main">
          <span class="result-card__name">{{ b.name }}</span>
          <span class="result-card__bank">{{ b.bankName }}</span>
        </div>
        <span class="result-card__account">•••• {{ b.accountLast4 }}</span>
      </div>
    } @empty {
      <p class="empty-state">No results yet — start typing to search.</p>
    }
  </div>
</section>`,
  imports: [ReactiveFormsModule],
  standalone: true
})

export class SearchComponent {
  constructor(private httpClient: HttpClient) {}
  searchTerm: FormControl<string> = new FormControl('', { nonNullable: true });
  results = signal<IBeneficiary[]>([])
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    this.searchSubscription = this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.trim() === '' ? of([]) :
          this.httpClient.get<IBeneficiary[]>('/api/beneficiaries/search', { params: { q: term } })
        )
      )
      .subscribe({
        next: (response) => this.results.set(response),
        error: (error) => console.error('API error:', error),
      });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

}
