import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {
  groupForm!: FormGroup;
  imagenSeleccionada: string | null = null;
  imagenesPredeterminadas: string[] = [
    'url_de_imagen_1.jpg',
    'url_de_imagen_2.jpg',
    'url_de_imagen_3.jpg',
    // Agrega más URLs de imágenes predeterminadas aquí
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      groupName: [''],
      game: [''],
      description: [''],
      participants: [0],
      privacy: ['']
    });
  }

  onSave() {
    // Lógica para guardar el formulario
    console.log(this.groupForm.value);
  }

  onCancel() {
    // Lógica para cancelar y limpiar el formulario
    this.groupForm.reset();
  }

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  cambiarImagen() {
    this.imagenSeleccionada = null;
  }
}
