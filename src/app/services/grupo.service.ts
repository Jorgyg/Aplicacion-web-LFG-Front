import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'https://localhost:7082/api/Grupos/';
const API_URL_2 = 'https://localhost:7082/api/UsuariosGrupos/';
const API_URL_3 = 'https://localhost:7082/api/Mensajes/';
const API_URL_4 = 'https://localhost:7082/api/Eventos/';
const API_URL_5 = 'https://localhost:7082/api/UsuariosEventos/';




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

  getGrupo(codigo: string): Observable<any>{
    return this.http.get(`${API_URL}${codigo}`)
  }

  getGruposUsuario(username: string): Observable<any>{
    return this.http.get(`${API_URL_2}getGruposUsuario/${username}`);
  }

  getUsuariosGrupo(codgrupo: string): Observable<any>{
    return this.http.get(`${API_URL_2}getUsuarios/${codgrupo}`);
  }

  getGruposLike(input: string): Observable<any>{
    return this.http.get(`${API_URL}getGruposLike/${input}`);
  }

  putGrupo(CodGrupo: string, Nombre: string, Privacidad: string, Descripcion: string, Participantes: number, Juego: string, FotoGrupo: string): Observable<any>{   
    return this.http.put(`${API_URL}${CodGrupo}`, {
      CodGrupo,
      Nombre,
      Privacidad,
      Descripcion,
      Participantes,
      Juego,
      FotoGrupo
    }, httpOptions)
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

  postUsuarioGrupo(CodGrupo: number, Username: string, esAdmin: Boolean):Observable<any>{
    return this.http.post(API_URL_2, {
      CodGrupo,
      Username,
      esAdmin
    }, httpOptions)
  }

  getMensajesGrupo(codGrupo: string): Observable<any>{
    return this.http.get(`${API_URL_3}CodGrupo/${codGrupo}`);
  }

  postMensajeGrupo(CodGrupo: string, Username: string, Contenido: string): Observable<any>{   
    return this.http.post(API_URL_3 + 'crear', {
      CodGrupo,
      Username,
      Contenido
    }, httpOptions)
  }

  getEventosGrupo(codGrupo: string){
    return this.http.get(`${API_URL_4}CodGrupo/${codGrupo}`);
  }

  postEvento(CodGrupo: number, Titulo: string, FechaEvento: string): Observable<any>{   
    return this.http.post(API_URL_4, {
      CodGrupo,
      Titulo,
      FechaEvento
    }, httpOptions)
  }

  postUsuarioEvento(CodGrupo: number, CodEvento: number, Username: string, Aceptar: boolean): Observable<any>{   
    return this.http.post(API_URL_5, {
      CodGrupo,
      CodEvento,
      Username,
      Aceptar
    }, httpOptions)
  }

  getUsuarioEvento(CodGrupo: number, Username: string){
    return this.http.get(`${API_URL_5}${CodGrupo}/${Username}`);
  }
}
