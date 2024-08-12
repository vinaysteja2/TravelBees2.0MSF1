import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from '../Entities/tour';
import { Observable, catchError, throwError } from 'rxjs';
import { Review } from '../Entities/review';

@Injectable({
  providedIn: 'root'
})
export class TourServiceService {

  private apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  addTourWithTouristGuideId(touristGuideId: number, tour: Tour): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    const url = `${this.apiUrl}/tours/add/${touristGuideId}`;
    return this.http.post<any>(url, tour, { headers })
      .pipe(
        catchError(this.handleError)
      );
}
private handleError(error: any): Observable<never> {
  console.error('An error occurred', error);
  return throwError('Something went wrong; please try again later.');
}

getToursByTouristGuideId(touristGuideId: number): Observable<Tour[]> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);

  return this.http.get<Tour[]>(`${this.apiUrl}/tours/touristGuide/${touristGuideId}`,{ headers });
}

deleteTourById(tourId: number): Observable<any> {

  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);

  return this.http.delete<string>(`${this.apiUrl}/tours/${tourId}`,{ headers });
}

getTourById(tourId: number): Observable<Tour> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);
  
  return this.http.get<Tour>(`${this.apiUrl}/tours/${tourId}`,{ headers });
}

updateTour(tourId: number, updatedTour: Tour): Observable<void> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);

  const url = `${this.apiUrl}/tours/${tourId}`;
  return this.http.put<void>(url, updatedTour,{ headers });
}

// ------review service--
getReviewsByTourId(tourId: number): Observable<Review[]> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);
  
  return this.http.get<Review[]>(`${this.apiUrl}/reviews/getTourReviews/${tourId}`,{ headers });
}

addReviewToTour(tourId: number, review: Review): Observable<any> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);
  const url = `${this.apiUrl}/reviews/addReviewToTour/${tourId}`;
  return this.http.post<any>(url, review,{ headers });
}

// ---booking service---
bookTour(tourId: number, bookingRequest: any): Observable<string> {
  let tokenStr='Bearer '+localStorage.getItem('token');
  const headers=new HttpHeaders().set('Authorization',tokenStr);
  
  const url = `${this.apiUrl}/bookings/bookTour/${tourId}`;
  return this.http.post<string>(url, bookingRequest,{ headers });
}

}
