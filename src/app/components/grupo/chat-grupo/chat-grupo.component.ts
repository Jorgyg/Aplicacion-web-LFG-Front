import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chat-grupo',
  templateUrl: './chat-grupo.component.html',
  styleUrls: ['./chat-grupo.component.css']
})
export class ChatGrupoComponent {
  
  
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GrupoService, private tokenService: TokenStorageService){}
  @ViewChild('mensajes') private mensajeContainer: ElementRef | undefined;
  
  listaMensajes: any[] = [];
  user = this.tokenService.getUser();
  username = this.user.infoUser.username;
  codigo = "";
  users: any[] = [];
  userImage: any[] = [];
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
  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.groupService.getUsuariosGrupo(codigo + "").subscribe(
        data=>{
          for (let i = 0; i < data.length; i++) {
            this.users.push(data[i].usuario.username);      
          }
          console.log(this.users);

          for (let i = 0; i < this.users.length; i++) {
            var name = this.users[i];
            this.userImage.push({
              name: name,
              img: this.obtenerFotoPerfilAleatoria(),
              change: true
            })
            
          }
        },
        err => {
          console.log(err);
        }
      );
      this.cargarMensajes(codigo + "");

      this.desplazar();
    })

    setInterval(() => {
      this.route.paramMap.subscribe((params) =>{
        const codigo = params.get('codigo');
        this.cargarMensajes(codigo + "");
      });
    }, 5000);

  }

  obtenerFotoPerfilAleatoria(): string {
      const indiceAleatorio = Math.floor(Math.random() * this.fotosPerfil.length);
      var avatar = this.fotosPerfil[indiceAleatorio];
    return avatar;
  }

  cargarMensajes(codigo: string):void{
    this.groupService.getMensajesGrupo(codigo).subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          for (let c = 0; c < this.users.length; c++) {
            if(data[i].username == this.users[c]){
              data[i].fotoPerfil = this.fotosPerfil[c]
            }        
          }          
        }
        this.listaMensajes = data;
      },
      (error) => {
        console.error("ERROR: ", error);
      }
    )
  }

  enviarMensaje(): void{
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo')+"";
      const input = (document.getElementById('mensaje') as HTMLInputElement).value;
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService.postMensajeGrupo(codigo, username, input).subscribe(
        (data: any[]) => {
          this.route.paramMap.subscribe((params) =>{
            const codigo = params.get('codigo');
            this.cargarMensajes(codigo + "");
            this.desplazar();
            (document.getElementById('mensaje') as HTMLInputElement).value = "";
          })
        }
      )
      this.groupService.putGruposLogros(codigo, 1).subscribe();
      this.groupService.putGruposLogros(codigo, 2).subscribe();
      this.groupService.putGruposLogros(codigo, 3).subscribe();
    }) 
  }

  comprobarMensaje(mensaje: string): Boolean{
    if(mensaje.match("EL GRUPO HA SIDO RETADO POR EL GRUPO")){
      return true;
    } else{
      return false;
    }
  }

  private desplazar(){
    setTimeout(() => {
      if(this.mensajeContainer){
        const container = this.mensajeContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 200);
  }

  ajustesGrupo(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.router.navigate(['/ajustes', codigo]);
    })
  }

  logrosGrupo(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.router.navigate(['/logros', codigo]);
    })
  }

  retarGrupo(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.router.navigate(['/retar', codigo]);
    })
  }

  miembrosGrupo(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.router.navigate(['/miembros', codigo]);
    })
  }

  eventosGrupo(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.router.navigate(['/eventos', codigo]);
    })
  }

}
