import { ListVendu } from './models/list-vendus';
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

  listeVente: ListVendu[];

  isAffiche: boolean = false;
  isActif: boolean = true;

  constructor(private sharedService: SharedService, private http: Http) { }

  ngOnInit() {
    this.sharedService.displayHeader('pagebilanCompte');
  }

  ajoutLigne(){
    $('.tableBody').append(
      '<tr>'+
      '<td></td>'+
      '<td><input type="Date" name="dateVente" class="input-field" [(ngModel)]="'+this.listeVente['vendu'].dateDebut+'" (keyup)="calculTotal($event)"></td>'+
      '<td><input type="text" name="quantite" class="input-field" [(ngModel)]="'+this.listeVente['vendu'].quantite+'" (keyup)="calculTotal($event)"></td>'+
      '<td><input type="text" class="input-field" [(ngModel)]="'+this.listeVente['vendu'].prixUnitaire+'" (keyup)="calculTotal($event)"></td>'+
      '<td class="input-field"><input type="text" [disabled]="true" class="input-field" [(ngModel)]="'+this.listeVente['vendu'].total+'" value="'+this.listeVente['vendu'].total+'"></td>'+
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

  calculTotal(event){
    
  }

  validation(){

  }

  suppressionLigne(){

  }

}
