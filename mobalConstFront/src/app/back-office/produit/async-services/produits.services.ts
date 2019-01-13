import { Produit } from './../models/produit';
import { Component, OnInit, Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { SharedService } from '../../../shared/shared.service';


@Injectable()
export class ProduitsService {

    constructor(private sharedService: SharedService, private http: Http, private route: ActivatedRoute, private router: Router) {
    }

    getQuantiteCommande(libelle: String): Observable<Number> {
        return this.http.get(this.sharedService.getApi('produit/quanitite/'+libelle), this.sharedService.options)
        .timeout(60000)
        .map((res: Response) => res.json())
        .catch((error: Response | any): any => {
            if(error.status === 403){
              this.sharedService.displayError('errorConnexion');
              Observable.throw(error);
            }
          });
    }

    getProduit(type: String): Observable<Produit> {
        return this.http.get(this.sharedService.getApi('produit/type/'+type), this.sharedService.options)
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