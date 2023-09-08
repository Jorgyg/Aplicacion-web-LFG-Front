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
    
  onSubmit(): void{
    const {codgrupo} = this.form;
    const user = this.userService.getUser();
    const username = user.infoUser.username;
    this.groupService.postUsuarioGrupo(codgrupo, username, false).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/chat']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
