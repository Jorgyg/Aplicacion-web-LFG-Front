import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'https://localhost:7082/api/Grupos/';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class GrupoService {

  constructor(private http: HttpClient) { }

  getGrupos(): Observable<any>{
    return this.http.get(API_URL);
  }

  postGrupo(CodGrupo: number, Nombre: string, Privacidad: string, Descripcion: string, Participantes: number, Juego: string, FotoGrupo: string): Observable<any>{   
    return this.http.post(API_URL + 'crear', {
      CodGrupo,
      Nombre,
      Privacidad,
      Descripcion,
      Participantes,
      Juego,
      FotoGrupo
    }, httpOptions)
  }

  postUsuarioGrupo(CodGrupo: string, ):void{

  }
}
