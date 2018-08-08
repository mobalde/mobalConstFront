import { Marchandise } from './../models/marchandise';
import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { SharedService } from '../../../shared/shared.service';


@Injectable()
export class MarchandisesService{

    constructor(private sharedService: SharedService, private http: Http, private route: ActivatedRoute, private router: Router) {
    }

    // servie ajout marchandise
    postMarchandise(marchandise: Marchandise): Observable<Marchandise>{
        const data = JSON.stringify(marchandise);
        return this.http.post(this.sharedService.getApi('ajout/marchandise'), data,  this.sharedService.options)
        .timeout(60000)
        .map((res: Response)=> res.json())
        .catch((error: Response | any): any => {
            if(error.status === 403){
              this.sharedService.displayError('errorConnexion');
              Observable.throw(error);
            }
          });
    }

    getNombreDeSacAnterieur(): Observable<Number> {
        return this.http.get(this.sharedService.getApi('sacAnterieur'), this.sharedService.options)
        .timeout(60000)
        .map((res: Response) => res.json())
        .catch((error: Response | any): any => {
            if(error.status === 403){
              this.sharedService.displayError('errorConnexion');
              Observable.throw(error);
            }
          });
    }
}