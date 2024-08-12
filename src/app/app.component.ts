import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MTravelBees';

  constructor(private router: Router) {}

  isAdminRegistrationRoute(): boolean {
    return this.router.url === '/admin-registration';
  }

  isUserRegistrationRoute(): boolean {
    return this.router.url === '/user-registration';
  }
  
}
