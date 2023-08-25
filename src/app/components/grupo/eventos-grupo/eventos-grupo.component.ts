import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-grupo',
  templateUrl: './eventos-grupo.component.html',
  styleUrls: ['./eventos-grupo.component.css']
})
export class EventosGrupoComponent {
  /* Elemento que utilizaremos para cambiar el estilo de cualquier etiqueta del html */
  elementStyle: { [key: string]: string } = {};
  /*Se indica el numero de grupos que habrá por pagina y la pagina actual, que por defecto será la primera*/
  cardsPerPage: number = 4;
  currentPage: number = 1;
  selectedEventIndex: number | null = null;
  firstLinkActivated = false;

  /*Creamos una array para cada grupo. Para casos prácticos, hemos creado cartas "falsas" para comprobar su funcionalidad*/
  eventData: Array<any> = [
    {
      title: 'Evento 1', 
      date: '31/01/2024',
    },
    {
      title: 'Evento 2',
      date: '30/01/2024',
    },
    {
      title: 'Evento 3',
      date: '29/01/2024',
    },
    {
      title: 'Evento 4',
      date: '28/01/2024',
    },
    {
      title: 'Evento 5',
      date: '27/01/2024',
    },
    {
      title: 'Evento 6',
      date: '26/01/2024',
    },
    {
      title: 'Evento 7',
      date: '25/01/2024',
    },
    {
      title: 'Evento 8',
      date: '24/01/2024',
    },
    {
      title: 'Evento 9',
      date: '23/01/2024',
    },
    {
      title: 'Evento 10',
      date: '22/01/2024',
    }
  ];
  constructor(private renderer: Renderer2, private router: Router) {}

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
      } else if (page === 'next' && this.currentPage < Math.ceil(this.eventData.length / this.cardsPerPage)) {
        this.showPage(this.currentPage + 1);
      }
    }

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

    this.selectedEventIndex = index;
  }
}
