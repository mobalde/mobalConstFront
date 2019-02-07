import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private http: Http) { }

  ngOnInit() {
  }

  navigation(page: String){

    switch(page){
      case 'ajout':
      this.router.navigate(['bilanCompte']);
      break;
    }
  }

}
