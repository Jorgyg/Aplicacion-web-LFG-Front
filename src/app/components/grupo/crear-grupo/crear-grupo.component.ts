import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {

  groupForm!: FormGroup;
  imagenSeleccionada: string | null = null;
  imagenesPredeterminadas: string[] = [
    'https://marketplace.canva.com/EAEj17Y_k_k/2/0/1600w/canva-amarillo-y-negro-gamer-desgastado-imagen-de-perfil-de-twitch-41B81rUGLAg.jpg',
    'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?tf=3840x',
    'data:image/jpeg;base64,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',
    // Agrega más URLs de imágenes predeterminadas aquí
  ];
  image?: string[] = [];
  games: any[] = [];
  filteredGames: any[] = [];
  searchText: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  index: number = 0;
  isSelected: boolean = false;
  selected: any = {
    nombre: "",
    img: ""
  };
  constructor(private formBuilder: FormBuilder,
              private gamesService: GamesService) {}
  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: [''],
      game: [''],
      description: [''],
      participants: [0],
      privacy: ['']
    });
    this.imagenSeleccionada = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    this.getGames();
  }

  onSave() {
    // Lógica para guardar el formulario
    console.log(this.groupForm.value);
  }

  onCancel() {
    // Lógica para cancelar y limpiar el formulario
    this.groupForm.reset();
  }

  seeImg() {
    this.image = this.imagenesPredeterminadas;
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

  getGames() {
    this.games = [];
    let game = this.gamesService.return();
    for (let i = this.index; i < this.index+10; i++) {
      if (game) {
          this.games.push({ 
            nombre: game[i].name,
            img: game[i].large_capsule_image
          });
        
      } else {
        break; // Detener el bucle si no hay más juegos disponibles
      }
    } 
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
  }

  resetSelected() {
    this.isSelected = false;
    this.getGames();
  }
  
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.index-=10;
    this.getGames();

  }
  
  nextPage() {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
    this.index+=10;
    this.getGames();
  }
}
