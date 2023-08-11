import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './complements/login/login.component';
import { RegisterComponent } from './complements/register/register.component';
import { HomeComponent } from './complements/home/home.component';
import { PerfilComponent } from './complements/perfil/perfil.component';
import { MainComponent } from './complements/main/main.component';
import { AjustesGrupoComponent } from './complements/ajustes-grupo/ajustes-grupo.component';
import { CrearGrupoComponent } from './complements/crear-grupo/crear-grupo.component';
import { UnirseGrupoComponent } from './complements/unirse-grupo/unirse-grupo.component';
import { ChatGrupoComponent } from './complements/chat-grupo/chat-grupo.component';
import { LogrosGrupoComponent } from './complements/logros-grupo/logros-grupo.component';
import { MiembrosGrupoComponent } from './complements/miembros-grupo/miembros-grupo.component';
import { EventosGrupoComponent } from './complements/eventos-grupo/eventos-grupo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    EventosGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
