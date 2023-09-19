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
  /* Constructor con todos los servicios */
  constructor(private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService, private route: ActivatedRoute){}
  /* Variable para guardar los datos del formulario y del grupo */
  datosGrupo: any;
  form: any = {
    nombre: null,
    privacidad: null,
    descripcion: null,
  };
  /* Al iniciar la vista... */
  ngOnInit(){
    /* Guardamos el codigo de grupo */
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo');
      /* Guardamos los datos del usuario */
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      /* Obtenemos todos los usuarios del grupo para comprobar que el usuario que ha iniciado sesión se encuentre en el grupo */
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
      /* Obtenemos los datos del grupo para mostrarlos en los inputs */
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
    /* Al enviar el formulario primero obtenemos el codigo del grupo y los usuarios */
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      /* Guardamos los datos en variables */
      const participantes = this.datosGrupo.participantes;
      const juego = this.datosGrupo.juego;
      const fotoGrupo = this.datosGrupo.fotoGrupo;
      const { nombre, privacidad, descripcion} = this.form;
      /* Actualizamos los datos del grupo */
      this.groupService.putGrupo(codigo, nombre, privacidad, descripcion, participantes, juego, fotoGrupo).subscribe(
        data=>{
          alert("Cambios guardados correctamente");
          /* Volvemos al chat */
          this.router.navigate(['/chat', codigo]);
        }
      );
    })
  }

  volver(){
    /* Funcion para volver al chat */
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

}
