import { Component, Renderer2, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  constructor(private activatedRoute: ActivatedRoute, private tokenService: TokenStorageService ,private renderer: Renderer2, private router: Router, private groupService: GrupoService, private route: ActivatedRoute) {}

  eventos: any = [];
  form: any = {
    nombre: null,
    fecha: null
  };
  usuarioEventos: any = [];
  Math: any = Math;
  
  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
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

        },
      (error) => {
        console.error("Error al verificar la pertenencia al grupo: ", error);
      }
    );
      this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
        data=>{
          console.log(data);
          this.eventos = data
        },
        err => {
          console.log(err);
        }
      );
      this.groupService.getUsuarioEvento(codGrupoNum, username).subscribe(
        data => {
          console.log(data);
          this.usuarioEventos = data
        },
        err => {
          console.log(err);
        }
      );
    })
  }

  onSubmit(){
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const {nombre, fecha} = this.form;
      this.groupService.postEvento(codGrupoNum, nombre, fecha).subscribe(
        data=>{
          this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
            data=>{
              console.log(data);
              this.eventos = data
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    })
  }

  isAccepted(codEvento: number): boolean {
    // Busca el evento correspondiente en usuarioEventos
    const eventoUsuario = this.usuarioEventos.find((evento: any) => evento.codEvento === codEvento);
  
    // Si no se encuentra el evento, se considera no aceptado
    return eventoUsuario ? eventoUsuario.aceptar : false;
  }
  
  isRejected(codEvento: number): boolean {
    // Busca el evento correspondiente en usuarioEventos
    const eventoUsuario = this.usuarioEventos.find((evento: any) => evento.codEvento === codEvento);
  
    // Si no se encuentra el evento, se considera no rechazado
    return eventoUsuario ? !eventoUsuario.aceptar : false;
  }

  elegir(codEvento: number, aceptar: boolean){
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService.postUsuarioEvento(codGrupoNum, codEvento, username, aceptar).subscribe(
        data=>{
          this.groupService.getEventosGrupo(codGrupoNum + "").subscribe(
            data=>{
              console.log(data);
              this.eventos = data;
              location.reload();
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    })
  }

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
