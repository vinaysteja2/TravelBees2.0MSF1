import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.css'
})
export class OtpValidationComponent {

  username1:string='';

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService, private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username1 = params['username'] || ''; // Retrieve username from URL or default to empty string
    });
    this.registrationForm = this.formBuilder.group({
      username: [this.username1],
      otpNumber: ['']

    });


  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value)
      const user = this.registrationForm.value;
      this.userService.validateOtp(user).subscribe(
        (data) => {
          console.log('User registered successfully:', data);
          Swal.fire({
            title: "Registration",
            text: "User Registration-Successful!",
            icon: "success"
          }).then(() => {
            this.router.navigate(['/admin-registration/userLogin']);
        });
        },
        (error) => {
          console.error('Error registering user:', error);
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

  navigateToLogin() {
    this.router.navigate(['/userLogin']);
  }

}


