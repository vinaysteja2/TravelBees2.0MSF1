import { Component, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { AdminRegisterComponent } from './Admin/admin-register/admin-register.component';
import { OtpValidationComponent } from './Admin/otp-validation/otp-validation.component';
import { SelectPlaceComponent } from './TouristGuide/select-place/select-place.component';
import { AddTouristguideComponent } from './Admin/add-touristguide/add-touristguide.component';
import { AddToursComponent } from './Admin/add-tours/add-tours.component';
import { AdminTouristGuidesComponent } from './Admin/admin-tourist-guides/admin-tourist-guides.component';
import { AdminToursComponent } from './Admin/admin-tours/admin-tours.component';
import { UpdateTourComponent } from './Admin/update-tour/update-tour.component';
import { UpdateTouristguidesComponent } from './Admin/update-touristguides/update-touristguides.component';
import { GetByPlaceComponent } from './TouristGuide/get-by-place/get-by-place.component';
import { TouristguideToursComponent } from './TouristGuide/touristguide-tours/touristguide-tours.component';
import { GetTourByIdComponent } from './Tour/get-tour-by-id/get-tour-by-id.component';
import { GetBookingByIdComponent } from './Booking/get-booking-by-id/get-booking-by-id.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { AdminDashboardComponent } from './Dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Dashboards/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { PdfGenerationComponent } from './Pdf/pdf-generation/pdf-generation.component';
import { AboutUsComponent } from './Dashboards/about-us/about-us.component';
import { ContactUsComponent } from './Dashboards/contact-us/contact-us.component';
import { GetBookingByUserIdComponent } from './Booking/get-booking-by-user-id/get-booking-by-user-id.component';
import { BookingDetailsComponent } from './Booking/booking-details/booking-details.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ResetPassword } from './Entities/reset-password';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminForgotPasswordComponent } from './Admin/admin-forgot-password/admin-forgot-password.component';
import { AdminResetPasswordComponent } from './Admin/admin-reset-password/admin-reset-password.component';

const routes: Routes = [
  {path:'userRegister',component:UserRegisterComponent},
  {path:'adminRegister',component:AdminRegisterComponent},
  {path:'pdfgen',component:PdfGenerationComponent},
  
  
  //  {path:'userLogin',component:UserLoginComponent},
  // {path:'otpValidation',component:OtpValidationComponent},
  // {path:'selectPlace',component:SelectPlaceComponent},
  // {path:'addTouristGuide',component:AddTouristguideComponent},
  // {path:'addTours/:touristGuideId',component:AddToursComponent},
  // {path:'adminTouristGuides',component:AdminTouristGuidesComponent},
  // {path:'adminTours/:touristGuideId',component:AdminToursComponent},
  // { path:'update-tour/:tourId', component:UpdateTourComponent },
  // { path:'update-touristGuide/:touristGuideId', component:UpdateTouristguidesComponent },
  // {path:'getByPlace',component:GetByPlaceComponent},
  // {path:'touristGuideTours/:Id',component:TouristguideToursComponent},
  // {path:'tourById/:tourId',component:GetTourByIdComponent},
  // {path:'getBookingById/:bookingId',component:GetBookingByIdComponent},
  // {path:'addPayment/:bookingId',component:PaymentComponent},
  //  { path: '', component: DashboardComponent},
  //  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  //  {path:'home', component:DashboardComponent,
  // children: [
  //   {path:'aboutus',component:AboutUsComponent,},
  //   {path:'contactus',component:ContactUsComponent,},
  // ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: DashboardComponent,
  },
  { path: 'contactus', component: ContactUsComponent},
  { path: 'aboutus', component: AboutUsComponent},
  // {path:'bookingHistory',component:GetBookingByUserIdComponent},
 

//USER-DASHBOARD
  { path: 'user-registration', component:UserDashboardComponent,
   children: [
   { path: '', redirectTo: 'userRegister', pathMatch: 'full' },  
    {path:'userRegister',component:UserRegisterComponent,},
    {path:'forgotPassword',component:ForgotPasswordComponent},
    {path:'resetPassword',component:ResetPasswordComponent},
    { path: 'userLogin', component: UserLoginComponent } ,
    {path:'selectPlace',component:SelectPlaceComponent},
    {path:'getByPlace',component:GetByPlaceComponent},
    {path:'touristGuideTours/:Id',component:TouristguideToursComponent},
    {path:'tourById/:tourId',component:GetTourByIdComponent},
    {path:'getBookingById/:bookingId',component:GetBookingByIdComponent},
   {path:'addPayment/:bookingId',component:PaymentComponent},
   {path:'bookingHistory',component:GetBookingByUserIdComponent},
   {path:'bookingDetails/:bookingId', component:BookingDetailsComponent}
  ]},

//ADMIN-DASHBOARD
// { path: 'admin-registration', component:AdminDashboardComponent,
//  children: [
//   {path:'adminRegister',component:AdminRegisterComponent},
//   {path:'otpValidation',component:OtpValidationComponent},
//   {path:'addTouristGuide',component:AddTouristguideComponent},

//   {path:'adminTouristGuides',component:AdminTouristGuidesComponent,
//   children: [
//     {path:'addTours/:touristGuideId',component:AddToursComponent},
//     {path:'adminTours/:touristGuideId',component:AdminToursComponent},
//   { path:'update-tour/:tourId', component:UpdateTourComponent },
//   { path:'update-touristGuide/:touristGuideId', component:UpdateTouristguidesComponent },
//   ]
// },
// ]}

//ADMIN-DASHBOARD
{
  path: 'admin-registration',
  component: AdminDashboardComponent,
  children: [
    { path: '', redirectTo: 'adminRegister', pathMatch: 'full' }, // Default child route
    {path:'adminRegister',component:AdminRegisterComponent},
    // { path: 'userLogin', component: UserLoginComponent } ,
    { path: 'userLogin', component: AdminLoginComponent} ,
    {path:'forgotPassword',component:AdminForgotPasswordComponent},
    {path:'resetPassword',component:AdminResetPasswordComponent},

    {path:'otpValidation',component:OtpValidationComponent},
    {path:'addTouristGuide',component:AddTouristguideComponent},
    { path:'adminTouristGuides', component: AdminTouristGuidesComponent },
    { path: 'adminTouristGuides/addTours/:touristGuideId', component: AddToursComponent },
   {path:'adminTouristGuides/adminTours/:touristGuideId',component:AdminToursComponent},
   { path:'adminTouristGuides/update-touristGuide/:touristGuideId', component:UpdateTouristguidesComponent },
    // Add other child routes for admin dashboard as needed
    { path:'adminTouristGuides/update-tour/:tourId', component:UpdateTourComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
