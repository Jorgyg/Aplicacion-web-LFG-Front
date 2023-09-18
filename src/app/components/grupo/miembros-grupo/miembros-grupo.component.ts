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
  miembros: any;
  
  constructor(private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
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
      this.groupService.getUsuariosGrupo(codigo + "").subscribe(
        data=>{
          console.log(data);
          this.miembros = data
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
