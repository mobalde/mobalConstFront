//import { Observable } from 'rxjs/Rx';
import { LoginService } from './../async-services/login.service';
import { SharedService } from './../../../shared/shared.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthGuardService implements CanActivate{

    
    constructor(private router: Router, private http: Http, private sharedService: SharedService, private loginService: LoginService) {
    }
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        // this.timeOut(state);
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

    // Si aucune activité sur l'appli pendant 30mn, se deconnecter
    /*timeOut(state: RouterStateSnapshot){
        var dateTimes = new Date();
        var timesNow = dateTimes.getTime();
        var dates1 = parseInt(localStorage.getItem('temps'));
        var diff = timesNow - dates1;
        var sec = Math.floor(diff/1000); // Nombre de seconde entre les 2 dates
        if(!isNaN(sec) && sec > 20 ){
            localStorage.removeItem('temps');
            this.loginService.logout().subscribe(
                data => {
                    if(localStorage.getItem('currentUser') !== null){
                      this.deleteCurrUser();
                    }
                    state.url = '';
                    this.router.navigate(['']);
                }, error => {
                  state.url = '';
                  this.router.navigate(['']);
                }
            );
            return false;
        }
        else {
            localStorage.removeItem('temps');
            localStorage.setItem('temps',JSON.stringify(timesNow));
        }
    }*/

    deleteCurrUser(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('temps');
    }
}