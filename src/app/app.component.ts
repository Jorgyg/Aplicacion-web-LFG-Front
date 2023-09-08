import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //Creamos las variables que necesitaremos para token

  private roles: string[] = [];
  isLoggedin = false;
  showAdminBoard = false;
  username?: string;

  //Creamos una variable para guardar el background según la url que recibe el programa
  backgroundUrl!: string;
  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void{
    // Al iniciar la ruta, guarda el evento que pertenece a la url de la ruta en la que estemos
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      //Llama al metodo setBackgroundImage donde le pasamos por parámetro la url de la ruta actual
      this.cambiarFondo(event.url);
    });
    //Comprobamos la sesion guardada en el Storage y guardamos la informacion en las variables
    this.isLoggedin = !!this.tokenStorageService.getToken();
    //Si el usuario está logeado guarda la información del token en local, en caso de no estarlo es mandado a la pantalla principal
  

  }

  //Metodo para cambiar el fondo segun la ruta
  private cambiarFondo(url: string): void {
    //Creamos una constante con cada ruta de la app y el background que le pertenece
    const bg: { [key: string]: string } = {
      '/': '/assets/img/bg-1.png',
      '/home': '/assets/img/bg-1.png',
      "/login":'/assets/img/bg-2.png',
      "/register":'/assets/img/bg-3.png',
      "/main":'/assets/img/bg-4.png',
      "/crear":'/assets/img/bg-6.png',
      "/unirse":'/assets/img/bg-7.png',
      "/chat": '/assets/img/bg-1.png',
      "/logros":'/assets/img/bg-1.png',
      "/miembros": '/assets/img/bg-8.png',
      "/eventos":'/assets/img/bg-9.png',
      "/ajustes":'/assets/img/bg-5.png',
      "/perfil":'/assets/img/bg-5.png',
      "/retar":'/assets/img/bg-10.png'
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
