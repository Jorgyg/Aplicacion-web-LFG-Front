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
  
  listaLogros: any = [];
  progresoGrupo: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,  private tokenService: TokenStorageService, private groupService: GrupoService){}
  
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
    this.groupService.getLogrosEvento().subscribe(
      data=>{
        console.log(data);
        this.listaLogros = data;
        this.mostrarAlcanzado();
      },
      err => {
        console.log(err);
      }
    );
  });
}

  mostrarAlcanzado(){
    this.route.paramMap.subscribe((params) =>{
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      this.groupService.getProgresoLogro(codGrupoNum).subscribe(
        data=>{
          this.progresoGrupo = data;
          console.log(this.progresoGrupo);
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
