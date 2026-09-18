import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavShellComponent } from "../navshell.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavShellComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Project';

constructor(private httpClient: HttpClient, private authService: AuthService) {}

ngOnInit() {
  this.authService.login('valid-token');

  this.httpClient.get('/api/accounts').subscribe({
    next: (response) => console.log('API response (1):', response),
    error: (error) => console.error('API error (1):', error),
  });
}

}
