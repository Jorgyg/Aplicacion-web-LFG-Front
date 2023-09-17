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
  user: any;
  miembroUser: any;

  constructor(private router: Router, private groupService: GrupoService, private route: ActivatedRoute, private tokenService: TokenStorageService){}

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.user = this.tokenService.getUser();
      const username = this.user.infoUser.username;
      this.groupService.getUsuarioGrupo(this.user.infoUser.username, codigo).subscribe(
        data=>{
          this.miembroUser = data;
        } 
      );
      console.log(this.miembroUser);
      this.groupService.getUsuariosGrupo(codigo + "").subscribe(
        data=>{
          this.miembros = data;
        },
        err => {
          console.log(err);
        }
      );
    })
  }

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

  cambiarRol(event: any, username: string){
    const admin = event.target.value;
  }

  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

}
