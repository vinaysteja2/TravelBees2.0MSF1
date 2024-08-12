import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BookingDto } from '../Entities/booking-dto';
import { Booking } from '../Entities/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }


  bookTour(tourId: number, bookingRequest: any): Observable<string> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    const url = `${this.apiUrl}/bookings/bookTour/${tourId}`;
    return this.http.post<string>(url, bookingRequest,{headers});
  }

  getBookingById(bookingId: number): Observable<BookingDto> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.get<BookingDto>(`${this.apiUrl}/bookings/${bookingId}`,{headers});
  }
  getBookingsForUser(userId: number): Observable<Booking[]> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings/bookings/user/${userId}`,{headers});
  }

  deleteBooking(bookingId: number): Observable<void> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.delete<void>( `${this.apiUrl}/bookings/${bookingId}`,{headers});
  }

  getBookingByPaymentId(paymentId: number): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.get(`${this.apiUrl}/bookings/payment/${paymentId}`,{headers});
}
}