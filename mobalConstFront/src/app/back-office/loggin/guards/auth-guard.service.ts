import { SharedService } from './../../../shared/shared.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthGuardService implements CanActivate{

    
    constructor(private router: Router, private http: Http, private sharedService: SharedService) {
    }
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if(user !== null){
            return this.http.get(this.sharedService.getApi('currentUser/'+user.email), this.sharedService.options)
            .map((res: Response) => {
                if(res.status === 200){
                    if(res.json() === true){
                       return true;
                    }
                    else{
                        this.router.navigate[''];
                        return false;
                    }
                }
                this.router.navigate[''];
                return false;
            })
        }
        else{
            this.router.navigate[''];
            return Observable.of(false);
        }
    }
}