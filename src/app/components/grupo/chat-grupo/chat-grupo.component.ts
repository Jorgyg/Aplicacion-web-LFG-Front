import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chat-grupo',
  templateUrl: './chat-grupo.component.html',
  styleUrls: ['./chat-grupo.component.css']
})
export class ChatGrupoComponent {
  
  
  constructor(private route: ActivatedRoute, private groupService: GrupoService, private tokenService: TokenStorageService){}
  @ViewChild('mensajes') private mensajeContainer: ElementRef | undefined;
  
  listaMensajes: any[] = [];
  user = this.tokenService.getUser();
  username = this.user.infoUser.username;

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

  cargarMensajes(codigo: string):void{
    this.groupService.getMensajesGrupo(codigo).subscribe(
      (data: any[]) => {
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
    }) 
  }

  private desplazar(){
    setTimeout(() => {
      if(this.mensajeContainer){
        const container = this.mensajeContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}
