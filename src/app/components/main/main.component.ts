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
  /* Elemento que utilizaremos para cambiar el estilo de cualquier etiqueta del html */
  elementStyle: { [key: string]: string } = {};
  /*Se indica el numero de grupos que habrá por pagina y la pagina actual, que por defecto será la primera*/
  cardsPerPage: number = 8;
  currentPage: number = 1;
  selectedCardIndex: number | null = null;
  /*Creamos una array para cada grupo. Para casos prácticos, hemos creado cartas "falsas" para comprobar su funcionalidad*/

  constructor(private renderer: Renderer2, private router: Router, private tokenStorageService: TokenStorageService, private groupService: GrupoService, private userService: UserService) {}
  
  cardData: any[] = [];
  rol: string = "user";

  ngOnInit(){

    const usuario = this.tokenStorageService.getUser();
    const username = usuario.infoUser.username;
    this.rol = usuario.infoUser.rolApp;
    this.groupService.getGruposUsuario(username).subscribe(
      (data: any[]) => {
        this.cardData = data;
      },
      (error) => {
        console.error("ERROR: ", error);
      }
    )
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
    } else if (page === 'next' && this.currentPage < Math.ceil(this.cardData.length / this.cardsPerPage)) {
      this.showPage(this.currentPage + 1);
    }
  }

  firstLinkActivated = false;

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
  }, 1000); // Redirige después de 0.3 segundos (300 ms)
}

  filtrar(): void{
    try {
      const input = (document.getElementById('buscar') as HTMLInputElement).value;
      this.groupService.getGruposLike(input).subscribe(
        (data: any[]) => {
          this.cardData = data;
        }
      )
    } catch (error) {

      const usuario = this.tokenStorageService.getUser();
      const username = usuario.infoUser.username;

      this.groupService.getGruposUsuario(username).subscribe(
        (data: any[]) => {
          this.cardData = data;
        },
        (error) => {
          console.error("ERROR: ", error);
        }
      )
    }
    
  }

  //Cerrar sesion

  logout(): void{
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }
}

