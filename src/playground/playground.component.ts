import { Component } from "@angular/core";

@Component ({
  selector: 'app-playground',
  template: `<section class="page">
  <header class="page-header">
    <h1>Playground</h1>
    <p class="page-subtitle">Welcome to the playground page!</p>
  </header>
</section>`,
  imports: [],
  standalone: true
})

export class PlaygroundComponent {
}
