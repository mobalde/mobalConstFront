import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthGuardService implements CanActivate{

    isLogger: String;
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(){
        if(this.authService.isLoggerActivate()){
            return true;
        }
        this.router.navigate[''];
        return false;
    }
}