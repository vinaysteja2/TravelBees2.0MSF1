
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'] // Note the plural 'styleUrls'
})
export class AdminRegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: [{ value: '+91 9618991011', disabled: true }],
      role: ['ADMIN']
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const user = this.registrationForm.getRawValue(); // Use getRawValue() to include disabled fields
      this.userService.registerAdmin(user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
            
          if (response.status === 'FAILED') {
            console.error('Error registering user:', response.message);
            Swal.fire({
              title: "OTP",
              text: "OTP FAILED TO SEND!",
              icon: "error"
            });
            
          } else if (response.status === 'DELIVERED') {
            Swal.fire({
              title: "OTP",
              text: "OTP SENT Successfully!",
              icon: "success"
            }).then(() => {
            console.log('Registration delivered, navigating to OTP validation');
            this.router.navigate(['/admin-registration/otpValidation'], { queryParams: { username: user.username } });
          
         });
        }
           else {
            console.error('Unknown status received:', response.status);
            Swal.fire({
              title: "OTP",
              text: response.status,
              icon: "error"
            });
        }
      
        } ,
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

  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('email')) {
      return 'Invalid email address';
    }
    return '';
  }

  navigateToLogin() {
    this.router.navigate(['/admin-registration/userLogin']);
  }

}
