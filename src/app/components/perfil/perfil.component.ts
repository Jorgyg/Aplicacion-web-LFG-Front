import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  games: any [] = [];
  currentUser: any;
  form: any = {
    nombre: null,
    juego: null,
    perfil: null,
    descripcion: null
  };
  constructor(private userService: UserService, private tokenService: TokenStorageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private gamesService: GamesService, private token: TokenStorageService) {}
  //Crea una array con todos los juegos disponibles en la base de datos
  ngOnInit() {
    let game = this.gamesService.return();
    let lenght = this.gamesService.return().length;
    for (let i = 0; i < lenght; i++) {
      this.games.push(game[i].name);
    }
    this.currentUser = this.token.getUser();
  }

  onSubmit(){
    const user = this.tokenService.getUser();
    const username = user.infoUser.username;
    const email = user.infoUser.email;
    const passwd = user.infoUser.passwd;
    const { nombre, juego, perfil, descripcion} = this.form;
    this.userService.putUser(username, nombre, juego, perfil, descripcion, email, passwd).subscribe(
      data=>{
        console.log(data);
        alert("Cambios guardados correctamente");
      },
      err => {
        console.log(err);
      }
    );
  }
}
