import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7082/api/Usuarios/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

    getPublishContent(): Observable<any>{
      return this.http.get(API_URL + '', {responseType: 'text'});
    }

    getUserBoard(): Observable<any>{
      return this.http.get(API_URL + 'user', {responseType: 'text'});
    }

    getAdminBoard(): Observable<any>{
      return this.http.get(API_URL + 'admin', {responseType: 'text'});
    }
}
