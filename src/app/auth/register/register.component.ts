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
    "https://cdn2.iconfinder.com/data/icons/heroes/128/superhero_green_lantern_hero_comic-256.png",
    "https://cdn2.iconfinder.com/data/icons/heroes/128/superhero_superman_hero_comic-512.png",
    "https://cdn2.iconfinder.com/data/icons/halloween-emojis-vol3/128/halloween_frankenstein-stare-face-512.png",
    "https://cdn0.iconfinder.com/data/icons/halloween-emojis/128/halloween__lantern-pumpkin-stare-15-128.png",
    "https://cdn2.iconfinder.com/data/icons/heroes/128/superhero_captain_hero_comic-128.png",
    "https://cdn4.iconfinder.com/data/icons/hipster-8/128/hipster_man-mustache-aviator-128.png",
    "https://cdn3.iconfinder.com/data/icons/halloween-emojis-mega-pack/128/halloween-2_cauldron-angry-kawaii_13-512.png",
    "https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-2/135/_snorlax-64.png",
    "https://cdn0.iconfinder.com/data/icons/freebies-2/24/video-game-mario-3-64.png",
    "https://cdn3.iconfinder.com/data/icons/legend-of-zelda-nes/46/11-64.png",
    "https://cdn3.iconfinder.com/data/icons/chess-7/100/black_king-64.png",
    "https://cdn0.iconfinder.com/data/icons/video-games-8/24/video_game_play_sims-64.png"
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
