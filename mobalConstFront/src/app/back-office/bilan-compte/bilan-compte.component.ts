import { Produit } from './../produit/models/produit';
import { ProduitsService } from './../produit/async-services/produits.services';
import { Vendu } from './models/vendu';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-bilan-compte',
  templateUrl: './bilan-compte.component.html',
  styleUrls: ['./bilan-compte.component.css']
})
export class BilanCompteComponent implements OnInit {

  produit: Produit;
  listeVente: Array<Vendu> = [];

  isAffiche: boolean = false;
  isActif: boolean = true;

  constructor(private sharedService: SharedService, private produitService: ProduitsService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
    this.getMarchandise('ciment');
  }

  calculTotal(event, element: String){
    console.log('event: ',event);
  }

  openPopin(){
    $("#popinAjout").modal("show");
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
      $('.tableBody').append(
        '<tr>'+
        '<td></td>'+
        '<td style="text-align: center;"><label>'+vendu.dateVente+'</label></td>'+
        '<td style="text-align: center;"><label>'+vendu.quantite+'</label></td>'+
        '<td style="text-align: center;"><label>'+vendu.prixUnitaire+'</label></td>'+
        '<td style="text-align: center;"><label>'+vendu.total+'</label></td></td>'+
        '</tr>'
      );
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

  validation(){
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
