//import { Observable } from 'rxjs/Rx';
import { LoginService } from './../async-services/login.service';
import { SharedService } from './../../../shared/shared.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthGuardService implements CanActivate{
    
    constructor(private router: Router, private http: Http, private sharedService: SharedService, private loginService: LoginService) {
    }
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        if(user !== null){
            return this.http.get(this.sharedService.getApi('currentUser/'+user.email), this.sharedService.options)
            .map((res: Response) => {
                if(res.status === 200){
                    if(res.json() === true){
                       return true;
                    }
                }
                state.url = '';
                location.href = 'http://localhost:4200';
                return false;
            }).catch(() => {
                if(state.url === ''){
                    this.router.navigate(['']);
                }
                else {
                    state.url = '';
                    this.deleteCurrUser();
                    location.href = 'http://localhost:4200';
                }
                return Observable.of(false);
              });
        }
        else{
            return Observable.of(false);
        }
    }

    deleteCurrUser(){
        sessionStorage.clear();
    }
}