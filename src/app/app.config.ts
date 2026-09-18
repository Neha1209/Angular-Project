import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpBackend, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { MockHttpBackend } from '../services/mock-server';
import { provideHttpClient } from '@angular/common/http';
import { authInterceptor } from '../services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  //every HttpClient call in your app now flows through your interceptor first, 
  // then hits your mock backend instead of a real network call.
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: HttpBackend, useClass: MockHttpBackend },
  ],
};
