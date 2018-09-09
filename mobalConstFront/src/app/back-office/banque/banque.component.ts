import { VenduInBanque } from './models/vendu-in-banque';
import { ProduitsService } from './../produit/async-services/produits.services';
import { Produit } from './../produit/models/produit';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {

  venduInBanque: Array<VenduInBanque> = [];
  produit: Produit[];
  constructor(private sharedService: SharedService, private http: Http, private produitService: ProduitsService) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageBanque');
    
  }

  getListDeVenteNonComptabiliser(){
     
  }
}
