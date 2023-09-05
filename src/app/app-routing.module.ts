import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { CrearGrupoComponent } from './components/grupo/crear-grupo/crear-grupo.component';
import { UnirseGrupoComponent } from './components/grupo/unirse-grupo/unirse-grupo.component';
import { ChatGrupoComponent } from './components/grupo/chat-grupo/chat-grupo.component';
import { LogrosGrupoComponent } from './components/grupo/logros-grupo/logros-grupo.component';
import { MiembrosGrupoComponent } from './components/grupo/miembros-grupo/miembros-grupo.component';
import { EventosGrupoComponent } from './components/grupo/eventos-grupo/eventos-grupo.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AjustesGrupoComponent } from './components/grupo/ajustes-grupo/ajustes-grupo.component';
import { RetarGrupoComponent } from './components/grupo/retar-grupo/retar-grupo.component';
//Rutas a cada vista de la aplicacion
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent, data:{background: "./assets/img/logo1.png"}},
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
