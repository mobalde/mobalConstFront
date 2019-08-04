import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Banque } from './models/banque';
import { BanqueService } from './async-services/banque.services';
import { VenduInBanque } from './models/vendu-in-banque';
import { ProduitsService } from './../produit/async-services/produits.services';
import { Produit } from './../produit/models/produit';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { MotifEnum } from './models/motif-enum';

declare var $: any;

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.css']
})
export class BanqueComponent implements OnInit {

  venduInBanque: Array<VenduInBanque> = [];
  banque: Banque = new Banque();
  soldeAnt: Number;
  venteSemaine: VenduInBanque = new VenduInBanque();
  motifEnum: any;
  isMotif: boolean = false;
  isMotifSelected: boolean = false;

  motifArray: Array<String> = ['Payement loyer', 'Frais travaux', 'Payement impot', 'Autre'];

  constructor(private sharedService: SharedService, private http: Http, private produitService: ProduitsService, 
              private banqueService: BanqueService, private router: Router) {
                this.motifEnum = Object.values(MotifEnum);
              }

  ngOnInit() {
    this.sharedService.displayHeader('pageBanque');
  }

  getSoldeAnterieur(id: Number){
    this.banqueService.getSoldeAnterieur(id).subscribe(
      data => {
        this.soldeAnt = data;
      }
    );
  }

  getListDeVenteNonComptabiliser(libelleProduit: String){
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

  addBanque(id: Number){
    this.venteSemaine = this.venduInBanque.find(x => x.id === +id);
    this.getSoldeAnterieur(id);
  }

  openPopin(){
    console.log("_______________ banque: ",this.banque);
    // Verification champs communs
    if(!this.banque.isTypeOperation){
      $('.bloc-operation').css({'border': '1px solid red', 'padding': '4px'});
    } else if(!this.banque.dateOperation){
      $('.bloc-operation').css('border', '1px solid #fff');
      $('#dateoperation').css({'border': '1px solid red','padding': '4px'});
    } else if(!this.banque.somme){
      $('#dateoperation').css('border', '1px solid #808080ad');
      $('#somme').css({'border': '1px solid red', 'padding': '4px'});
    } else {
      if(this.isMotif && $('#produit').val() === ''){
          $('#somme').css('border', '1px solid #808080ad');
          $('#produit').css({'border': '1px solid red', 'padding': '4px'});
      } else {
        console.log('____________');
        $("#popin").modal("show");
      }
    }
  }

  valider(){
    this.banque.soldeAnterieur = this.soldeAnt;
    this.banque.motif = this.banque.motif.replace(" ", "_").toUpperCase();
    this.venteSemaine.banqueDto = this.banque;
    this.venteSemaine.depotBanque = true;
    // this.banqueService.postVenteSemaine(this.venteSemaine).subscribe(
    //   data => {
    //     // setTimeout( () => { 
    //     //   location.reload();
    //     //  }, 1000 );
    //      $('#popin').modal('toggle');
    //      this.sharedService.afficheAlerte('alert-success', 'class');
    //   },
    //   error => {
    //     $('#popin').modal('toggle');
    //   }
    // );
  }

  affichageBloc(event){
    this.isMotif = !this.motifArray.includes(event);
    this.isMotifSelected = (event !== '' && event !== 'Choisissez un motif') ? true : false;
  }
  
}
