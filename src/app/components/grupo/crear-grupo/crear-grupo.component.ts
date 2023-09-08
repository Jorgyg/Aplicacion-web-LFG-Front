import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from '../../../services/games.service';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {

  form: any = {
    codgrupo: null,
    nombre: null,
    privacidad: null,
    descripcion: null,
    participantes: null,
    juego: null,
    fotogrupo: null
  };

  imagenSeleccionada: string | null = null;

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

  selected: any = {
    nombre: "",
    img: ""
  };
  constructor(private formBuilder: FormBuilder,
              private gamesService: GamesService,
              private groupService: GrupoService) {}
  ngOnInit() {
    this.imagenSeleccionada = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    let num = this.gamesService.return().length;

    while(num > 0){
      this.totalPages++;
      num-= 12;
    }
    this.getGames();
  }

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  cambiarImagen() {
    this.imagenSeleccionada = null;
  }

  cancelarSeleccion() {
    this.image = [];
  }

  // Agrega esta función para mostrar el nombre del juego
  showGameName(gameName: string) {
    this.currentGameName = gameName;
    this.isGameNameVisible = true;
  }

  // Agrega esta función para ocultar el nombre del juego
  hideGameName() {
    this.isGameNameVisible = false;
    this.currentGameName = '';
  }

  getGames() {
    this.games = [];
    let game = this.gamesService.return();
    console.log(this.searchText);

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
        break; // Detener el bucle si no hay más juegos disponibles
      }
    } 
  }

  onSearchTextChange(event: any) {
    const newSearchText = event.target.value;
    this.searchText = newSearchText;
    this.getGames();
  }
  

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

  resetSelected() {
    this.isSelected = false;
    this.getGames();
  }
  
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

  onSubmit(): void{

    const { codgrupo, nombre, privacidad, descripcion, participantes, juego, fotogrupo} = this.form;

    this.groupService.postGrupo(codgrupo, nombre, privacidad, descripcion, participantes, juego, fotogrupo).subscribe(

      data=>{
        console.log(data);
      },
      err => {
        console.log(err);
      }

    );
  }
}
