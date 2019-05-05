import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';

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
        .map((res: Response) => { 
            return res.json();
        })
          .catch((error) : any => {
              location.href = 'http://localhost:4200';
      });
  }

 // --- Service logout
 logout(): Observable<boolean> {
    return this.http.get(this.sharedService.getApi('logout'), this.sharedService.options)
      .timeout(60000)
      .map((res: Response) => res.json())
      .catch((error: Response): any => {
          location.href = 'http://localhost:4200';
      });
 }

}
