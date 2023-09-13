import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-retar-grupo',
  templateUrl: './retar-grupo.component.html',
  styleUrls: ['./retar-grupo.component.css']
})
export class RetarGrupoComponent {
  constructor(private router: Router, private groupService: GrupoService, private route: ActivatedRoute){}

  volver(){
    this.route.paramMap.subscribe((params) =>{
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    })
  }

}
