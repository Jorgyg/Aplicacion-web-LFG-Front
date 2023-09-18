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
  isEditing = false;
  isEditingNombre = false; 
  isEditingJuego = false;
  isEditingPerfil = false;
  isEditingDescripcion= false;
  showSuccessMessage = false;
  constructor(private userService: UserService, private tokenService: TokenStorageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private gamesService: GamesService, private token: TokenStorageService) {}
  //Crea una array con todos los juegos disponibles en la base de datos
  ngOnInit() {
    let game = this.gamesService.return();
    let lenght = this.gamesService.return().length;
    for (let i = 0; i < lenght; i++) {
      this.games.push(game[i].name);
    }
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

  }

  onSubmit(){
    const user = this.tokenService.getUser();
    const username = user.infoUser.username;
    const email = user.infoUser.email;
    const passwd = user.infoUser.passwd;
    const { nombre, juego, perfil, descripcion } = this.form;
    this.userService.putUser(username, nombre, juego, perfil, descripcion, email, passwd).subscribe(
      data => {
        console.log(data);
        this.showSuccessMessage = true;
        const newUserInfo = { ...user.infoUser, nombre, juego, perfil, descripcion };
        user.infoUser = newUserInfo;
        this.tokenService.saveUser(user);
  
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      },
      err => {
        console.log(err);
      }
    );
  }

  
  
  
  cancelarCambios() {
    this.form = {
      nombre: this.currentUser.infoUser.nombre,
      juego: this.currentUser.infoUser.juego,
      perfil: this.currentUser.infoUser.perfil,
      descripcion: this.currentUser.infoUser.descripcion
    };
    this.isEditingNombre = false;
    this.isEditingJuego = false;
    this.isEditingPerfil = false;
    this.isEditingDescripcion = false;
  }

  guardarNombre() {
    this.currentUser.infoUser.nombre = this.form.nombre;
    this.isEditingNombre = false;
  }

  guardarJuego() {
    this.currentUser.infoUser.juego = this.form.juego;
    this.isEditingJuego = false;
  }

  guardarPerfil() {
    this.currentUser.infoUser.perfil = this.form.perfil;
    this.isEditingPerfil = false;
  }

  guardarDescripcion() {
    this.currentUser.infoUser.descripcion = this.form.descripcion;
    this.isEditingDescripcion = false;
  }

  private updateFormValues() {
    this.form = {
      nombre: this.currentUser.infoUser.nombre,
      juego: this.currentUser.infoUser.juego,
      perfil: this.currentUser.infoUser.perfil,
      descripcion: this.currentUser.infoUser.descripcion
    };
  }
}
