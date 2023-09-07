import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7082/api/Grupos/';

@Injectable({
  providedIn: 'root'
})

export class GrupoService {

  constructor(private http: HttpClient) { }

  getGrupos(): Observable<any>{
    return this.http.get(API_URL);
  }

  // postGrupo(username: string, email: string, passwd: string): Observable<any>{
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     email,
  //     passwd
  //   }, httpOptions)
  // }
}
