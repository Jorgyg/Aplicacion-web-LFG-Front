import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-ajustes-grupo',
  templateUrl: './ajustes-grupo.component.html',
  styleUrls: ['./ajustes-grupo.component.css']
})

export class AjustesGrupoComponent {
  constructor(private router: Router, private groupService: GrupoService, private route: ActivatedRoute){}
  datosGrupo: any;
  form: any = {
    nombre: null,
    privacidad: null,
    descripcion: null,
  };

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      this.groupService.getGrupo(codigo + "").subscribe(
        data=>{
          this.datosGrupo = data;
          this.form.nombre = this.datosGrupo.nombre;
          this.form.privacidad = this.datosGrupo.privacidad;
          this.form.descripcion = this.datosGrupo.descripcion;
        },
        err => {
          console.log(err);
        }
      );
    })
  }

  onSubmit(): void{

    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      const participantes = this.datosGrupo.participantes;
      const juego = this.datosGrupo.juego;
      const fotoGrupo = this.datosGrupo.fotoGrupo;
      const { nombre, privacidad, descripcion} = this.form;
      this.groupService.putGrupo(codigo, nombre, privacidad, descripcion, participantes, juego, fotoGrupo).subscribe(
        data=>{
          console.log(data);
          alert("Cambios guardados correctamente");
          this.router.navigate(['/chat', codigo]);
        },
        err => {
          console.log(err);
        }
      );
    })
  }

  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

}
