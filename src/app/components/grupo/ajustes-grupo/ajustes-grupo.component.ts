import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-ajustes-grupo',
  templateUrl: './ajustes-grupo.component.html',
  styleUrls: ['./ajustes-grupo.component.css']
})

export class AjustesGrupoComponent {
  constructor(private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService, private route: ActivatedRoute){}
  datosGrupo: any;
  form: any = {
    nombre: null,
    privacidad: null,
    descripcion: null,
  };

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService.getUsuariosGrupo(codigo + "").subscribe(
        (usuarioEnGrupo) => {
          var isInGroup = false;
          for (let i = 0; i < usuarioEnGrupo.length; i++) {

            if(usuarioEnGrupo[i].usuario.username == username){ 
              isInGroup = true;
            }  

          }
          if(!isInGroup){
            this.router.navigate(['/main']);
          }

        },
      (error) => {
        console.error("Error al verificar la pertenencia al grupo: ", error);
      }
    );
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
