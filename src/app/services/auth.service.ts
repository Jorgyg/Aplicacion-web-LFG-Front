import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7082/api/Usuarios/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(username: string, passwd: string): Observable<any>{
    return this.http.post(AUTH_API + 'signin', {
      username,
      passwd
    }, httpOptions);
  }

  register(username: string, email: string, passwd: string): Observable<any>{
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      passwd
    }, httpOptions)
  }

}
