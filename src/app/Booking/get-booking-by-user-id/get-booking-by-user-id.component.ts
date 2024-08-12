import { Component, OnInit } from '@angular/core';
import { Booking } from '../../Entities/booking';
import { BookingServiceService } from '../../Services/booking-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-booking-by-user-id',
  templateUrl: './get-booking-by-user-id.component.html',
  styleUrl: './get-booking-by-user-id.component.css'
})
export class GetBookingByUserIdComponent  implements OnInit {
  bookings: Booking[] = [];
   userId1: number = Number(localStorage.getItem('id'));
  // userId1: number = 24;
  constructor(private bookingService: BookingServiceService,private router:Router) { }

  ngOnInit(): void {
    this.fetchBookingHistory();
    
  } 

  fetchBookingHistory(): void {
    this.bookingService.getBookingsForUser(this.userId1).subscribe(response => {
      this.bookings = response;
    }, error => {
      console.error('Error fetching booking history', error);
    });
  }
  cancelBooking(bookingId: number): void {
    // Implement the logic to cancel the booking
    console.log(`Cancel booking with ID: ${bookingId}`);
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        () => {
          console.log(`Booking with ID ${bookingId} deleted successfully.`);
          // Optionally, update the list of bookings after deletion
          this.fetchBookingHistory();
        },
        (error) => {
          console.error('Error deleting booking:', error);
          // Handle error as needed, e.g., show an error message to the user
        }
      );
    }
  }

  viewDetails(bookinId: number): void {
    this.router.navigate(['/user-registration/bookingDetails',bookinId],{ queryParams: { userId: this.userId1 }});
  
  }
  handlePaymentStatus(booking: any): void {
    if (!booking.paymentStatus) {
      this.promptPayment(booking);
    } else {
      this.confirmBooking(booking);
    }
  }

  promptPayment(booking: any): void {
    // Implement the logic to prompt the user for payment
    console.log(`Prompting payment for booking with ID: ${booking.id}`);
    // You can add the payment prompt logic here, such as showing a modal or redirecting to a payment page.
    this.router.navigate(['/user-registration/getBookingById', booking.id],{ queryParams: { userId: this.userId1 }});
  
  }

  confirmBooking(booking: any): void {
    // Implement the logic to confirm the booking
    console.log(`Confirming booking with ID: ${booking.id}`);
    // You can add the confirmation logic here, such as updating the booking status or showing a confirmation message.
  }


  isFutureOrCurrentDate(bookingDate: string): boolean {
    const currentDate = new Date();
    const dateToCompare = new Date(bookingDate);
    
    // Remove time component from both dates
    currentDate.setHours(0, 0, 0, 0);
    dateToCompare.setHours(0, 0, 0, 0);
    
    return dateToCompare >= currentDate;
  }
  
  isPastDate(bookingDate: string): boolean {
    const currentDate = new Date();
    const dateToCompare = new Date(bookingDate);
    
    // Remove time component from both dates
    currentDate.setHours(0, 0, 0, 0);
    dateToCompare.setHours(0, 0, 0, 0);
    
    return dateToCompare < currentDate;
  }
  isCancellable(bookingStatus: string, bookingDate: string): boolean {
    const isValidStatus = bookingStatus === 'Booked' || bookingStatus === 'notBooked';
    return isValidStatus && this.isFutureOrCurrentDate(bookingDate);
  }

  isPaymentStatusEnabled(bookingStatus: string): boolean {
    return bookingStatus === 'Booked' || bookingStatus === 'notBooked';
  }
  
}
