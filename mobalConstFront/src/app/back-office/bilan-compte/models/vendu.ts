import { Produit } from "../../produit/models/produit";

export class Vendu{
    dateVente: Date;
	quantite: Number;
	prixUnitaire: Number;
	total: Number;
	produit: Produit;
	disabledInput: boolean;
	modif: boolean;
}