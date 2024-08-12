import { Component } from '@angular/core';
import { BookingDto } from '../../Entities/booking-dto';
import { BookingServiceService } from '../../Services/booking-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-booking-by-id',
  templateUrl: './get-booking-by-id.component.html',
  styleUrl: './get-booking-by-id.component.css'
})
export class GetBookingByIdComponent {

  booking: BookingDto | undefined;
  errorMessage: string | undefined;
  bookingId: number | undefined;
  userId5:number=0;

  constructor(private bookingService: BookingServiceService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId5 = +params['userId'] || 0; // Extract userId from query parameters
    });
    this.route.params.subscribe(params => {
      this.bookingId = +params['bookingId']; // Extract bookingId from URL
      if (this.bookingId) {
        this.getBookingDetails(this.bookingId);
      }
    });
  }

  getBookingDetails(bookingId: number): void {
    this.bookingService.getBookingById(bookingId)
      .subscribe(
        (data: BookingDto) => {
          this.booking = data;
          this.convertPhotos();
        },
        (error: any) => {
          this.errorMessage = 'Failed to retrieve booking details. Please try again.';
        }
      );
  }
  convertPhotos(): void {
    if (this.booking && this.booking.tour && this.booking.tour.tourPhoto) {
      this.booking.tour.tourPhoto = 'data:image/jpeg;base64,' + this.booking.tour.tourPhoto;
    }
  }

  navigateToPayment(): void {
    // Navigate to the payment component with the numberOfPersons and tourPrice as query parameters
    if (this.booking && this.booking.tour) {
      const tourPrice = this.booking.tour.price;
      const numberOfPersons = this.booking.numberOfPersons;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You want to do payment",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          swalWithBootstrapButtons.fire({
            title: "Done!",
            text: "It is navigating to payment page Wait.",
            icon: "success"
          }).then((res=>{
            this.router.navigate(['/user-registration/addPayment',this.bookingId], { queryParams: { price: tourPrice, persons: numberOfPersons,userId: this.userId5 } });
          }))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Navigating to Payment page cancelled",
            icon: "error"
          });
        }
      });
      
    }
  }

}
