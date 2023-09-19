import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /* Creamos una variable para guardar todos los campos del formulario */
  form: any = {
    username: null,
    passwd: null
  };
  /* Creamos dos variables para comprobar si el usuario ha iniciado sesion correctamente o no. Esto se utiliza para el aviso de exito o fracaso en el HTML */
  isLoggedIn = false;
  isLoginFailed = false;
  /* Creamos una variable para introducir un mensaje de error */
  errorMessage = ''
  /* Creamos una variable para los roles */
  roles = "";
  /* Constructores con todos los servicios necesarios */
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router){}
  /* Al cargarse la página comprobamos que existe un token en la sesion */
  ngOnInit(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  /* Al enviar el formulario... */
  onSubmit(): void{
    const {username, passwd} = this.form;
    /* Creamos dos constantes a partir del formulario para iniciar sesion, username y passwd */
    this.authService.login(username, passwd).subscribe(
      data => {
        /* Guardamos los datos en el token y en los datos del usuario almacenados */
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        /* Indicamos que se ha iniciado sesión correctamente */
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        /* Guardamos el rol del usuario en una variable */
        this.roles = this.tokenStorage.getUser().roles;
        /* Navegamos al main */
        this.router.navigate(['/main']);
      },
      err =>{
        /* En caso de error, mostramos el mensaje de advertencia e indicamos que el inicio de sesión ha fallado */
        this.errorMessage = err.errorMessage;
        this.isLoginFailed = true;
      }
    )
  }
  /* Variable para recargar la página */
  reloadPages():void{
    window.location.reload();
  }

}
