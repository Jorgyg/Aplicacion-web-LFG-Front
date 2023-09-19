import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-unirse-grupo',
  templateUrl: './unirse-grupo.component.html',
  styleUrls: ['./unirse-grupo.component.css'],
})
export class UnirseGrupoComponent {
  form: any = {
    codgrupo: null,
  };

  constructor(
    private groupService: GrupoService,
    private userService: TokenStorageService,
    private router: Router
  ) {}

  maxParticipantes: any;
  cantidadUsers: any;
  grupoLleno: boolean = false;
  grupoNoExiste = false;
  onSubmit(): void {
    const { codgrupo } = this.form;
    const user = this.userService.getUser();
    const username = user.infoUser.username;

    this.groupService.getGrupo(codgrupo).subscribe(
      (data) => {
        this.maxParticipantes = data.participantes;
        console.log(this.maxParticipantes);
        this.groupService.getUsuariosGrupo(codgrupo).subscribe((data) => {
          this.cantidadUsers = data.length;
        });
        setTimeout(() => {
          if (this.maxParticipantes > this.cantidadUsers) {
            this.groupService.postUsuarioGrupo(codgrupo, username, false).subscribe(
              (data) => {},
              (err) => {
                console.log(err);
              }
            );
          } else {
            this.grupoLleno = true;
          }
        }, 1000);
      },
      (error) => {
        this.grupoNoExiste = true;
        setTimeout(() =>{
        this.grupoNoExiste = false;

        },3000);
      });

        
   
  }
}
