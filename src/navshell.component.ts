import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component ({
  selector: 'app-navshell',
  templateUrl: './navshell.component.html',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  styleUrl: './navshell.component.scss'
})

export class NavShellComponent {
  constructor(protected authService: AuthService) {}
}