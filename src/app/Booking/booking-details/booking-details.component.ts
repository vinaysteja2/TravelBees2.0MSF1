import { Component } from '@angular/core';
import { BookingDto } from '../../Entities/booking-dto';
import { BookingServiceService } from '../../Services/booking-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';
import { PaymentServiceService } from '../../Services/payment-service.service';
import { UserServiceService } from '../../Services/user-service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  payment: any; // Adjust type as per your API response

  userId3:number=0;
  touristGuide: any={};
  idb: number = 0;
  
  user:any;

  booking: BookingDto | undefined;
  errorMessage: string | undefined;
  bookingId: number | undefined;
  userId5:number=0;

  constructor(private bookingService: BookingServiceService, private route: ActivatedRoute,
    private router:Router,private touristGuideService:TouristguideServiceService, private paymentService:PaymentServiceService,
    private userService:UserServiceService) { }

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
          console.log(this.booking)
          console.log(this.booking.tour.touristGuideId);
          this.idb=this.booking.tour.touristGuideId;
          this.convertPhotos();
          this.getTouristGuide();
          this.getPaymentDetails(this.booking.paymentId);
         this. getUserDetails(this.booking.userId);
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

// -------------------------------touristGuide detaila---------------------------------------
  getTouristGuide(): void {
    this.touristGuideService.getTouristGuideToursById1(this.idb)
      .subscribe(
        (data) => {
          this.touristGuide = data;
          console.log(data)
          this.convertPhotos1(); // Convert photos to base64
        },
        (error) => {
          console.error('Error fetching tourist guide:', error);
        }
      );
  }

  convertPhotos1(): void {
    if (this.touristGuide.photo) {
      this.touristGuide.photo = `data:image/jpeg;base64,` + this.touristGuide.photo;
    }
    if (this.touristGuide.tour) {
      this.touristGuide.tour.forEach((tour: any) => {
        if (tour.tourPhoto) { // Adjusted to use tourPhoto instead of photo
          tour.tourPhoto = `data:image/jpeg;base64,` + tour.tourPhoto;
        }
      });
    }
  }

// ------------------paymentDetails-----------------------------------------------------

getPaymentDetails(id: number): void {
  this.paymentService.getPaymentById(id)
    .subscribe(
      (data: any) => {
        this.payment = data;
        console.log("payment: ",data)
      },
      error => {
        console.error('Error fetching payment details:', error);
      }
    );
}


// -----------------------user details----------------------------------------

getUserDetails(id: number): void {
  this.userService.getUserById(id).subscribe(
    (data: any) => {
      this.user = data;
      console.log(data);
    },
    (error: any) => {
      this.errorMessage = 'Failed to retrieve user details. Please try again.';
    }
  );
}
// -------------------generatepdf---------------------------

generatePDF(): void {
  const content = document.getElementById('booking-details-content');
  if (content) {
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('booking-details.pdf');
    });
  }
}
}
