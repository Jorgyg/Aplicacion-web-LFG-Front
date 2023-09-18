import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    passwd: null,
    rolApp: "user"
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
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
  constructor(private authService: AuthService){}

  ngOnInit(): void{

  }

  

  obtenerFotoPerfilAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.fotosPerfil.length);
    var avatar = this.fotosPerfil[indiceAleatorio];
    return avatar;
  }

  

  onSubmit(): void{

    const { username, email, passwd} = this.form;
    const fotoP = this.obtenerFotoPerfilAleatoria();
    this.authService.register(username, email, passwd, fotoP).subscribe(

      data=>{
        console.log(data);
    console.log(fotoP);

        this.isSuccessful = true;
        this.isSignUpFailed = false; 
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        if(this.errorMessage == undefined){
          this.errorMessage = "El nombre de usuario ya existe"
        }
        this.isSignUpFailed = true;
      }

    );
  }

}
