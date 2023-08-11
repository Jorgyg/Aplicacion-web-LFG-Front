import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiUrl = 'https://www.freetogame.com/api/game?id=';

  constructor(private http: HttpClient) { }

  return(){
    return this.http.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
          
  }

  getGameById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id);
  }
}
