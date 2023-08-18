import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //Creamos una variable para guardar el background según la url que recibe el programa
  backgroundUrl!: string;
  constructor(private router: Router) { }

  ngOnInit(): void{
    // Al iniciar la ruta, guarda el evento que pertenece a la url de la ruta en la que estemos
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      //Llama al metodo setBackgroundImage donde le pasamos por parámetro la url de la ruta actual
      this.cambiarFondo(event.url);
    });
  }

  private cambiarFondo(url: string): void {
    //Creamos una constante con cada ruta de la app y el background que le pertenece
    const bg: { [key: string]: string } = {
      '/': '/assets/img/bg-1.png',
      '/home': '/assets/img/bg-1.png',
      "/login":'/assets/img/bg-2.png',
      "/register":'/assets/img/bg-3.png',
      "/main":'/assets/img/bg-4.png',
      "/crear":'/assets/img/bg-6.png',
      "/unirse":'',
      "/chat": '',
      "/logros":'',
      "/miembros": '',
      "/eventos":'',
      "/ajustes":'',
      "/perfil":'/assets/img/bg-5.png',
      "/retar":''
    };
    //Comprueba que la url recibida se encuentra en la constante de rutas y le asigna el background que le pertenece
    if (bg[url]) {
      this.backgroundUrl = `url(${bg[url]})`;
    } else {
      // En caso de no existir se estblecerá un fondo por defecto
      this.backgroundUrl = '/assets/img/background-about.jpg'; // o establecer algún otro valor predeterminado
    }
  }  

}
