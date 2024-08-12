import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Payment, PaymentMode } from '../../Entities/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServiceService } from '../../Services/payment-service.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../Services/user-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
 
  userId1:number=Number(localStorage.getItem('id'));
  username:string='';
  email:string='';
  mobileNumber:string='';
  user:any;
  userId:number| undefined;
  paymentId:string|undefined;
  bookingId: number | undefined;
  totalPrice: number | undefined;
  razorPrice: number | undefined;
  totalNoOfPersons: number | undefined;
  payment: Payment = new Payment();
  errorMessage: string | undefined;
price:number | undefined;
  // Define the payment modes array
  paymentModes: PaymentMode[] = [
    PaymentMode.CREDIT_CARD,
    PaymentMode.DEBIT_CARD,
    PaymentMode.NET_BANKING,
    PaymentMode.CASH
  ];

  constructor(private route: ActivatedRoute, private paymentService: PaymentServiceService,
    private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = +params['bookingId'];});
    this.route.queryParams.subscribe(params => {
      this.totalNoOfPersons = +params['persons'];
      this.totalPrice = +params['price'];
      this.price=this.totalPrice*this.totalNoOfPersons;
      this.razorPrice=this.price*100;
      this.route.params.subscribe(params => {
        this.userId= +params['userId'];});
    });

    this.getUserDetails();
  }

  addPayment(): void {
    if (this.bookingId !== undefined && this.totalPrice !== undefined && this.totalNoOfPersons !== undefined) {
      // Set the pre-filled values in the payment object
      this.payment = new Payment(this.userId,this.bookingId, this.totalPrice*this.totalNoOfPersons, this.payment.paymentMode, new Date().toISOString(), this.totalNoOfPersons,this.paymentId);
  
      // Call the service method to add payment
      this.paymentService.addPaymentForBooking(this.bookingId, this.payment)
        .subscribe(
          () => {
            console.log('Payment successful');
            this.router.navigate(['user-registration', 'bookingHistory']);
            // Handle success message or navigate to a different page
            // this.generatePDF();
          },
          (error) => {
            this.errorMessage = 'Payment failed. Please try again.';
            console.error('Error adding payment: ', error);
          }
        );
    } else {
      console.error('Booking ID, Total Price, or Total Number of Persons is undefined');
    }
  }
payNow1(){
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Wait!.It is navigating paymentGateWay.Dont Press Back Button",
    showConfirmButton: false,
    timer: 1800
  }).then((res=>{
    this.payNow();
    
  }))
}
  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.razorPrice,
      name: this.username,
      key: 'rzp_test_ebliLhVkxmZcTU',
      //image: 'https://i.imgur.com/FApqk3D.jpeg',
     // image: '',
     handler:(response:any)=>{
      if(response!=null && response.razorpay_payment_id!=null){
        this.processResponse(response);
      }else{
        alert("payment failed")
      }

     },
      prefill: {
        name: this.username,
        email: this.email,
        phone: this.mobileNumber
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }

      }
    }

     const successCallback = (paymentid: any) => {
      console.log(paymentid);
     }
    // const successCallback = (response: any) => {
    //   const paymentId = response.razorpay_payment_id;
    //   console.log("Payment successful! Payment ID: ", paymentId);
    //   // Handle further actions after successful payment, if needed
    // }
    
    const failureCallback = (e: any) => {
      console.log(e);
    }

   //Razorpay.open(RozarpayOptions,successCallback, failureCallback)
   Razorpay.open(RozarpayOptions,successCallback, failureCallback);
  }
processResponse(resp:any){
  console.log(resp);
 console.log( resp.razorpay_payment_id);
 this.paymentId=resp.razorpay_payment_id;
  this. addPayment();
}


// generatePDF() {
//   const doc = new jsPDF();
  
//   // Initial Y-coordinate
//   let yCoordinate = 10;

//   // Add text to PDF
//   doc.text(`BookingId: ${this.bookingId}`, 10, yCoordinate);
//   yCoordinate += 10;  // Move Y-coordinate down for next line
//   doc.text(`PaymentId: ${this.paymentId}`, 10, yCoordinate);
//   yCoordinate += 10;
//   doc.text(`TotalPrice: ${this.totalPrice}`, 10, yCoordinate);
//   yCoordinate += 10;
//   doc.text(`PaymentMode: ${this.payment.paymentMode}`, 10, yCoordinate);
//   yCoordinate += 10;
//   doc.text(`Date: ${this.payment.paymentDate}`, 10, yCoordinate);

//   // Save the PDF
//   doc.save('helloworld.pdf');
// }



getUserDetails(): void {
  this.userService.getUserById(this.userId1).subscribe(
    (data: any) => {
      this.user = data;
      this.username=this.user.username;
      this.email=this.user.email;
      this.mobileNumber=this.user.mobileNumber;
      console.log(data);
    },
    (error: any) => {
      this.errorMessage = 'Failed to retrieve user details. Please try again.';
    }
  );
}
}

