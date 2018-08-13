import { Vendu } from './models/vendu';
import { Http } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-bilan-compte',
  templateUrl: './bilan-compte.component.html',
  styleUrls: ['./bilan-compte.component.css']
})
export class BilanCompteComponent implements OnInit {

  listeVente: Array<Vendu> = [];

  isAffiche: boolean = false;
  isActif: boolean = true;

  constructor(private sharedService: SharedService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
  }

  calculTotal(event, element: String){
    console.log('event: ',event);
  }

  ajoutLigne(){
    $('.tableBody').append(
      '<tr>'+
      '<td></td>'+
      '<td><input type="Date" name="dateVente" class="input-field dateVente"></td>'+
      '<td><input type="text" name="quantite" class="input-field quantite"></td>'+
      '<td><input type="text" name="prixUnitaire" class="input-field prxUnitaire"></td>'+
      '<td class="input-field"><input type="text" name="total" disabled=disabled class="input-field total"></td>'+
      '</tr>'
    );
    if(!this.isAffiche){
      this.isAffiche = true;
      this.isActif = false;
    }
  }

  getClass(){
    return (this.isActif ? 'btn btn-secondary' : 'btn btn-successe');
  }

  validation(){
    console.log("_______ list: ",this.listeVente);
  }

  suppressionLigne(){

  }

}
