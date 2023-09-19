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
  /* Variable para guardar los datos del formulario */
  form: any = {
    codgrupo: null,
  };
  /* Constructor con los servicios que vamos a utilizar */
  constructor(
    private groupService: GrupoService,
    private userService: TokenStorageService,
    private router: Router
  ) {}
  /* Variables para comprobar el numero de participantes del grupo en concreto */
  maxParticipantes: any;
  cantidadUsers: any;
  grupoLleno: boolean = false;
  /* Al enviar el formulario... */
  onSubmit(): void {
    /* Obtenemos el codigo de grupo y los datos del usuario */
    const { codgrupo } = this.form;
    const user = this.userService.getUser();
    const username = user.infoUser.username;
    /* Obtenemos la cantidad maxima de participantes y el numero de participantes actuales del grupo */
    this.groupService.getGrupo(codgrupo).subscribe((data) => {
      this.maxParticipantes = data.participantes;
    });
    this.groupService.getUsuariosGrupo(codgrupo).subscribe((data) => {
      this.cantidadUsers = data.length;
    });
    /* SI esta cantidad no excede la máxima, el usuario se une al grupo, si la excede se avisa con un boolean para mostrar un mensaje de advertencia */
    setTimeout(() => {
      if (this.maxParticipantes > this.cantidadUsers) {
        this.groupService.postUsuarioGrupo(codgrupo, username, false).subscribe(
          (data) => {}
        );
        /* Reenviamos al usuario al chat */
        this.router.navigate(['/chat', codgrupo]);
      } else {
        this.grupoLleno = true;
      }
    }, 1000);
  }
}
