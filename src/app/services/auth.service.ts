import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://partyholic-api-production.up.railway.app/api/Usuarios/auth/';

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

  register(username: string, email: string, passwd: string, FotoPerfil: string): Observable<any>{
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      passwd,
      FotoPerfil 
    }, httpOptions)
  }

}
