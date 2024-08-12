import { Component } from '@angular/core';
import { UserLoginDto } from '../../Entities/user-login-dto';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
 


  user: UserLoginDto = new UserLoginDto('', '');
  errorMessage: string='';

  constructor(private authService: UserServiceService,private router:Router,private authService1: AuthServiceService,) { }

  login() {
    console.log(this.user);
    this.authService.loginUser(this.user)
      .subscribe(
        response => {
          // Handle successful login
          console.log('Login successful:', response);
          const userId = response.id;
          // this.authService1.login();
          // this.router.navigate(['/user-registration/selectPlace'],{ queryParams: { id: userId } });
          const token = response.token;
          const role = response.role;
          const id=response.id;
          this.authService1.login(token, role,id);

        Swal.fire({
          title: "LOGIN",
          text: "Login-Successful!",
          icon: "success"
        }).then(() => {
          // Execute code after the alert is closed
          if (role === 'USER') {
            this.router.navigate(['/user-registration/selectPlace'], { queryParams: { id: userId } });
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin-registration/adminTouristGuides']);
          }
        });
      },
        error => {
        
      console.error('Login error:', error);
      // Extract error details
      const errorMessage = error.error?.message || 'An error occurred during login';
      const errorStatus = error.status || 500;
      const errorPath = error.error?.path || '';

     this.errorMessage = `Error: ${errorMessage}  (Status: ${errorStatus}, Path: ${errorPath})`;

      // Optionally show the error in a SweetAlert2 notification
      Swal.fire({
        title: "Error",
        text: this.errorMessage,
        icon: "error"
      });
    }
  );
  }
  navigateToRegister() {
    this.router.navigate(['/admin-registration/forgotPassword']);
  }
  navigateToSignUp(){
    this.router.navigate(['/admin-registration/adminRegister']);
 }

}


