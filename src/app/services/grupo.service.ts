import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'https://partyholic-api-production.up.railway.app/api/Grupos/';
const API_URL_2 = 'https://partyholic-api-production.up.railway.app/api/UsuariosGrupos/';
const API_URL_3 = 'https://partyholic-api-production.up.railway.app/api/Mensajes/';
const API_URL_4 = 'https://partyholic-api-production.up.railway.app/api/Eventos/';
const API_URL_5 = 'https://partyholic-api-production.up.railway.app/api/UsuariosEventos/';
const API_URL_6 = 'https://partyholic-api-production.up.railway.app/api/Logros/';
const API_URL_7 = 'https://partyholic-api-production.up.railway.app/api/GruposLogros/';

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

  getUsuarioGrupo(username: string, codGrupo: string): Observable<any>{
    return this.http.get(`${API_URL_2}getUsuarioGrupo/${username}/${codGrupo}`);
  }

  getUsuariosGrupo(codgrupo: string): Observable<any>{
    return this.http.get(`${API_URL_2}getUsuarios/${codgrupo}`);
  }

  putAdmin(esAdmin: boolean, username: string, codGrupo: string): Observable<any> {
    return this.http.put(`${API_URL_2}${codGrupo}/${username}/${esAdmin}`, {});
  }
  
  deleteUsuarioGrupo(codGrupo: string, username: string): Observable<any>{
    return this.http.delete(`${API_URL_2}${codGrupo}/${username}`);
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

  deleteGrupo(CodGrupo: number){
    return this.http.delete(`${API_URL}${CodGrupo}`)
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

  postUsuarioEvento(CodGrupo: number, CodEvento: number, Username: string, Aceptar: boolean, Id: number): Observable<any>{   
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

  getLogrosEvento(){
    return this.http.get(API_URL_6);
  }

  getProgresoLogro(codGrupo: number): Observable<any> {
    return this.http.get(`${API_URL_7}Logros/${codGrupo}`);
  }

  postLogrosGrupo(CodGrupo: number): Observable<any>{
    return this.http.post(API_URL_7, {
      CodGrupo
    });
  }

  putGruposLogros(codGrupo: string, codLogro: number): Observable<any> {
    const url = `${API_URL_7}${codGrupo}/${codLogro}/increment`;
    return this.http.put(url, null);
  }
}
