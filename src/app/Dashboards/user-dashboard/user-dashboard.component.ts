import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserProfileComponent } from '../../User/user-profile/user-profile.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent{
  
  @ViewChild('profileComponent') profileComponent!: UserProfileComponent;



  constructor(public authService: AuthServiceService) {}

  logout() {
    this.authService.logout();
  }

  openProfile() {
    this.profileComponent.openProfile();
  }

  
}
