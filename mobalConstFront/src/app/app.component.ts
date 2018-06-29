import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './back-office/loggin/models/user';
import { LoginService } from './back-office/loggin/async-services/login.service';
import {} from '../app/back-office/loggin/async-services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User = new User();

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private http: Http){}
  title = 'Authentification';

  authentification(){
    this.loginService.authentification(this.user.email, this.user.password).subscribe(
      data => {
        console.log('____ data: ',data);
      }
    );
  }

}
