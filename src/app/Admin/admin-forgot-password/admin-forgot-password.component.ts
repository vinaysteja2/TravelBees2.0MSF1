import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrl: './admin-forgot-password.component.css'
})
export class AdminForgotPasswordComponent {

  email2:string='';
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]],
      
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const forgotPasswordDto = this.registrationForm.value;
      console.log(forgotPasswordDto);
      this.userService.forgotPassword(forgotPasswordDto).subscribe(
        (data) => {
          console.log('valid Email', data);
          console.log('valid Email', data.email);
    
          Swal.fire({
            title: "Valid Email",
            text: "now it is navigating",
            icon: "success"
          }).then(() => {
          this.router.navigate(['/admin-registration/resetPassword'],{ queryParams: { email:data.email}});
        });
        },
        (error) => {
          console.error('Error email', error);
          const errorMessage = error.error;
         // this.errorMessage = `Error: ${errorMessage}`;
          Swal.fire({
            title: "Error",
            text: error.error,
            icon: "error"
          });
        }
      );
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registrationForm.get(field);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (control.errors['minlength']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} requires at least ${control.errors['minlength'].requiredLength} characters`;
      } else if (control.errors['email']) {
        return `Please enter a valid email address`;
      } else if (control.errors['pattern']) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} requires 10 digits`;
      }
    }
    return '';
  }

  navigateToLogin() {
    this.router.navigate(['/user-registration/userLogin']);
  }


}
