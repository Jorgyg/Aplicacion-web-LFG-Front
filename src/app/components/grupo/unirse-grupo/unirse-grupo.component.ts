import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-unirse-grupo',
  templateUrl: './unirse-grupo.component.html',
  styleUrls: ['./unirse-grupo.component.css']
})
export class UnirseGrupoComponent {

  form: any = {
    codgrupo: null,
  };

  constructor(private groupService: GrupoService, private userService: TokenStorageService, private router: Router){}
  numUsuarios = 0;
    
  onSubmit(): void{
    const {codgrupo} = this.form;
    const user = this.userService.getUser();
    const username = user.infoUser.username;
    this.groupService.getUsuariosGrupo(codgrupo + "").subscribe(
      (usuarioEnGrupo) => {
        var isInGroup = false;
        for (let i = 0; i < usuarioEnGrupo.length; i++) {
          this.numUsuarios++;  
        }
        if(this.numUsuarios++){
          this.router.navigate(['/main']);
        }

      },
    (error) => {
      console.error("Error al verificar la pertenencia al grupo: ", error);
    }
  );
    this.groupService.postUsuarioGrupo(codgrupo, username, false).subscribe(
      data=>{
      },
      err => {
        console.log(err);
      }
    );
    this.router.navigate(['/chat', codgrupo]);
  }
}
