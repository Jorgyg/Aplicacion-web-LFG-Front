import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from 'src/app/services/grupo.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-retar-grupo',
  templateUrl: './retar-grupo.component.html',
  styleUrls: ['./retar-grupo.component.css']
})
/* Constructor con los servicios que vamos a utilizar */
export class RetarGrupoComponent {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private groupService: GrupoService,
    private route: ActivatedRoute
  ) {}
  /* Variables que vamos a utilizar para guardar los diferentes juegos en cartas y paginarlos */
  juego = "";
  cardData: any[] = [];
  form: any = {
    retado: null,
    mensaje: null
  };
  showFormView = true;
  currentPage = 1;
  cardsPerPage = 5;
  /* Al iniciar ...*/
  ngOnInit() {
    /* Guardamos el codigo de grupo y los datos del usuario */
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      /* Si el usuario no pertenece al grupo se le redirige al main */ 
      this.groupService.getUsuariosGrupo(codGrupoStr + "").subscribe(
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
    /* Obtenemos los datos del grupo */
      this.groupService.getGrupo(codGrupoStr + "").subscribe((data) => {
        this.juego = data.juego;
      });

      setTimeout(() => {
      /* Obtenemos los datos de todos los grupos y los asignamos a una carta */
      this.groupService.getGrupos().subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].juego == this.juego && data[i].codGrupo != codGrupoStr + "") {
              this.cardData.push(data[i]);
            }
          }
        });

      }, 1000);
    });
  }

  /* Métodos para paginar */
  toggleView(): void {
    this.showFormView = !this.showFormView;
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = this.currentPage * this.cardsPerPage;
    return this.cardData.slice(startIndex, endIndex);
  }
  /* Al enviar el formulario... */
  onSubmit() {
    /* Guardamos el codigo de grupo, los campos introducidos en el formulario y los datos del usuario */
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const { retado, mensaje } = this.form;
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      /* Enviamos el aviso de reto al grupo destino mediante un mensaje de advertencia */
      this.groupService.postMensajeGrupo(retado, username, "¡EL GRUPO HA SIDO RETADO POR EL GRUPO " + codGrupoNum + "! | " + mensaje).subscribe(
        data=>{
          /* Asignamos una unidad a los logros relacionados con retar */
          alert("¡El grupo " + retado + " ha sido retado!");
          this.groupService.putGruposLogros(codGrupoStr + "", 7).subscribe();
          this.groupService.putGruposLogros(codGrupoStr + "", 8).subscribe();
          this.groupService.putGruposLogros(codGrupoStr + "", 9).subscribe();
        }
      );
    })
  }
  /* Si pulsamos el boton de retar a un grupo en especifico enviamos la solicitud de reto, misma logica que el anterior metodo  */
  enviarSolicitudReto(codGrupoRetado: string) {
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService
        .postMensajeGrupo(
          codGrupoRetado,
          username,
          "¡EL GRUPO HA SIDO RETADO POR EL GRUPO " +
            codGrupoNum
        )
        .subscribe(
          (data) => {
            alert("¡El grupo " + codGrupoRetado + " ha sido retado!");
            this.groupService.putGruposLogros(codGrupoStr + "", 7).subscribe();
            this.groupService.putGruposLogros(codGrupoStr + "", 8).subscribe();
            this.groupService.putGruposLogros(codGrupoStr + "", 9).subscribe();
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  /* Metodo para regresar al main */
  volver() {
    this.route.paramMap.subscribe((params) => {
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    });
  }
  /* Metodos de paginacion */
  changePage(page: number | string, event: Event): void {
    event.preventDefault();
    if (page === 'prev' && this.currentPage > 1) {
      this.showPage(this.currentPage - 1);
    } else if (
      page === 'next' &&
      this.currentPage <
        Math.ceil(this.cardData.length / this.cardsPerPage)
    ) {
      this.showPage(this.currentPage + 1);
    }
  }

  showPage(page: number): void {
    this.currentPage = page;
  }
}
