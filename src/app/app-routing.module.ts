import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './complements/login/login.component';
import { RegisterComponent } from './complements/register/register.component';

const routes: Routes = [
  


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
