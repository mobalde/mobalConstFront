import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Produit } from './models/produit';
import { ProduitsService } from './async-services/produits.services';

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
              private http: Http, private produitService: ProduitsService) { }

  ngOnInit() {
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
    this.produitService.saveProduit(this.produit).subscribe(
      data => {
        if(data){
          alert("produit ajouté!");
          this.router.navigate(['produit']);
        } else{
          alert("erreur d'ajout produit!");
        }
      }
    );
  }

}
