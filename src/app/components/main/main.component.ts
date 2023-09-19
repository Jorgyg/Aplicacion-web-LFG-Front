import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { UserService } from 'src/app/services/user.service';

interface Group {
  title: string;
  description: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  Math: any = Math;
  /* Elemento que utilizaremos para cambiar el estilo de cualquier etiqueta del html */
  elementStyle: { [key: string]: string } = {};
  /*Se indica el numero de grupos que habrá por pagina y la pagina actual, que por defecto será la primera*/
  cardsPerPage: number = 8;
  currentPage: number = 1;
  selectedCardIndex: number | null = null;
  canJoin= false;
  /* Servicios que vamos a utilizar */
  constructor(private renderer: Renderer2, private router: Router, private tokenStorageService: TokenStorageService, private groupService: GrupoService, private userService: UserService) {}
  /* Variable para guardar los grupos en cartas */
  cardData: any[] = [];
  rol: string = "user";
  /* Al iniciar... */
  ngOnInit(){
    /* Guardamos los datos del usuario y su rol */
    const usuario = this.tokenStorageService.getUser();
    const username = usuario.infoUser.username;
    this.rol = usuario.infoUser.rolApp;
    /* Obtenemos todos los grupos del usuario y los guardamos en la variable para mostrar como cartas */
    this.groupService.getGruposUsuario(username).subscribe(
      (data: any[]) => {
        this.cardData = data;
      }
    )
    setTimeout(() => {
      const nadaDiv = document.querySelector('#nada') as HTMLElement;
      if (nadaDiv) {
        nadaDiv.classList.remove('d-none');
      }
    }, 1000);
  }
  /* Métodos de paginación */
  showPage(page: number): void {
    this.currentPage = page;
  }

  changePage(page: number | string, event: Event): void {
  event.preventDefault();
  if (page === 'prev' && this.currentPage > 1) {
      this.showPage(this.currentPage - 1);
    } else if (page === 'next' && this.currentPage < Math.ceil(this.cardData.length / this.cardsPerPage)) {
      this.showPage(this.currentPage + 1);
    }
  }

  firstLinkActivated = false;
  /* Método de animacion para entrar a un grupo */
  enlargeAndNavigate(index: number, codigo: number) {
  if (!this.firstLinkActivated) {
    this.firstLinkActivated = true;
  }

  const cardElements = document.querySelectorAll('.card');

  cardElements.forEach((cardElement: Element, i: number) => {
    if (i === index) {
      this.renderer.addClass(cardElement, 'enlarged-card');
    } else {
      this.renderer.removeClass(cardElement, 'enlarged-card');
    }
  });

  this.selectedCardIndex = index;

  setTimeout(() => {
    this.router.navigate(['/chat', codigo]);
  }, 1000); /* Redirigimos pasado un segundo */
}
  /* Método para filtrar segun los datos introducidos en el buscador */
  filtrar(): void{
    try {
      /* Vaciamos la array de grupo */
      this.cardData = [];
      /* Obtenemos la cadena de texto introducida */
      const input = (document.getElementById('buscar') as HTMLInputElement).value;
      /* Si no se introduce nada volvemos a llamar a obtener todos los grupos */
      if (input.trim() === '') {
        this.ngOnInit();
        this.canJoin = false;
      } else {
        this.canJoin = true;
        this.groupService.getGruposLike(input).subscribe(
          (data: any[]) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].nombre.toLowerCase().includes(input.toLowerCase()) && data[i].privacidad == 'public'){
                  console.log(data[i]);
                  /* Si el grupo está lleno no se mostrará en la lista */
                  this.groupService.getUsuariosGrupo(data[i].codGrupo + "").subscribe(
                    (usuarioEnGrupo) => {
                      var numUsuarios = 0;
                      for (let c = 0; c < usuarioEnGrupo.length; c++) {
                        numUsuarios++;                 
                      }
                      if(numUsuarios < data[i].participantes){
                        this.cardData.push(data[i]);
                      }
                    }
                );
              }
            }
          }
        )
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* Al unirse a un grupo... */
  onSubmit(codgrupo: number): void {
    /* Obtenemos los datos del usuario */
    const user = this.tokenStorageService.getUser();
    const username = user.infoUser.username;
    /* Asignamos al usuario en ese grupo */
    this.groupService.postUsuarioGrupo(codgrupo, username, false).subscribe(
      (data) => {}
    );
    /* Esperamos para redirigrlo */
    setTimeout(() => {
        
        this.router.navigate(['/chat', codgrupo]);
    }, 1000);
  }
  /* Si eres administrador de la api podrás eliminar grupo */
  borrar(codGrupo: number){
    this.groupService.deleteGrupo(codGrupo).subscribe(
      (data) => {
        alert("Grupo eliminado correctamente.");
        location.reload();
      }
    )
  }
  /* Método para cerrar sesión */
  logout(): void{
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }
}

