import { BilancompteService } from './async-services/bilancomptes.service';
import { Produit } from './../produit/models/produit';
import { ProduitsService } from './../produit/async-services/produits.services';
import { Vendu } from './models/vendu';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-bilan-compte',
  templateUrl: './bilan-compte.component.html',
  styleUrls: ['./bilan-compte.component.css']
})
export class BilanCompteComponent implements OnInit {

  vendu: Vendu = new Vendu();
  listeVente: Array<Vendu> = [];
  isAffiche: boolean = false;
  isActif: boolean = true;
  message: String = null;
  venteASupp: Vendu = null;
  venduLast: any[] = new Array();

  constructor(private bilancompteService: BilancompteService, private sharedService: SharedService, private produitService: ProduitsService, private http: Http) { 
  }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
  }

  openPopin(elements: String){
    if(elements === 'A'){
      $("#popinAjout").modal("show");
    }
    if(elements === 'V'){
      this.message = "Voulez-vous sauvegarder vos données ?"
      $("#popin").modal("show");
    }
  }

  add(){
    // Add bilan dans la liste.
    if(
          this.vendu.dateVente === undefined || this.vendu.quantite === undefined
          || this.vendu.prixUnitaire === undefined
          || this.vendu.produit === undefined ){
      this.colorEmptyInput();
    } else {
      $('#popinAjout').modal('toggle'); 
      this.constructListVente();
      this.colorInitInput();
      if(!this.isAffiche){
        this.isAffiche = true;
        this.isActif = false;
      }
    }
  }

  colorInitInput(){
    $('#produitSelects').css('border', '1px solid #808080ad');
    $('.quantites').css('border', '1px solid #808080ad');
    $('.dateVentes').css('border', '1px solid #808080ad');
    $('.prixUnitaires').css('border', '1px solid #808080ad');
  }

  constructListVente(){
      this.vendu.total = +this.vendu.prixUnitaire*+this.vendu.quantite;
      // this.vendu.produit = this.sharedService._prduitAll.find(produit => produit.id === +$('#produitSelects').val());
      this.vendu.modif = true;
      this.vendu.disabledInput = true;
      this.listeVente.push(this.vendu);
      this.vendu = new Vendu();
  }

  supprimer(elements: Number, vendu: Vendu){
    this.venteASupp = vendu;
    var date = new Date(vendu.dateVente);
    this.message = "Voulez-vous supprimer le bilan du "+new Intl.DateTimeFormat("en-GB").format(date)+" ?";
    $("#popin").modal("show");
  }

  colorEmptyInput(){

    if(this.vendu.produit === undefined){
      $('#produitSelects').css('border', '1px solid red');
    } else{
      $('#produitSelects').css('border', '1px solid #808080ad');
    }
    if(this.vendu.dateVente === undefined){
      $('.dateVentes').css('border', '1px solid red');
    } else{
      $('.dateVentes').css('border', '1px solid #808080ad');
    }
    if (this.vendu.quantite === undefined ){
      $('.quantites').css('border', '1px solid red');
    } else{
      $('.quantites').css('border', '1px solid #808080ad');
    }
    if (this.vendu.prixUnitaire === undefined){
      $('.prixUnitaires').css('border', '1px solid red');
    } else{
      $('.prixUnitaires').css('border', '1px solid #808080ad');
    } 
  }

  getClass(){
    return (this.isActif ? 'btn btn-secondary' : 'btn btn-successe');
  }

  valider(){
    if(this.venteASupp !== null){
      this.listeVente = this.listeVente.filter(obj => obj !== this.venteASupp);
      this.activeBouton();
    } else {
      // Ajout listeVente
      this.bilancompteService.postListeVente(this.listeVente).subscribe(
        data => {
          if(data){
            this.listeVente = [];
            this.sharedService.afficheAlerte('alert-success', 'class');
          } else{
            this.sharedService.afficheAlerte('alert-warning', 'class');
          }
          this.activeBouton();
        }
      );
    }
    $('#popin').modal('toggle');
    this.venteASupp = null;
  }
 
  activeBouton(){
    if(this.listeVente.length === 0) {
      this.isActif = true; // On desactive le bouton
      this.isAffiche = false;
    }
    else {
      this.isActif = false; // On active le bouton
    }
  }

  modifier(elements: Number, vendu: Vendu){
    this.venduLast[+elements] = {
      "prixUnitaire": +vendu.prixUnitaire,
      "dateVente": vendu.dateVente,
      "quantite" : vendu.quantite,
      "total" : vendu.total,
      "disabledInput" : vendu.disabledInput,
      "modif" : vendu.modif
    };
    vendu.modif = false;
    vendu.disabledInput = false;
  }

  validerLesModif(elements: Number, vendu: Vendu){
    vendu.total = +vendu.prixUnitaire*+vendu.quantite;
    vendu.modif = true;
    vendu.disabledInput = true;
    vendu.total = +vendu.prixUnitaire*+vendu.quantite;
    this.listeVente[+elements] = vendu;
  }

  annuler(vendu: Vendu, elements: Number){
    vendu.dateVente = this.venduLast[+elements].dateVente;
    vendu.prixUnitaire = this.venduLast[+elements].prixUnitaire
    vendu.quantite = this.venduLast[+elements].quantite;
    vendu.total = this.venduLast[+elements].total;
    vendu.modif = this.venduLast[+elements].modif;
    vendu.disabledInput = this.venduLast[+elements].disabledInput;
    this.listeVente[+elements] = vendu;
  }
}
