import { ProduitsService } from './../produit/async-services/produits.services';
import { MarchandisesService } from './async-services/marchandises.service';
declare var $: any;
import { Marchandise } from './models/marchandise';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import {} from 'ngx-bootstrap';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css']
})
export class MarchandiseComponent implements OnInit {

  marchandise: Marchandise = new Marchandise();


  constructor(private sharedService: SharedService, private produitService: ProduitsService, private http: Http, private marchandiseService: MarchandisesService) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageMarchandise');
    this.totalMarchandises('ciment'); // A adapter lorsqu'il y aura d'autre marchandise
    this.getNombreDeSacAnterieur();
  }

  calculTSacVendu_1(event: any){
    if(this.marchandise.nbSacAnterieur >= 0 ) {
      this.marchandise.totalSacVendu = +this.marchandise.nbSacAnterieur + +event.target.value;
    }
    this.calculTotalSacRestant();
  }

  calculTotalSacRestant(){
    this.marchandise.totalSacRestant = +this.marchandise.totalSacMarchandise - +this.marchandise.totalSacVendu;
  }

  valider(){
    $('.modal').modal('toggle');
    if(this.marchandise.dateDebut === undefined) {
      $('.dateDebut').css('border', '1px solid red');
    } else if(this.marchandise.dateFin === undefined) {
      $('.dateDebut').css('border', '1px solid #808080ad');
      $('.dateFin').css('border', '1px solid red');
    } else if(this.marchandise.nbSacVendu === 0 || this.marchandise.nbSacVendu === undefined ){
      $('.dateDebut').css('border', '1px solid #808080ad');
      $('.dateFin').css('border', '1px solid #808080ad');
      $(".nbsacvendu").css('border', '1px solid red');
    } else {
      $(".nbsacvendu").css('border', '1px solid #808080ad');
      this.marchandiseService.postMarchandise(this.marchandise).subscribe(
        data => {
          this.marchandise = new Marchandise();
        }, err => {
          console.log("_____ error: ",err);
        }
      );
    }
  }

  totalMarchandises(libelle: String){
    this.produitService.getProduit(libelle).subscribe(
      data => {
        this.marchandise.totalSacMarchandise = data.quantiteCommande;
        this.marchandise.idProduit = data.id;
      }, err => {
        console.log("_____ error: ",err);
      }
    );
  }

  getNombreDeSacAnterieur(){
    this.marchandiseService.getNombreDeSacAnterieur().subscribe(
      data => {
        this.marchandise.nbSacAnterieur = data;
      }, err => {
        console.log("_____ error: ",err);
      }
    );
  }
}
