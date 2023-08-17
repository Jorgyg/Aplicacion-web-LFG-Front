import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  /*Se indica el numero de grupos que habrá por pagina y la pagina actual, que por defecto será la primera*/
  cardsPerPage: number = 4;
  currentPage: number = 1;
  /*Creamos una array para cada grupo. Para casos prácticos, hemos creado cartas "falsas" para comprobar su funcionalidad*/
  cardData: Array<any> = [
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
    }
  ];
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

  initializePagination(): void {
    this.showPage(1);
  }
}
