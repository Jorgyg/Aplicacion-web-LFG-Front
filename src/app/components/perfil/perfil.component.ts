import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  games: any [] = [];
  currentUser: any;
  constructor(private formBuilder: FormBuilder, private gamesService: GamesService, private token: TokenStorageService) {}
  //Crea una array con todos los juegos disponibles en la base de datos
  ngOnInit() {
    let game = this.gamesService.return();
    let lenght = this.gamesService.return().length;
    for (let i = 0; i < lenght; i++) {
      this.games.push(game[i].name);
    }

    this.currentUser = this.token.getUser();
  }


}
