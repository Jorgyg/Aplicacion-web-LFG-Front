import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { GamesService } from '../../../services/games.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {
  /* Variable para guardar los datos del formulario */
  form: any = {
    codgrupo: null,
    nombre: null,
    privacidad: null,
    descripcion: null,
    participantes: null,
    juego: null,
    fotogrupo: null
  };
  /* Variable para validar los datos del formulario */

  noValido = false;

  /* Variable para guardar la imagen selccionada de los juegos */
  imagenSeleccionada: string | null = null;
  /* Serie de variables para controlar el juego seleccionado de la lista */
  image?: string[] = [];
  games: any[] = [];
  filteredGames: any[] = [];
  searchText =  '';
  currentPage: number = 0;
  totalPages: number = 0;
  index: number = 0;
  isSelected: boolean = false;
  botonN: boolean = true;
  botonP: boolean = false;
  isGameNameVisible: boolean = false;
  currentGameName: string = '';
  /* Datos del juego seleccioando */
  selected: any = {
    nombre: "",
    img: ""
  };
  /* Constructor con los servicios que vamos a utilizar */
  constructor(private formBuilder: FormBuilder,
              private gamesService: GamesService,
              private groupService: GrupoService,
              private tokenService: TokenStorageService,
              private router: Router) {}
  /* Al iniciar... */
  ngOnInit() {
    /* Generamos una imagen por defecto y guardamos la longitud de la lista de juegos que se encuentra en gameService */
    this.imagenSeleccionada = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    let num = this.gamesService.return().length;
    /* Comprobamos que existen esos juegos mirando la longitud y especificamos el numero de juegos por paginacion  */
    while(num > 0){
      this.totalPages++;
      num-= 12;
    }
    /* Obtenemos los juegos */
    this.getGames();
  }

  /* Variables para seleccionar, cambiar y cancelar la seleccion de las imagenes */

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  cambiarImagen() {
    this.imagenSeleccionada = null;
  }

  cancelarSeleccion() {
    this.image = [];
  }

  /* Mostramos el nombre del juego */
  showGameName(gameName: string) {
    this.currentGameName = gameName;
    this.isGameNameVisible = true;
  }

  /* Ocultamos el nombre del juego */
  hideGameName() {
    this.isGameNameVisible = false;
    this.currentGameName = '';
  }
  /* Creamos una array vacia para asignar los juegos */
  getGames() {
    this.games = [];
    /* Guardamos los juegos en la array */
    let game = this.gamesService.return();
    /* En un bucle, comprobamos que existan juegos y vamos asignando su nombre e imagen a la variuable */
    for (let i = this.index; i < this.index + 12; i++) {
      if (game) {    
        if (this.searchText == '') {
          this.games.push({ 
            nombre: game[i].name,
            img: game[i].large_capsule_image
          });
        } else {
          if (game[i].name.toLowerCase().startsWith(this.searchText.toLowerCase())) {
            this.games.push({
              nombre: game[i].name,
              img: game[i].large_capsule_image,
            });
          }       
        }        
      } else {
        break; /* Cuando no haya mas juegos disponibles se detiene el bucle */
      }
    } 
  }
  /* Cuando busquemos en el buscador, obtendremos los juegos en base a la cadena de texto introducida */
  onSearchTextChange(event: any) {
    const newSearchText = event.target.value;
    this.searchText = newSearchText;
    this.getGames();
  }
  
  /* Método para selccionar el juego, introduciendo ademas los valores en la variable de formulario */
  selectGame(game: any) {
    this.games = [];
    this.isSelected = true;
    this.index = 0;
    this.currentPage = 0;
    this.selected = {
      nombre: game.nombre,
      img: game.img
    };
    this.form.juego =  {nombre: game.nombre}.nombre;
    this.form.fotogrupo = {img: game.img}.img;
  }
  /* Método para cancelar el juego seleccionado */
  resetSelected() {
    this.isSelected = false;
    this.getGames();
  }
  /* Métodos para pasar a la siguiente o anterior pagina de juegos */
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.botonN = true;
      if(this.currentPage == 0) {
        this.botonP = false;
      }
    } 
    this.index-=12;
    this.getGames();

  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.botonP = true;
      if(this.currentPage == this.totalPages - 1) {
        this.botonN = false;
      }
    }
    this.index+=12;
    this.getGames();
  }
  /* Al enviar el formulario... */
  onSubmit(): void{
    /* Creamos constantes con cada campo a partir de los datos introducidos en el form */
    const { codgrupo, nombre, privacidad, descripcion, participantes, juego, fotogrupo} = this.form;
    /* Llamamos al método para crear el grupo pasando todos los valores */
    this.groupService.postGrupo(codgrupo, nombre, privacidad, descripcion, participantes, juego, fotogrupo).subscribe(
    data=>{
      /* Si tiene éxito, cambiamos la variable que valida los campos a false */
      console.log(data);
      this.noValido = false;
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      /* El usuario que haya creado el grupo será su administrador, asignamos ese usuario al grupo recién creado */
      this.groupService.postUsuarioGrupo(codgrupo, username, true).subscribe(
        data => {
          /* Al crear el grupo, se le asigna el contador de cada logro a cero para que comience a contar en cuanto se cree */
          this.groupService.postLogrosGrupo(codgrupo).subscribe(
            data =>{
              /* Enviamos un mensaje automático al grupo indicando que se ha creado correctamente */
              this.groupService.postMensajeGrupo(codgrupo, username, username + " ha creado el grupo " + nombre).subscribe(
                data =>{
                  /* Redirigimos al chat del grupo */
                  this.router.navigate(['/chat', codgrupo]);
                }
              )
            }
          );
        }
      );
    },
    err => {
      /* En caso de error, cambiamos la variable de validacion a true */
      this.noValido = true;
    }
    );
  }
}
