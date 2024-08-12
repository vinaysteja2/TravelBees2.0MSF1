import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TouristGuide } from '../Entities/tourist-guide';
import { Tour } from '../Entities/tour';

@Injectable({
  providedIn: 'root'
})
export class TouristguideServiceService {

  private apiUrl = 'http://localhost:8090';


  constructor(private http: HttpClient) { }

  

  addTouristGuide(touristGuide: TouristGuide): Observable<void> {
   let tokenStr='Bearer '+localStorage.getItem('token');
   const headers=new HttpHeaders().set('Authorization',tokenStr);
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(`${this.apiUrl}/tourist-guides`,touristGuide, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }

  addTourWithTouristGuideId(touristGuideId: number, tour: Tour): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/tours/add/${touristGuideId}`;
    return this.http.post<any>(url, tour, { headers })
      .pipe(
        catchError(this.handleError)
      );
   }

   getAllTouristGuides(): Observable<TouristGuide[]> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    return this.http.get<TouristGuide[]>(`${this.apiUrl}/tourist-guides`,{headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTouristGuide(touristGuideId: number): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    return this.http.delete<string>(`${this.apiUrl}/tourist-guides/${touristGuideId}`,{headers});
  }
  
  getTouristGuideById(touristGuideId: number): Observable<TouristGuide> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    return this.http.get<TouristGuide>(`${this.apiUrl}/tourist-guides/${touristGuideId}`,{headers});
  }
  
  updateTouristGuide(touristGuideId: number, updatedTouristGuide: TouristGuide): Observable<void> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    const url = `${this.apiUrl}/tourist-guides/${touristGuideId}`;
    return this.http.put<void>(url, updatedTouristGuide,{headers});
  }
  

  searchTouristGuides(location: string): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    return this.http.get(`${this.apiUrl}/tourist-guides/search/${location}`,{headers});
  }

  getAllLocations(): Observable<string[]> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);

    return this.http.get<string[]>(`${this.apiUrl}/tourist-guides/locations`,{headers});
  }

  getTouristGuideToursById(id: number): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    
    return this.http.get(`${this.apiUrl}/tourist-guides/${id}`,{headers});
  }
 
  getTouristGuideToursById1(id: number): Observable<any> {
    let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
    
    return this.http.get(`${this.apiUrl}/tourist-guides/touristGuideId/${id}`,{headers});
  }
}
