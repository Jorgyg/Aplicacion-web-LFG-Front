import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  /* Creamos una variable para guardar los datos del formulario*/
  form: any = {
    username: null,
    email: null,
    passwd: null,
    rolApp: "user"
  };
  /* Lo mismo que en login*/
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  /* Creamos una lista con imágenes de perfil que asignaremos de forma aleatoria a los usuarios*/
  fotosPerfil = [
    "./assets/img/icon1.png",
    "./assets/img/icon2.png",
    "./assets/img/icon3.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png",
    "./assets/img/icon1.png"
  ];
  /* Constructor con todos los servicios necesarios*/
  constructor(private authService: AuthService){}
  /* Método para obtener un número aleatorio que utilizaremos para asignar una foto al usuario */
  obtenerFotoPerfilAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.fotosPerfil.length);
    var avatar = this.fotosPerfil[indiceAleatorio];
    return avatar;
  }
  /* Cuando enviemos el formulario... */
  onSubmit(): void{
    /* Creamos constantes para los datos del formulario y otra constante para asignar una foto de perfil aleatoria */
    const { username, email, passwd} = this.form;
    const fotoP = this.obtenerFotoPerfilAleatoria();
    this.authService.register(username, email, passwd, fotoP).subscribe(
      /* Registramos al usuario, si se ha registrado correctamente se indica cambiando el boolean true o false */
      data=>{
        this.isSuccessful = true;
        this.isSignUpFailed = false; 
      },
      err => {
        /* En caso de error mostramos un mensaje */
        this.errorMessage = err.error.message;
        if(this.errorMessage == undefined){
          this.errorMessage = "El nombre de usuario ya existe"
        }
        /* Indicamos que el inicio de sesión ha fallado */
        this.isSignUpFailed = true;
      }

    );
  }

}
