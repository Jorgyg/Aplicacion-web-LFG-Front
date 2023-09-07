import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MainComponent } from './components/main/main.component';
import { AjustesGrupoComponent } from './components/grupo/ajustes-grupo/ajustes-grupo.component';
import { CrearGrupoComponent } from './components/grupo/crear-grupo/crear-grupo.component';
import { UnirseGrupoComponent } from './components/grupo/unirse-grupo/unirse-grupo.component';
import { ChatGrupoComponent } from './components/grupo/chat-grupo/chat-grupo.component';
import { LogrosGrupoComponent } from './components/grupo/logros-grupo/logros-grupo.component';
import { MiembrosGrupoComponent } from './components/grupo/miembros-grupo/miembros-grupo.component';
import { EventosGrupoComponent } from './components/grupo/eventos-grupo/eventos-grupo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RetarGrupoComponent } from './components/grupo/retar-grupo/retar-grupo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PerfilComponent,
    MainComponent,
    AjustesGrupoComponent,
    CrearGrupoComponent,
    UnirseGrupoComponent,
    ChatGrupoComponent,
    LogrosGrupoComponent,
    MiembrosGrupoComponent,
    EventosGrupoComponent,
    RetarGrupoComponent,
    BoardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
