import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-logros-grupo',
  templateUrl: './logros-grupo.component.html',
  styleUrls: ['./logros-grupo.component.css']
})
export class LogrosGrupoComponent {
  
  listaLogros: any = [];
  progresoGrupo: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GrupoService){}
  
  ngOnInit(){
    this.groupService.getLogrosEvento().subscribe(
      data=>{
        console.log(data);
        this.listaLogros = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }
}
