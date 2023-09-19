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
  /* Variables que vamos a utilizar para controlar los juegos y los datos del usuario */
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
  /* Constructor con todos los servicios que vamos a utilizar */
  constructor(private userService: UserService, private tokenService: TokenStorageService, private route: ActivatedRoute, private formBuilder: FormBuilder, private gamesService: GamesService, private token: TokenStorageService) {}
  /* Crea una array con todos los juegos disponibles */
  ngOnInit() {
    let game = this.gamesService.return();
    let lenght = this.gamesService.return().length;
    for (let i = 0; i < lenght; i++) {
      this.games.push(game[i].name);
    }
    this.currentUser = this.token.getUser();
  }
  /* Al enviar el formulario... */
  onSubmit(){
    /* Obtenemos los datos del usuario y de los datos introducidos en el form */
    const user = this.tokenService.getUser();
    const username = user.infoUser.username;
    const email = user.infoUser.email;
    const passwd = user.infoUser.passwd;
    const { nombre, juego, perfil, descripcion } = this.form;
    /* Actualizamos los cambios */
    this.userService.putUser(username, nombre, juego, perfil, descripcion, email, passwd).subscribe(
      data => {
        this.showSuccessMessage = true;
        const newUserInfo = { ...user.infoUser, nombre, juego, perfil, descripcion };
        user.infoUser = newUserInfo;
        /* Guardamos los nuevos datos en local */
        this.tokenService.saveUser(user);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }
    );
  }
  /* Método para eliminar los datos introducidos en el formulario */
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
  /* Métodos para guardar los datos de cada campo */
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
  /* Método para actualizar los datos del formulario */
  private updateFormValues() {
    this.form = {
      nombre: this.currentUser.infoUser.nombre,
      juego: this.currentUser.infoUser.juego,
      perfil: this.currentUser.infoUser.perfil,
      descripcion: this.currentUser.infoUser.descripcion
    };
  }
}
