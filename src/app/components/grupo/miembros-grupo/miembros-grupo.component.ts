import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-miembros-grupo',
  templateUrl: './miembros-grupo.component.html',
  styleUrls: ['./miembros-grupo.component.css']
})
export class MiembrosGrupoComponent {
  /* Variable para guardar los miembros del grupo */
  miembros: any;
  /* Constructor con los servicios que vamos a utilizar */
  constructor(private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService, private route: ActivatedRoute){}
  /* Variables para guardar los datos del usuario y los de su perfil en ese grupo */
  user: any;
  miembroUser: any;
  /* Al iniciar... */
  ngOnInit(){
    /* Guaramos el codigo de grupo y los datos del usuario */
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.user = this.tokenService.getUser();
      const username = this.user.infoUser.username;
      /* Obtenemos los usuarios del grupo y comprobamos que el usuario se encuentre en él, de otra forma se le redirige al main */
      this.groupService.getUsuarioGrupo(this.user.infoUser.username, codigo).subscribe(
        data=>{
          this.miembroUser = data;
        } 
      );
      console.log(this.miembroUser);
      this.groupService.getUsuariosGrupo(codigo + "").subscribe(
        data=>{
          var isInGroup = false;
          for (let i = 0; i < data.length; i++) {
            if(data[i].usuario.username == username){ 
              isInGroup = true;
            }  
          }
          if(!isInGroup){
            this.router.navigate(['/main']);
          }
          /* Guardamos los miembros del grupo */
          this.miembros = data;
        })
    })
  }

  /* Método para salirse del grupo o expulsar a un miembro si eres admin del grupo */
  salir(username: string){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.groupService.deleteUsuarioGrupo(codigo + "", username).subscribe(
        data=>{
          location.reload();
        }
      );
    })
  }
  /* Método para cambiar de rol a un usuario en caso de ser admin del grupo */
  cambiarRol(event: any, username: string){
    const admin = event.target.value;
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.groupService.putAdmin(admin, username, codigo).subscribe(
        data=>{
          location.reload();
        }
      );
    })
  }
  /* Método para regresar al main */
  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

}
