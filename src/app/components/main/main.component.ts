import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedCardIndex: number | null = null;
  groups: Group[] = [
    { title: 'Grupo 1', description: 'Descripción del grupo 1' },
    { title: 'Grupo 2', description: 'Descripción del grupo 2' },
    { title: 'Grupo 3', description: 'Descripción del grupo 3' },
    { title: 'Grupo 1', description: 'Descripción del grupo 1' },
    { title: 'Grupo 2', description: 'Descripción del grupo 2' },
    { title: 'Grupo 3', description: 'Descripción del grupo 3' },
    { title: 'Grupo 1', description: 'Descripción del grupo 1' },
    { title: 'Grupo 2', description: 'Descripción del grupo 2' },
    { title: 'Grupo 3', description: 'Descripción del grupo 3' },
    // Agrega más grupos según sea necesario
  ];
  firstLinkActivated = false;
  
  constructor(private renderer: Renderer2, private router: Router) {}

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
}
