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
  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private groupService: GrupoService,
    private route: ActivatedRoute
  ) {}

  juego = "";
  cardData: any[] = [];
  form: any = {
    retado: null,
    mensaje: null
  };
  showFormView = true;
  currentPage = 1;
  cardsPerPage = 5;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      this.groupService.getGrupo(codGrupoStr + "").subscribe((data) => {
        this.juego = data.juego;
      });

      this.groupService.getGrupos().subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].juego == this.juego && data[i].codGrupo != codGrupoStr + "") {
            this.cardData.push(data[i]);
          }
        }
      });
    });
  }


toggleView(): void {
  this.showFormView = !this.showFormView;
}

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = this.currentPage * this.cardsPerPage;
    return this.cardData.slice(startIndex, endIndex);
  }

  onSubmit() {
    this.route.paramMap.subscribe((params) => {
      const codGrupoStr = params.get('codigo');
      const codGrupoNum = Number(codGrupoStr);
      const { retado, mensaje } = this.form;
      const user = this.tokenService.getUser();
      const username = user.infoUser.username;
      this.groupService
        .postMensajeGrupo(
          retado,
          username,
          "¡EL GRUPO HA SIDO RETADO POR EL GRUPO " +
            codGrupoNum +
            "! | " +
            mensaje
        )
        .subscribe(
          (data) => {
            alert("¡El grupo " + retado + " ha sido retado!");
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

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
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  volver() {
    this.route.paramMap.subscribe((params) => {
      const codigo = params.get('codigo') + "";
      this.router.navigate(['/chat', codigo]);
    });
  }

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
