import { ProduitsService } from './../produit/async-services/produits.services';
import { MarchandisesService } from './async-services/marchandises.service';
declare var $: any;
import { Marchandise } from './models/marchandise';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import {} from 'ngx-bootstrap';
import { Produit } from '../produit/models/produit';

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css']
})
export class MarchandiseComponent implements OnInit {

  marchandise: Marchandise = new Marchandise();
  produit: Produit;

  isDisplayBloc = false;

  constructor(private sharedService: SharedService, private produitService: ProduitsService, private http: Http, private marchandiseService: MarchandisesService) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageMarchandise');
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
          this.marchandise = data;
          this.sharedService.afficheAlerte('alert-success', 'class');
          this.isDisplayBloc = false;
        }, err => {
          console.log("_____ error: ",err);
        }
      );
    }
  }

  onChange(values: String){
    if(values !== ''){
      this.produit = this.sharedService._prduitAll.find(produit => produit.type === values);
      console.log('____________ ciment: ',this.produit);
      console.log('____________ produit_All: ',this.sharedService._prduitAll);
      if(this.produit.libelleEnum === 'CIMENT'){
        this.getCalculeNombreSacVendu(this.produit.id, values);
      } else {
        alert("Le produit "+values+" n'est pas encore geré");
        this.isDisplayBloc = false;
      }
    } else {
      this.isDisplayBloc = false;
    }
  }

  getCalculeNombreSacVendu(id: Number, values: String){
    this.marchandiseService.calculNombreSacVendu(this.produit.id).subscribe(
      data => {
        this.marchandise = data;
        if(+data.nbSacVendu > 0){
          this.marchandise.totalSacMarchandise = this.produit.quantiteCommande;
          // this.marchandise.totalSacVendu = +this.marchandise.nbSacAnterieur + +this.marchandise.nbSacVendu;
          this.marchandise.totalSacVendu = +this.marchandise.nbSacVendu;
          this.marchandise.totalSacRestant = +this.marchandise.totalSacMarchandise - +this.marchandise.totalSacVendu;
          this.marchandise.produitDto = this.produit;
          this.isDisplayBloc = true;
        } else {
          this.isDisplayBloc = false;
          alert("Pas de vente réalisée pour ce produit "+values);
        }
      }
    );
  }
}
