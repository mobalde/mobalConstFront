import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { SharedService } from '../../../shared/shared.service';


@Injectable()
export class AuthService{

    user : User;

    constructor(private sharedService: SharedService, private http: Http, private router: Router){
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    isUserLoggedIn(): Observable<boolean>{
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.user !== null){
            return this.http.get(this.sharedService.getApi('currentUser/'+this.user.email), this.sharedService.options)
            .timeout(60000)
               .map((res: Response) => res.json())
                .catch((error: Response): any => {
                Observable.throw(error);
              });
        }
    }

    isLoggerActivate(){
        if(this.isUserLoggedIn){
            return true;
        }
        return false;
    }
    
}