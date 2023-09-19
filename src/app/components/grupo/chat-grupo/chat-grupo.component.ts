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
  
  /* Constructor con los servicios necesarios */
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GrupoService, private tokenService: TokenStorageService, private userService: UserService) {}
  @ViewChild('mensajes') private mensajeContainer: ElementRef | undefined;
  /* Variable para guardar todos los mensajes del grupo, los datos del usuario y el codigod e grupo */
  listaMensajes: any[] = [];
  user = this.tokenService.getUser();
  username = this.user.infoUser.username;
  codigo = "";
  /* Al iniciar... */
  ngOnInit(){
    /* Obtenemos el codigod de grupo y los datos del usuario */
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.cargarMensajes(codigo + "");
      /* Nos desplazamos hasta el último mensaje */
      this.desplazar();
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      setTimeout(() => {
        /* Comprobamos que el usuario pertenece al grupo */
        this.groupService.getUsuariosGrupo(codigo + "").subscribe(
          (usuarioEnGrupo) => {
            var isInGroup = false;
            for (let i = 0; i < usuarioEnGrupo.length; i++) {
  
              if(usuarioEnGrupo[i].usuario.username == username){ 
                isInGroup = true;
              }  
  
            }
            if(!isInGroup){
              this.router.navigate(['/main']);
            }
            
          },
          (error) => {
            console.error("Error al verificar la pertenencia al grupo: ", error);
          }
        );
      }, 1000);
    })
    
    /* Creamos un método que se actualiza cada cinco segundo para mostrar los nuevos mensajes */
    setInterval(() => {
      this.route.paramMap.subscribe((params) =>{
        const codigo = params.get('codigo');
        this.cargarMensajes(codigo + "");
      });
    }, 5000);

  }
  /* Creamos un map para las imagenes de perfil */
  profileImagesMap: Map<string, string> = new Map();
  /* Cargamos los mensajes */
  cargarMensajes(codigo: string): void {
    /* Obtenemos todos los mensajes del grupo */
    this.groupService.getMensajesGrupo(codigo).subscribe(
      (data: any[]) => {
        /* Guardamos los mensajes en una variable */
        this.listaMensajes = data;
        /* Por cada mensaje le asignamos la imagen de perfil del usuario correspondiente */
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
      }
    );
  }
  /* Creamos un método para enviar los mensajes */
  enviarMensaje(): void{
    /* Comprobamos que el usuario no haya escrito un mensaje en blanco o con espacios */
    const input = (document.getElementById('mensaje') as HTMLInputElement).value;
    const regexp = /^(?!\s).+(?<!\s)$/gm;
    if(input.match(regexp)){
      this.route.paramMap.subscribe((params) =>{
        /* Obtenemos todos los datos necesario */
        const codigo = params.get('codigo')+"";
        const user = this.tokenService.getUser();
        const username = user.infoUser.username;
        /* Enviamos el mensaje con estos datos y nos desplazamos hasta el último mensaje, es decir, este */
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
        /* Actualizamos los logros relacionados con enviar mensajes */
        this.groupService.putGruposLogros(codigo, 1).subscribe();
        this.groupService.putGruposLogros(codigo, 2).subscribe();
        this.groupService.putGruposLogros(codigo, 3).subscribe();
      }) 
    }
  }
  /* Comprobamos si el mensaje es un reto */
  comprobarMensaje(mensaje: string): Boolean{
    if(mensaje.match("EL GRUPO HA SIDO RETADO POR EL GRUPO")){
      return true;
    } else{
      return false;
    }
  }
  /* Método para desplazarnos hasta el último mensaje */
  private desplazar(){
    setTimeout(() => {
      if(this.mensajeContainer){
        const container = this.mensajeContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 200);
  }
  /* Métodos de ruta para enviar al usuario a diferentes vistas a partir del código de grupo */
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