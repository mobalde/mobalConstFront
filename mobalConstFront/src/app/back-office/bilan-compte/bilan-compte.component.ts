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

  constructor(private bilancompteService: BilancompteService, private sharedService: SharedService, private produitService: ProduitsService, private http: Http) { 

  }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
    // this.getMarchandise('ciment');
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
    if($('.dateVente').val() === '' || $('.quantite').val() === '' || $('.prxUnitaire').val() === '' || $('#produitSelect').val() === ''){
      this.colorEmptyInput();
    } else {
      $('#popinAjout').modal('toggle'); 
      this.constructListVente();
      if(!this.isAffiche){
        this.isAffiche = true;
        this.isActif = false;
      }
    }
  }

  constructListVente(){
      this.vendu.total = $('.prxUnitaire').val()*$('.quantite').val();
      this.vendu.produit = this.sharedService._prduitAll.find(produit => produit.id === +$('#produitSelect').val());
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
    if($('#produitSelect').val() === ''){
      $('#produitSelect').css('border', '1px solid red');
    } else if(!this.vendu.dateVente){
      $('.dateVente').css('border', '1px solid red');
      $('#produitSelect').css('border', '1px solid #808080ad');
    } else if (!this.vendu.quantite){
      $('.dateVente').css('border', '1px solid #808080ad');
      $('.quantite').css('border', '1px solid red');
    } else if (!this.vendu.prixUnitaire){
      $('.quantite').css('border', '1px solid #808080ad');
      $('.dateVente').css('border', '1px solid #808080ad');
      $('.prxUnitaire').css('border', '1px solid red');
    } else {
      $('#produitSelect').css('border', '1px solid #808080ad');
      $('.quantite').css('border', '1px solid #808080ad');
      $('.dateVente').css('border', '1px solid #808080ad');
      $('.prxUnitaire').css('border', '1px solid #808080ad');
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

  // getMarchandise(libelle: String){
  //   this.produitService.getProduit(libelle).subscribe(
  //     data => {
  //       this.produit = data;
  //     }, err => {
  //       console.log("_____ error: ",err);
  //     }
  //   );
  // }
 
  activeBouton(){
    if(this.listeVente.length === 0) {
      this.isActif = true; // On desactive le bouton
      this.isAffiche = false;
    }
    else {
      this.isActif = false; // On active le bouton
    }
  }

}
