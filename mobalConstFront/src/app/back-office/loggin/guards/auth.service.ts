import { Observable } from 'rxjs';
import { UserService } from './../async-services/user.service';
import { Injectable } from '@angular/core';
import { LoginService } from '../async-services/login.service';
import { User } from '../models/user';
import { error } from 'protractor';


@Injectable()
export class AuthService{


    isloggedIn: boolean;
    constructor(private loginService: LoginService, private userservice: UserService){
    }

    // --- authentification
    isUserAuthenticated(email: String, password: String): boolean{
        this.loginService.authentification(email,password).subscribe(
          data => {
            this.userservice.user = data;
            if(this.userservice.user.password === null){
                this.setUserLoggedIn(true);
            }
          }, error => {
            console.log("---- error server: ");
          }
        );
        return this.isUserLoggedIn();
    }


    isUserLoggedIn(): boolean {
	    return this.isloggedIn;
    }
    
    setUserLoggedIn(islog: boolean){
        this.isloggedIn = islog;
    }
}