import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isEnlarged: boolean = false;

  constructor(private renderer: Renderer2, private router: Router) {}
  /* Método para la animacion del logo */
  enlargeAndNavigate(route: string) {
    this.isEnlarged = true;

    setTimeout(() => {
      this.router.navigate([route]);
    }, 1000); /* Tiempo de carga de ruta */
  }
}












