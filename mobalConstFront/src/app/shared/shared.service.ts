import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions ,ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable, Subject, of, Observer} from 'rxjs'
import 'rxjs/add/observable/from';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedService {
    private _apiPrefixUrl = 'http://localhost:8080'; // url prefix
    private _apiPrexixDomain = '/mobalc'; // url suffixe for webservice back
    public options = new RequestOptions({ headers: this.createHeaders(), withCredentials: true});    
    //public optionsForPDF = new RequestOptions({ headers: this.createHeaders(), withCredentials: true, responseType: ResponseContentType.Blob });

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    private createHeaders() {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', `http://localhost:4200`);
        headers.append("Access-Control-Allow-Headers", "X-Auth-Token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }
    private get _apiUrl() {
        return this._apiPrefixUrl + this._apiPrexixDomain;
    }
    public getApi(api: string): string {
        return this._apiUrl + '/' + api;
    }
    public getApiLogout(): string {
        return this._apiUrl + '/logout?local=true';
    }
    public errorHandler(error: any) {
        if (error.status === 401) {
            if (document.location.href.slice(-4) != 'home') {
                alert('session expirée, veuillez vous reconnecter')
            }
            console.log('Server error : ' + error.status);
            this.router.navigate(['']);
        } else if (error.status === 409 || error.status === 405) {
              alert(error._body);
              console.log('Server error : ' + error.status);
        }
    }

}