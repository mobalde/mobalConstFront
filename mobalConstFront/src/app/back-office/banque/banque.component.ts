import { BanqueService } from './async-services/banque.services';
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
  constructor(private sharedService: SharedService, private http: Http, private produitService: ProduitsService, private banqueService: BanqueService) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageBanque');
  }

  getListDeVenteNonComptabiliser(libelleProduit){
    this.banqueService.getListDeVenteNonComptabiliser(libelleProduit).subscribe(
      data => {
        this.venduInBanque = data;
        console.log('_______ data: ',data);
      },
      error => {
        console.log("____ error");
      }
    );
  }

  getProduitAll(){
    this.produitService.getAllProduit().subscribe(
      data => {
        this.produit = data;
        console.log('____ data: ',data);
      },
      error => {
        console.log('____ error ');
      }
    );
  }
}
