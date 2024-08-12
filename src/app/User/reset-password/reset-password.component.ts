import { Component } from '@angular/core';

import { UserServiceService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  registrationForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private userService: UserServiceService, private router: Router,
    private route: ActivatedRoute, 
    ) { }

  ngOnInit(): void {
    const email1 = this.route.snapshot.queryParamMap.get('email') || '';
    console.log("hi",email1);
    this.registrationForm = this.formBuilder.group({
    
       email:[email1],
      //email: [{ value: email, disabled: true }, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const resetPassword = this.registrationForm.value;
      console.log( resetPassword );
      this.userService.resetPassword(resetPassword).subscribe(
        (data) => {
          console.log('Password Updated Successfully', data);
          Swal.fire({
            title: "ResetPassword",
            text: "password updated-Successfully!",
            icon: "success"
          }).then(() => {
          this.router.navigate(['/user-registration/userLogin']);
        });
        },
        (error) => {
          console.error('Error in updating password:', error);
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
