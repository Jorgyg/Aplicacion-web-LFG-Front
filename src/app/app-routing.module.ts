import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './complements/login/login.component';
import { RegisterComponent } from './complements/register/register.component';
import { MainComponent } from './complements/main/main.component';
import { HomeComponent } from './complements/home/home.component';
import { CrearGrupoComponent } from './complements/crear-grupo/crear-grupo.component';
import { UnirseGrupoComponent } from './complements/unirse-grupo/unirse-grupo.component';
import { ChatGrupoComponent } from './complements/chat-grupo/chat-grupo.component';
import { LogrosGrupoComponent } from './complements/logros-grupo/logros-grupo.component';
import { MiembrosGrupoComponent } from './complements/miembros-grupo/miembros-grupo.component';
import { EventosGrupoComponent } from './complements/eventos-grupo/eventos-grupo.component';
import { PerfilComponent } from './complements/perfil/perfil.component';
import { AjustesGrupoComponent } from './complements/ajustes-grupo/ajustes-grupo.component';
import { RetarGrupoComponent } from './complements/retar-grupo/retar-grupo.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "main", component: MainComponent },
  { path: "crear", component: CrearGrupoComponent },
  { path: "unirse", component: UnirseGrupoComponent },
  { path: "chat", component: ChatGrupoComponent },
  { path: "logros", component: LogrosGrupoComponent },
  { path: "miembros", component: MiembrosGrupoComponent },
  { path: "eventos", component: EventosGrupoComponent },
  { path: "ajustes", component: AjustesGrupoComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "retar", component: RetarGrupoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
