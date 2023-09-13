import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-miembros-grupo',
  templateUrl: './miembros-grupo.component.html',
  styleUrls: ['./miembros-grupo.component.css']
})
export class MiembrosGrupoComponent {
  miembros: any;
  
  constructor(private router: Router, private groupService: GrupoService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
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
