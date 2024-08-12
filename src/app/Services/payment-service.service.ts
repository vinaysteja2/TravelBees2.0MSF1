import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../Entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  addPaymentForBooking(bookingId: number, payment: Payment): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    
    return this.http.post<any>(`${this.apiUrl}/payments/bookings/${bookingId}`, payment,{headers});
  }

  getPaymentById(id: number): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.get(`${this.apiUrl}/payments/${id}`,{headers});
  }
}
