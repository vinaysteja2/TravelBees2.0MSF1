import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user: any;
   userId: number = Number(localStorage.getItem("id"));
  //userId: number = 24;
  errorMessage: string | undefined;
  isVisible = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService,
    public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data: any) => {
        this.user = data;
        console.log(data);
      },
      (error: any) => {
        this.errorMessage = 'Failed to retrieve user details. Please try again.';
      }
    );
  }

  openProfile() {
    this.isVisible = true;
    this.userId= Number(localStorage.getItem("id"));
    this.getUserDetails();
  }

  closeProfile() {
    this.isVisible = false;

  }

  

  logout() {
    this.isVisible = false;
    this.authService.logout();
  }
}