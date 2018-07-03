import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-bilan-compte',
  templateUrl: './bilan-compte.component.html',
  styleUrls: ['./bilan-compte.component.css']
})
export class BilanCompteComponent implements OnInit {

  isAffiche: boolean = false;
  isActif: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  ajoutLigne(){
    $('.tableBody').append(
      '<tr>'+
      '<td></td>'+
      '<td><input type="Date" name="dateVente" class="input-field"></td>'+
      '<td><input type="text" name="quantite" class="input-field"></td>'+
      '<td><input type="tex" class="input-field"></td>'+
      '<td class="input-field"><input type="tex" class="input-field"></td>'+
      '</tr>'
    );
    if(!this.isAffiche){
      this.isAffiche = true;
      this.isActif = false;
    }
  }

  getClass(){
    return (this.isActif ? 'btn btn-secondary' : 'btn btn-success');
  }

  validation(){

  }

  suppressionLigne(){

  }

}
