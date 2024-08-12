import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRegisterComponent } from './Admin/admin-register/admin-register.component';
import { OtpValidationComponent } from './Admin/otp-validation/otp-validation.component';
import { SelectPlaceComponent } from './TouristGuide/select-place/select-place.component';
import { AdminTouristGuidesComponent } from './Admin/admin-tourist-guides/admin-tourist-guides.component';
import { AddTouristguideComponent } from './Admin/add-touristguide/add-touristguide.component';
import { AddToursComponent } from './Admin/add-tours/add-tours.component';
import { AdminToursComponent } from './Admin/admin-tours/admin-tours.component';
import { UpdateTourComponent } from './Admin/update-tour/update-tour.component';
import { UpdateTouristguidesComponent } from './Admin/update-touristguides/update-touristguides.component';
import { GetByPlaceComponent } from './TouristGuide/get-by-place/get-by-place.component';
import { TouristguideToursComponent } from './TouristGuide/touristguide-tours/touristguide-tours.component';
import { GetTourByIdComponent } from './Tour/get-tour-by-id/get-tour-by-id.component';
import { GetBookingByIdComponent } from './Booking/get-booking-by-id/get-booking-by-id.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { TourReviewComponent } from './Review/tour-review/tour-review.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { UserDashboardComponent } from './Dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Dashboards/admin-dashboard/admin-dashboard.component';
import { PdfGenerationComponent } from './Pdf/pdf-generation/pdf-generation.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AboutUsComponent } from './Dashboards/about-us/about-us.component';
import { ContactUsComponent } from './Dashboards/contact-us/contact-us.component';
import { GetBookingByUserIdComponent } from './Booking/get-booking-by-user-id/get-booking-by-user-id.component';
import { BookingDetailsComponent } from './Booking/booking-details/booking-details.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';
import { PaginatePipe } from './Pipes/paginate.pipe';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { AdminForgotPasswordComponent } from './Admin/admin-forgot-password/admin-forgot-password.component';
import { AdminResetPasswordComponent } from './Admin/admin-reset-password/admin-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    AdminRegisterComponent,
    OtpValidationComponent,
    SelectPlaceComponent,
    AdminTouristGuidesComponent,
    AddTouristguideComponent,
    AddToursComponent,
    AdminToursComponent,
    UpdateTourComponent,
    UpdateTouristguidesComponent,
    GetByPlaceComponent,
    TouristguideToursComponent,
    GetTourByIdComponent,
    GetBookingByIdComponent,
    PaymentComponent,
    TourReviewComponent,
    AdminLoginComponent,
    DashboardComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    PdfGenerationComponent,
    AboutUsComponent,
    ContactUsComponent,
    GetBookingByUserIdComponent,
    BookingDetailsComponent,
    UserProfileComponent,
    PaginatePipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminForgotPasswordComponent,
    AdminResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,
    HttpClientModule ,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
