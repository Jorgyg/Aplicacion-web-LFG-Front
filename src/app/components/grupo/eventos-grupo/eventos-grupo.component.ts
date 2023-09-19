import { Component, Renderer2, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-eventos-grupo',
  templateUrl: './eventos-grupo.component.html',
  styleUrls: ['./eventos-grupo.component.css']
})
export class EventosGrupoComponent implements OnInit  {
  /* Elemento que utilizaremos para cambiar el estilo de cualquier etiqueta del html */
  elementStyle: { [key: string]: string } = {};
  /*Se indica el numero de grupos que habrá por pagina y la pagina actual, que por defecto será la primera*/
  cardsPerPage: number = 4;
  currentPage: number = 1;
  selectedEventIndex: number | null = null;
  firstLinkActivated = false;
  /* Constructor con todos los servicios que vamos a utilizar */
  constructor(private activatedRoute: ActivatedRoute, private tokenService: TokenStorageService ,private renderer: Renderer2, private router: Router, private groupService: GrupoService, private route: ActivatedRoute) {}
  /* Variable para guardar los eventos y el formulario de creacion de eventos */
  eventos: any = [];
  form: any = {
    nombre: null,
    fecha: null
  };
  /* Variable para guardar la seleccion de acepto de cada evento por usuario */
  usuarioEventos: any = [];
  Math: any = Math;
  /* Al iniciar... */
  ngOnInit(){
    /* Guardamos el codigo de grupo y los datos del usuario logeado */
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      /* Obtenemos los usuarios de ese grupo para comprobar que el usuario logeado se encuentra en él, de otra forma se le reenvia al menu principal */
      this.groupService.getUsuariosGrupo(codGrupoStr + "").subscribe(
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

        }
    );
    /* Obtenemos los eventos del grupo y los guardamos */
      this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
        data=>{
          this.eventos = data
        }
      );
      /* Obtenemos las decisiones de evento del usuario y lo guardamos */
      this.groupService.getUsuarioEvento(codGrupoNum, username).subscribe(
        data => {
          this.usuarioEventos = data
        }
      );
    })
  }
  /* Al enviar le formulario... */
  onSubmit(){
    /* Obtenemos el codigo de grupo */
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      /* Guardamos los datos introducidos en el formulario */
      const {nombre, fecha} = this.form;
      /* Enviamos los datos para crear el evento */
      this.groupService.postEvento(codGrupoNum, nombre, fecha).subscribe(
        data=>{
          /* Al mismo tiempo llamamos a los eventos para acutalizar la lista */
          this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
            data=>{
              /* Añadimos una unidad a los logros relacionados con crear eventos y guardamos los datos de los eventos en una variable */
              this.eventos = data;
              this.groupService.putGruposLogros(codGrupoStr + "", 4).subscribe();
              this.groupService.putGruposLogros(codGrupoStr + "", 5).subscribe();
              this.groupService.putGruposLogros(codGrupoStr + "", 6).subscribe();
            }
          );
          const user = this.tokenService.getUser();
          const username = user.infoUser.username;
          this.groupService.postMensajeGrupo(codGrupoStr + "", username, "¡HA CREADO UN NUEVO EVENTO!").subscribe(data=>{
          });
        }
      );    
    });
  }
  /* Variables asignadas a los dos botones, aceptar o rechazar la participacion en el evento respectivamente */
  isAccepted(codEvento: number): boolean {
    if (this.usuarioEventos) {
      const eventoUsuario = this.usuarioEventos.find((evento: any) => evento.codEvento === codEvento);
      return eventoUsuario ? eventoUsuario.aceptar : false;
    }
    return false;
  }

  message(codEvento: number, mess: string) {
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      
      this.groupService.getEventoGrupo(codGrupoStr + "", codEvento).subscribe(
        data => {
          this.groupService.postMensajeGrupo(
            
            codGrupoStr + "",
            username,
            "HA " + mess + " EL EVENTO " + data.titulo
          ).subscribe((response: any) => {
            // Manejar la respuesta si es necesario
          });
        },
        (error) => {
          console.error("Error al obtener eventos:", error);
        }
      );
    });
  }
  
  
  isRejected(codEvento: number): boolean {
    if (this.usuarioEventos) {
      const eventoUsuario = this.usuarioEventos.find((evento: any) => evento.codEvento === codEvento);
      return eventoUsuario ? !eventoUsuario.aceptar : false;
    }
    return false;
  }  
  /* Dependiendo de nuestra eleccion... */
  elegir(codEvento: number, aceptar: boolean){
    /* Guardamos el codigo de grupo y los datos del usuario */
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      if(aceptar){
        this.message(codEvento, "ACEPTADO");
      } else {
        this.message(codEvento, "RECHAZADO");

      }
      /* Enviamos la informacion junto a nuestra decision de participar en el evento */
      this.groupService.postUsuarioEvento(codGrupoNum, codEvento, username, aceptar, 0).subscribe(
        data=>{
          /* Obtenemos los eventos del grupo para comprobar que se ha añadido correctamente y recargamos */
          this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
            data=>{
              this.eventos = data;
              location.reload();
            }
          );
        }
      );
    })
  }
  /* Método para volver */
  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

  /*Metodo para cambiar la página actual por la pagina destino*/
  showPage(page: number): void {
    this.currentPage = page;
  }
  /*Metodo que se ejecuta al cambiar de pagina donde pasamos el numero de pagina y el evento click*/
  changePage(page: number | string, event: Event): void {
    /* Evitamos que el enlace nos lleve a otra pagina y no ejecute el script */
    event.preventDefault();
    if (page === 'prev' && this.currentPage > 1) {
        this.showPage(this.currentPage - 1);
      } else if (page === 'next' && this.currentPage < Math.ceil(this.eventos.length / this.cardsPerPage)) {
        this.showPage(this.currentPage + 1);
      }
    }
    /* Activa el primer enlace si no nos encontramos en el */
    enlargeAndNavigate(index: number) {
    if (!this.firstLinkActivated) {
      this.firstLinkActivated = true;
    }
    /* Seleccionamos todas las cartas y le añadimos o eliminamos la siguiente clase para emular una seleccion */
    const cardElements = document.querySelectorAll('.card');

    cardElements.forEach((cardElement: Element, i: number) => {
      if (i === index) {
        this.renderer.addClass(cardElement, 'enlarged-card');
      } else {
        this.renderer.removeClass(cardElement, 'enlarged-card');
      }
    });

    this.selectedEventIndex = index;
  }
}
