import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { Observable } from 'rxjs';
import { OtpValidationRequest } from '../Entities/otp-validation-request';
import { OtpValidationResponse } from '../Entities/otp-validation-response';
import { UserLoginDto } from '../Entities/user-login-dto';
import { ForgotPasswordDto } from '../Entities/forgot-password-dto';
import { ResetPassword } from '../Entities/reset-password';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, user);
  }

  registerAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/adminRegister`, user);
  }

  validateOtp(otpValidationRequest: OtpValidationRequest): Observable<any> {
    const url = `${this.apiUrl}/validate-otp`;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OtpValidationResponse>(`${this.apiUrl}/auth/validate-otp`, otpValidationRequest);
      
}

loginUser(user: UserLoginDto): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/token`, user);
}

getUserById(id: number): Observable<any> {
  let tokenStr='Bearer '+localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',tokenStr);
  return this.http.get(`${this.apiUrl}/auth/${id}`,{headers});
}
forgotPassword(forgotPasswordDto:ForgotPasswordDto): Observable<ForgotPasswordDto> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<ForgotPasswordDto>(`${this.apiUrl}/auth/forgotPassword`, forgotPasswordDto);
}


resetPassword(resetPassword:ResetPassword): Observable<ResetPassword> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.patch<ResetPassword>(`${this.apiUrl}/auth/resetPassword`, resetPassword);
}


}