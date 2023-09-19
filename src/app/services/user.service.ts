import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const API_URL = 'https://partyholic-api-production.up.railway.app/api/Usuarios/';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

    getUserByUsername(username: string): Observable<any> {
      return this.http.get(API_URL + `username/${username}`, { responseType: 'json' });
    }

    putUser(Username: string, Nombre: string, JuegoFavorito: string, Privacidad: string, Descripcion: string, Email: string, Passwd: string, FotoPerfil: string): Observable<any>{   
      return this.http.put(`${API_URL}${Username}`, {
        Username,
        Nombre, 
        JuegoFavorito,
        Privacidad,
        Descripcion,
        Email,
        Passwd,
        FotoPerfil
      }, httpOptions)
    }
}
