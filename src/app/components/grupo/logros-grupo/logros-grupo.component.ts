import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logros-grupo',
  templateUrl: './logros-grupo.component.html',
  styleUrls: ['./logros-grupo.component.css']
})
export class LogrosGrupoComponent {
  /* Variables para guardar datos de los logros y progreso */
  listaLogros: any = [];
  progresoGrupo: any[] = [];
  /* Constructor con los servicios que vamos a utilizar */
  constructor(private route: ActivatedRoute, private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService){}
  /* Al iniciar... */
  ngOnInit(){
    /* Obtenemos el codigo de grupo y los datos del usuario */
    this.route.paramMap.subscribe((params) =>{
    const codigo = params.get('codigo');
    const user = this.tokenService.getUser();
    const username = user.infoUser.username;
    /* Obtenemos los usuarios del grupo para comprobar que el usuario logeado exista, de otro modo se le reenvia al main*/
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

      }
  );
  /* Obtenemos los logros, los guardamos y llamamos a mostrarAlcanzado para mostrar el progreso del grupo*/
  this.groupService.getLogrosEvento().subscribe(
      data=>{
        this.listaLogros = data;
        this.mostrarAlcanzado();
      }
    );
  });
}
  /* Método para guardar el progreso del grupo en local */
  mostrarAlcanzado(){
    /* Obtenemos el codigo de grupo */
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      /* Obtenemos el progreso de ese grupo y lo guardamos */
      this.groupService.getProgresoLogro(codGrupoNum).subscribe(
        data=>{
          this.progresoGrupo = data;
        }
      );
    })
  }
  /* Método para volver al menu */
  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }
}
