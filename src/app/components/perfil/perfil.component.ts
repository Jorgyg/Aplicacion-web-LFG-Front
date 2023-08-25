import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from '../../services/games.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  games: any [] = [];
  constructor(private formBuilder: FormBuilder,
    private gamesService: GamesService) {}

  ngOnInit() {
    let game = this.gamesService.return();
    let lenght = this.gamesService.return().length;
    for (let i = 0; i < lenght; i++) {
      this.games.push(game[i].name);
    }

    
  }


}
