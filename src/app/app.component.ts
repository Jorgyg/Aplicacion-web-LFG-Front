import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router) {
    this.changeBodyColorBasedOnRoute(this.router.url);

    // Suscribirse a los eventos de cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.changeBodyColorBasedOnRoute(event.url);
      }
    });
  }

  private changeBodyColorBasedOnRoute(route: string) {
    // Aquí defines las rutas y colores correspondientes para cada componente
    const routeColorMap: { [key: string]: string } = {
      '/login': '#D8F3DC', // Cambia '/login' con la ruta real de tu LoginComponent
      '/register': '#D8F3DC', // Cambia '/register' con la ruta real de tu RegisterComponent
      '/home': '#1B4332',
      '/': '#1B4332',
      '/perfil': '#D8F3DC',
      '/main': '#1B4332',
      '/chat': '#1B4332', // Cambia '/home' con la ruta real de tu HomeComponent
      // Agrega más rutas y colores según tus necesidades
    };

    const bodyColor = routeColorMap[route] || '#ffffff';

    // Cambiar el color del body
    document.body.style.backgroundColor = bodyColor;
  }
}
