import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    passwd: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = ''
  roles = "";

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router){}

  ngOnInit(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void{
    const {username, passwd} = this.form;
    
    this.authService.login(username, passwd).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/main']);
      },
      err =>{
        console.log(err);
        this.errorMessage = err.errorMessage;
        this.isLoginFailed = true;
      }
    )
  }

  reloadPages():void{
    window.location.reload();
  }

}
