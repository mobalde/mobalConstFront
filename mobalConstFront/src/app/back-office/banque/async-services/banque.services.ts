import { VenduInBanque } from './../models/vendu-in-banque';
import { SharedService } from './../../../shared/shared.service';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class BanqueService{

    constructor(private sharedService: SharedService, private http: Http, private route: ActivatedRoute, private router: Router){}
    
    getListDeVenteNonComptabiliser(libellePreoduit: String):Observable<VenduInBanque[]>{
        return this.http.get(this.sharedService.getApi('all/notVenduInBanque/'+libellePreoduit), this.sharedService.options)
        .timeout(60000)
        .map((res: Response) => res.json())
        .catch((error: Response | any): any => {
            if(error.status === 403){
              this.sharedService.displayError('errorConnexion');
              Observable.throw(error);
            }
        });
    }

    postVenteSemaine(venteSemaine: VenduInBanque){
        const data = JSON.stringify(venteSemaine);
        return this.http.post(this.sharedService.getApi('save/venteSemaine/'), data, this.sharedService.options);
    }

    getSoldeAnterieur(id: Number): Observable<Number>{
        return this.http.get(this.sharedService.getApi('getsoldeanterieur/'+id), this.sharedService.options)
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