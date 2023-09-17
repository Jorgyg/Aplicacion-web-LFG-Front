import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-retar-grupo',
  templateUrl: './retar-grupo.component.html',
  styleUrls: ['./retar-grupo.component.css']
})
export class RetarGrupoComponent {
  constructor(private tokenService: TokenStorageService, private router: Router, private groupService: GrupoService, private route: ActivatedRoute){}

  form: any = {
    retado: null,
    mensaje: null
  };

  onSubmit(){
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const {retado, mensaje} = this.form;
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService.postMensajeGrupo(retado, username, "¡EL GRUPO HA SIDO RETADO POR EL GRUPO " + codGrupoNum + "! | " + mensaje).subscribe(
        data=>{
          alert("¡El grupo " + retado + " ha sido retado!");
          this.groupService.putGruposLogros(codGrupoStr + "", 7).subscribe();
          this.groupService.putGruposLogros(codGrupoStr + "", 8).subscribe();
          this.groupService.putGruposLogros(codGrupoStr + "", 9).subscribe();
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
