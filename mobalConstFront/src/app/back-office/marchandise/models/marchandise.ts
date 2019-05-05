import { Produit } from "../../produit/models/produit";

export class Marchandise {
	dateDebut: Date;
	dateFin: Date;
	nbSacVendu: Number;
	nbSacAnterieur: Number;
	totalSacVendu: Number;
	totalSacMarchandise: Number;
	totalSacRestant: Number;
	produitDto: Produit;
}