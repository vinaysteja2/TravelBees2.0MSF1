
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'] // Corrected styleUrls property name
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.pattern('^[0-9]{10,}$')]], // At least 8 digits
      role: ['USER']
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const user = this.registrationForm.value;
      console.log(user);
      this.userService.registerUser(user).subscribe(
        (data) => {
          console.log('User registered successfully:', data);
          Swal.fire({
            title: "Registration",
            text: "User Registration-Successful!",
            icon: "success"
          }).then(() => {
          this.router.navigate(['/user-registration/userLogin']);
        });
        },
        (error) => {
          console.error('Error registering user:', error);
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
