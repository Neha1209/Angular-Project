import { Routes } from '@angular/router';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
    // Default route (redirects empty path to /home)
  { path: '', redirectTo: 'accounts', pathMatch: 'full' }, 
  
  // Standard routes
  { path: 'accounts', loadComponent: () => import('../accounts/accounts.component').then(m => m.AccountsComponent) },
  { path: 'accounts/:id', loadComponent: () => import('../accounts/account-detail.component').then(m => m.AccountDetailComponent) },
  { path: 'transactions', loadComponent: () => import('../transactions/transactions.component').then(m => m.TransactionsComponent) },
  { path: 'search', loadComponent: () => import('../search/search.component').then(m => m.SearchComponent) },
  { path: 'playground', loadComponent: () => import('../playground/playground.component').then(m => m.PlaygroundComponent), canActivate: [authGuard] },
  { path: 'onboarding', loadComponent: () => import('../onboarding/onboarding.component').then(m => m.OnboardingComponent), canActivate: [authGuard] },
];
