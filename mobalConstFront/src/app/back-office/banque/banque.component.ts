import { Router } from '@angular/router';
import { Banque } from './models/banque';
import { BanqueService } from './async-services/banque.services';
import { VenduInBanque } from './models/vendu-in-banque';
import { ProduitsService } from './../produit/async-services/produits.services';
import { Produit } from './../produit/models/produit';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {

  venduInBanque: Array<VenduInBanque> = [];
  banque: Banque = new Banque();
  produit: Produit[];
  soldeAnt: Number;
  venteSemaine: VenduInBanque = new VenduInBanque();
  constructor(private sharedService: SharedService, private http: Http, private produitService: ProduitsService, 
              private banqueService: BanqueService, private router: Router) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageBanque');
    this.getProduitAll();
    this.getSoldeAnterieur();
  }

  getSoldeAnterieur(){
    this.banqueService.getSoldeAnterieur().subscribe(
      data => {
        this.soldeAnt = data;
      }
    );
  }

  getListDeVenteNonComptabiliser(libelleProduit){
    this.banqueService.getListDeVenteNonComptabiliser(libelleProduit).subscribe(
      data => {
        this.venduInBanque = data;
      },
      error => {
        console.log("____ error");
      }
    );
  }

  onChange(values: String){
    if(values !== ''){
      this.getListDeVenteNonComptabiliser(values);
    } else {
      this.venduInBanque = [];
    }
  }

  getProduitAll(){
    this.produitService.getAllProduit().subscribe(
      data => {
        this.produit = data;
      },
      error => {
        console.log('____ error ');
      }
    );
  }

  addBanque(id: Number){
    this.venteSemaine = this.venduInBanque.find(x => x.id === +id);
  }

  openPopin(){
    // Verification champs
    if(!this.venteSemaine.totalVente){
      $('#semainevente').css('border', '1px solid red');
    }
    else if(!this.banque.dateDepot){
      $('#semainevente').css('border', '1px solid #808080ad');
      $('#datedepot').css('border', '1px solid red');
    }
    else if(!this.banque.argentDepose){
      $('#argentdepose').css('border', '1px solid #808080ad');
      $('#argentdepose').css('border', '1px solid red');
    } 
    else if(!this.banque.numeroTicket){
      $('#numeroTicketDepot').css('border', '1px solid #808080ad');
      $('#numeroTicketDepot').css('border', '1px solid red');
    }
    else {
      $("#popin").modal("show");
    }
  }

  valider(){
    this.banque.isDepot = true; // A rajouter dans le formulaire
    this.banque.soldeAnterieur = this.soldeAnt;
    this.venteSemaine.banqueDto = this.banque;
    this.venteSemaine.isDepotBanque = true;
    this.banqueService.postVenteSemaine(this.venteSemaine).subscribe(
      data => {
        $('#popin').modal('toggle');
        this.sharedService.afficheAlerte('alert-success', 'class');
        this.router.navigate([this.router.url]);
      },
      error => {
        $('#popin').modal('toggle');
      }
    );
  }
}
