import { Component, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserProfileComponent } from '../../User/user-profile/user-profile.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  // constructor(public authService: AuthServiceService) {}

  // Adminlogout() {
  //   this.authService.logout();
  // }
  @ViewChild('profileComponent') profileComponent!: UserProfileComponent;


  constructor(public authService: AuthServiceService) {}

  Adminlogout() {
    this.authService.logout();
  }

  openProfile() {
    this.profileComponent.openProfile();
  }


}
