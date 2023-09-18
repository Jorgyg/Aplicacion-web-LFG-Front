import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-grupo',
  templateUrl: './chat-grupo.component.html',
  styleUrls: ['./chat-grupo.component.css']
})
export class ChatGrupoComponent {
  
  
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GrupoService, private tokenService: TokenStorageService, private userService: UserService) {}
  @ViewChild('mensajes') private mensajeContainer: ElementRef | undefined;
  
  listaMensajes: any[] = [];
  user = this.tokenService.getUser();
  username = this.user.infoUser.username;
  codigo = "";

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
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

  profileImagesMap: Map<string, string> = new Map();

  cargarMensajes(codigo: string): void {
    this.groupService.getMensajesGrupo(codigo).subscribe(
      (data: any[]) => {
        this.listaMensajes = data;
        this.listaMensajes.forEach((mensaje, index) => {
          if (!this.profileImagesMap.has(mensaje.username)) {
            this.userService.getUserByUsername(mensaje.username).subscribe(
              (userData: any) => {
                this.profileImagesMap.set(mensaje.username, userData.fotoPerfil);
                this.listaMensajes[index].fotoPerfil = userData.fotoPerfil;
              },
              (error) => {
                console.error("ERROR al obtener datos de usuario: ", error);
              }
            );
          } else {
            this.listaMensajes[index].fotoPerfil = this.profileImagesMap.get(mensaje.username);
          }
        });
      },
      (error) => {
        console.error("ERROR: ", error);
      }
    );
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