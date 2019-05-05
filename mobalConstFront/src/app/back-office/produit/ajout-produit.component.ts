import { LibellesEnum } from './models/libelles-enum';
import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Produit } from './models/produit';
import { ProduitsService } from './async-services/produits.services';
import { TypeEnum } from './models/type.enum';

declare var $: any;

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  produit: Produit = new Produit();
  marques: String[];
  libelles: String[];
  marqueField: String[];

  constructor(private route: ActivatedRoute, private router: Router, 
              private http: Http, private produitService: ProduitsService, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.displayHeader('pageAjoutProduit');
    this.getLibelles();
    this.getMarques();
  }

  getMarques(){
    this.produitService.getMarqueAll().subscribe(
      data => {
        this.marques = data;
      },
      err => {
      }
    );
  }

  getLibelles(){
    this.produitService.getLibelleAll().subscribe(
      data => {
        this.libelles = data;
      },
      err => {
      }
    );
  }

  onChange(value){
    if(value !== ''){
      this.marqueField = this.marques.filter(lib => lib.includes(value)); 
    } else {
      this.marqueField = null;
    }
  }

  openPopin(){
    if($('#quantite').val() !== undefined && this.produit.type !== '' && this.produit.type !== undefined && $('#quantite').val() !== ''){
      this.produit.quantiteCommande = +$('#quantite').val();
      $("#popin").modal("show");
    }else{
      // Verification champs
      if (this.produit.type === '' || this.produit.type === undefined){
        $('#types').css('border', '1px solid red');
      }
      if (this.produit.type !== '' && this.produit.type !== undefined){
        $('#types').css('border', '1px solid #808080ad');
      }
      if ($('#quantite').val() === undefined || $('#quantite').val() === ''){
        $('#quantite').css('border', '1px solid red');
      } 
      if ($('#quantite').val() !== undefined && $('#quantite').val() !== ''){
        $('#quantite').css('border', '1px solid #808080ad');
      }
    }
  }

  valider(){
    // save to produit
    this.setTypeProduit(this.produit.type);
    
    this.produitService.saveProduit(this.produit).subscribe(
      data => {
        $('#popin').modal('toggle');
        if(data){
          alert("produit ajouté!");
          this.sharedService.getProduitAll();
          this.router.navigate(['produit']);
        } else{
          alert("erreur d'ajout produit!");
        }
      }
    );
  }

  setTypeProduit(type: String){
    switch(type){
      case 'ciment GI 32.5':
        this.produit.type = TypeEnum.gi_32.toString();
        this.produit.libelleEnum = LibellesEnum.ciment.toString();
      break;
      case 'ciment DIAMOND 32.5':
        this.produit.type = TypeEnum.diam_32.toString();
        this.produit.libelleEnum = LibellesEnum.ciment.toString();
      break;
      case 'ciment GI 42.5':
        this.produit.type = TypeEnum.gi_42.toString();
        this.produit.libelleEnum = LibellesEnum.ciment.toString();
      break;
      case 'ciment DIAMOND 42.5':
        this.produit.type = TypeEnum.diam_42.toString();
        this.produit.libelleEnum = LibellesEnum.ciment.toString();
      break;
      case 'basket ball Puma':
        this.produit.type = TypeEnum.pum.toString();
        this.produit.libelleEnum = LibellesEnum.basket.toString();
      break;
      case 'autre':
        this.produit.type = TypeEnum.autre.toString();
        this.produit.libelleEnum = LibellesEnum.autre.toString();
      break;
    }
  }

}
