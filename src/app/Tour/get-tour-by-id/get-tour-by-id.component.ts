import { Component } from '@angular/core';
import { Tour } from '../../Entities/tour';
import { Review } from '../../Entities/review';
import { TourServiceService } from '../../Services/tour-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewServiceService } from '../../Services/review-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-get-tour-by-id',
  templateUrl: './get-tour-by-id.component.html',
  styleUrl: './get-tour-by-id.component.css'
})
export class GetTourByIdComponent {

  reviewCount: number = 0;
  user:any;
  userId4:number=0;
  username:string='';
  tour: Tour={};
  tourId: number =0;
  errorMessage: string = '';
  reviews: Review[] = [];
  minDate: string='';
  constructor(private tourService: TourServiceService,private reviewService:ReviewServiceService, private userService: UserServiceService,
     private route: ActivatedRoute,private datePipe: DatePipe,private router:Router, private formBuilder: FormBuilder
     ) {

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1); // Set to tomorrow's date
      this.minDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
      }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId4 = +params['userId'] || Number(localStorage.getItem('id')); // Extract userId from query parameters
    });
    this.route.paramMap.subscribe(params => {
      this.tourId = Number(params.get('tourId'));
      this.getTour();
      this.initializeForm();
      this.getUserDetails();
    });
  }

  getTour(): void {
    if (this.tourId) {
      this.tourService.getTourById(this.tourId)
        .subscribe(
          (tour) => {
            this.tour = tour;
            console.log(tour);
            this.convertPhotoToBase64();
             //this.getReviewsByTourId(this.tourId);
             //this.getReviewsByTourId(1);
            this.getReviewsByTourId(this.tourId);
          },
          (error) => {
            this.errorMessage = "Failed to retrieve tour";
          }
        );
    }
  }

  convertPhotoToBase64(): void {
    if (this.tour && this.tour.tourPhoto) {
      this.tour.tourPhoto = 'data:image/jpeg;base64,' + this.tour.tourPhoto;
   }

    
  }
  bookTours(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/user-registration/tourBooking/', id],{ queryParams: { userId: this.userId4 }});
    }}

    getReviewsByTourId(tourId: number): void {
      this.reviewService.getReviewsByTourId(tourId)
        .subscribe(
          (reviews) =>{ 
            this.reviews = reviews
            this.reviewCount = reviews.length; 
          },
          (error) => {
            this.errorMessage = "Failed to retrieve reviews";
          }
          );
    
    
      }

      // ---------booking-------------------

      
      tourBookingForm!: FormGroup;

      initializeForm(): void {
        this.tourBookingForm = this.formBuilder.group({
          userId:[this.userId4],
          bookingDate: [null, Validators.required],
          numberOfPersons: [null, Validators.required]
        });
      }
    
      bookTour(): void {
        if (this.tourBookingForm.valid) {
          const bookingRequest = this.tourBookingForm.value;
          console.log(bookingRequest);
          this.tourService.bookTour(this.tourId, bookingRequest).subscribe(
            (response:any) => {
              console.log('Booking successful: ', response);
              // Handle success message or navigate to a different page
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Yes.TouristGuides are Available on this Date",
                showConfirmButton: false,
                timer: 1500
              }).then((res=>{
                this.router.navigate(['/user-registration/getBookingById', response.id],{ queryParams: { userId: this.userId4 }});
              }))
              
            },
            (error) => {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "TouristGuides are Not Available in this Date",
                showConfirmButton: false,
                timer: 1500
              })
              console.error('Error booking tour: ', error);
              // Handle error message
            }
          );
        } else {
          // Form is invalid, handle validation errors or display a message
        }
      }
// -------------------------add review-------------

  review: Review = new Review();
  errorMessage2: string = '';

  // constructor(private reviewService: TravelbeesService) {

  //   this.tourId = 1; 
  // }

  addReview(): void {
    
    this.review.userId=this.userId4;
    this.reviewService.addReviewToTour(this.tourId, this.review)
      .subscribe(
        (response) => {
          console.log('Review added successfully:', response);
          // Handle success as needed
          this.getReviewsByTourId(this.tourId);
        },
        (error) => {
          console.error('Failed to add review:', error);
          this.errorMessage = 'Failed to add review. Please try again.';
        }
      );
  }



  getUserDetails(): void {
    this.userService.getUserById(this.userId4).subscribe(
      (data: any) => {
        this.user = data;
        this.username=this.user.username;
       
        console.log(data);
      },
      (error: any) => {
        this.errorMessage = 'Failed to retrieve user details. Please try again.';
      }
    );
  }
}


