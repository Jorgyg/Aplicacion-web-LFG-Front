import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { GrupoService } from 'src/app/services/grupo.service';

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

  constructor(private renderer: Renderer2, private router: Router, private tokenStorageService: TokenStorageService, private groupService: GrupoService) {}
  
  cardData: any[] = [];
  
  /*cardData: Array<any> = [
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 1',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 2',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 3',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 4',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 5',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 6',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 7',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 8',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 9',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 10',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 11',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 12',
      description: 'Descripción del grupo',
    },{
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 11',
      description: 'Descripción del grupo',
    },
    {
      imageUrl: 'https://miro.medium.com/v2/resize:fit:804/1*ixB4YI9uQXBMymH2aUvZ4Q.jpeg',
      title: 'Grupo 12',
      description: 'Descripción del grupo',
    }

  ];*/

  ngOnInit(){
    this.groupService.getGrupos().subscribe(
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

  enlargeAndNavigate(index: number) {
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
    this.router.navigate(['/chat']);
  }, 1000); // Redirige después de 0.3 segundos (300 ms)
}

  //Cerrar sesion

  logout(): void{
    alert(window.sessionStorage.getItem('auth-user'));
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }
}

