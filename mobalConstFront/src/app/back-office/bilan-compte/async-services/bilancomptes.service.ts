import { SharedService } from './../../../shared/shared.service';
import { Vendu } from './../models/vendu';
import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Produit } from '../../produit/models/produit';

@Injectable()
export class BilancompteService{

    constructor(private sharedService: SharedService, private http: Http, private route: ActivatedRoute, private router: Router) {
    }

    postListeVente(listVente: Array<Vendu>): Observable<boolean>{
        const data = JSON.stringify(listVente);
        return this.http.post(this.sharedService.getApi('add'), data,  this.sharedService.options)
        .timeout(60000)
        .map((res: Response)=> res.json())
        .catch((error: Response | any): any => {
            if(error.status === 500){
              Observable.throw(error);
            }
          });
    }
}