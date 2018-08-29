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

  @ViewChild('tableBody') el:ElementRef;

  produit: Produit;
  listeVente: Array<Vendu> = [];

  isAffiche: boolean = false;
  isActif: boolean = true;

  message: String = null;
  elementPop: Number;

  venteASupp: Vendu = null;

  constructor(private bilancompteService: BilancompteService, private sharedService: SharedService, private produitService: ProduitsService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
    this.getMarchandise('ciment');
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
    if($('.dateVente').val() === '' || $('.quantite').val() === '' || $('.prxUnitaire').val() === ''){
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
      let vendu = new Vendu();
      vendu.dateVente = $('.dateVente').val();
      vendu.prixUnitaire = $('.prxUnitaire').val();
      vendu.quantite = $('.quantite').val();
      vendu.total = $('.prxUnitaire').val()*$('.quantite').val();
      vendu.idProduit = this.produit.id;
      this.listeVente.push(vendu);
  }

  supprimer(elements: Number, vendu: Vendu){
    this.elementPop = elements;
    this.venteASupp = vendu;
    var date = new Date(vendu.dateVente);
    this.message = "Voulez-vous supprimer le bilan du "+new Intl.DateTimeFormat("en-GB").format(date)+" ?";
    $("#popin").modal("show");
  }

  colorEmptyInput(){
    if($('.dateVente').val() === ''){
      $('.dateVente').css('border', '1px solid red');
    } else if ($('.quantite').val() === ''){
      $('.dateVente').css('border', '1px solid #808080ad');
      $('.quantite').css('border', '1px solid red');
    } else if ($('.prxUnitaire').val() === ''){
      $('.quantite').css('border', '1px solid #808080ad');
      $('.dateVente').css('border', '1px solid #808080ad');
      $('.prxUnitaire').css('border', '1px solid red');
    } else {
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
    } else {
      // Ajout listeVente
      this.bilancompteService.postListeVente(this.listeVente).subscribe(
        data => {
          this.listeVente = [];
          this.sharedService.afficheAlerte('alert-success', 'class');
        }
      );
    }
    $('#popin').modal('toggle');
    this.venteASupp = null;
    console.log("_______ list: ",this.listeVente);
  }

  removeLine(){
  }

  getMarchandise(libelle: String){
    this.produitService.getProduit(libelle).subscribe(
      data => {
        this.produit = data;
      }, err => {
        console.log("_____ error: ",err);
      }
    );
  }


}
