import { SharedService } from './../../shared/shared.service';
import { AuthGuardService } from './guards/auth-guard.service';
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
  erreurConnexion: String = null;

  constructor(private router: Router, private http: Http, private loginService: LoginService,private sharedService: SharedService) {
       this.sharedService.errorSubject.subscribe(
         value => {
           this.erreurConnexion = value;
         }
       );
  }

  ngOnInit() {
    if(this.user !== null){
      // --- Redirection sur la page Home
      this.router.navigate(['home']);
    }
  }

  logger(){
    this.loginService.authentification(this.user.email,this.user.password).subscribe(
      data => {
        this.user = data;
        localStorage.setItem('currentUser', JSON.stringify(this.user)); // Sauvegarder l'utilisateur dans la variable de session
        var datetimes = new Date();
        localStorage.setItem('temps',JSON.stringify(datetimes.getTime())); 
        this.router.navigate(['home']);
      },
      err => {
        console.log("____ err: ",err);
      }
    );
  }

}
