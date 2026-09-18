# FinDash — Angular Fintech Mini Dashboard

A small fintech-style dashboard built with Angular to practice patterns that
come up often in real interview take-homes: dynamic reactive forms, race
condition handling with RxJS, and coordinated token refresh in an HTTP
interceptor.

Built with **Angular 19** (standalone components, signals, typed reactive
forms) and a mocked backend (`HttpBackend` override) so the whole app runs
without a real API.

## Features

- **Beneficiary search** — a debounced, cancel-safe search box
  (`debounceTime` + `distinctUntilChanged` + `switchMap`) that avoids
  race conditions between rapidly-typed queries.
- **Account detail** — reactively re-fetches account data as the route
  parameter changes, backed by an aggregate service with an in-memory cache.
- **Onboarding form** — a 15+ field dynamic reactive form: an optional,
  dynamically added/removed `companyDetails` group, and a `FormArray` of
  signatories that can be added and removed at runtime. Uses `OnPush` change
  detection and `updateOn: 'blur'` for performance.
- **Auth & token refresh** — a functional HTTP interceptor coordinates
  concurrent requests during a token refresh so only a single refresh call
  is in flight at a time, with typed state handling for success/failure.
- **Mocked API layer** — an `HttpBackend` override simulates network
  latency and both success/error responses, so the app is fully runnable
  and testable without a backend.

## Tech stack

- Angular 19 (standalone components, signals, `@angular/forms`, `@angular/router`)
- RxJS 7
- SCSS for styling, with a small shared design system in `src/styles.scss`

## Getting started

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`.

## Project structure

```
src/
├── accounts/        # accounts list, account detail, aggregate service
├── app/              # root shell, routes, app config
├── onboarding/        # dynamic onboarding form
├── search/            # beneficiary search
├── services/           # auth, interceptor, token refresh coordinator, mock API, interfaces
├── transactions/         # transactions page (placeholder)
├── playground/            # scratch page (placeholder)
├── navshell.component.*    # top navigation
└── styles.scss              # shared design tokens & utility classes
```

## Roadmap

- [ ] Virtual-scrolled list for large record sets (`@angular/cdk`)
- [ ] Global error handling + safe statement rendering (`DomSanitizer`)
- [ ] Build out the accounts list and transactions views
