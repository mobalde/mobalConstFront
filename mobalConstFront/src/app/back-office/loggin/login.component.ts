import { AuthGuardService } from './guards/auth-guard.service';
import { AuthService } from './guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { LoginService } from '../loggin/async-services/login.service';
import { User } from '../loggin/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private auth: AuthService, private loginService: LoginService) { }

  ngOnInit() {
  }

  logger(){
    this.loginService.authentification(this.user.email,this.user.password).subscribe(
      data => {
        this.user = data;
        if(this.user.password === null){
            localStorage.setItem('currentUser', JSON.stringify(this.user)); // Sauvegarder l'utilisateur dans la variable de session
            this.auth.setUserLoggedIn(true);
            this.router.navigate(['home']);
        }
        else{
          this.auth.setUserLoggedIn(false);
          this.router.navigate(['']);
        }
      }, error => {
        console.log("---- error server: ");
      }
    );
  }

}
