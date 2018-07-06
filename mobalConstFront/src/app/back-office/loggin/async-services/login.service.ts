import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { User } from './../models/user';

import { SharedService } from '../../../shared/shared.service';

@Injectable()
export class LoginService {
 
  authRequired = true;
  isloggedIn: boolean = false;

  constructor(private sharedService: SharedService, private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  // --- Service authentification
  authentification(email: String, password: String): Observable<User> {
    const data = JSON.stringify({ email, password });
    return this.http.post(this.sharedService.getApi('login'), data,  this.sharedService.options)
    .timeout(60000)
    .map((res: Response) => res.json())
    .catch((error: Response): any => {
      Observable.throw(error);
    });
  }

  // --- Service logout
  logout() {
    let url = this.sharedService.getApiLogout();
     this.http.request(url, this.sharedService.options)
     .timeout(60000)
     .map((res: Response) => { res.json();
         if (res.status === 200) {
           this.router.navigate(['logout']);
         }
      }).catch(() => {
            this.router.navigate(['logout']);
            return Observable.of(false);
        }).subscribe();
  }

}
