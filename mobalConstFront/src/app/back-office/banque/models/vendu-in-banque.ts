import { Vendu } from './../../bilan-compte/models/vendu';
import { Banque } from './banque';
export class VenduInBanque{
    id: Number;
	isDepotBanque: boolean;
	debutSemaine: Date;
	finSemaine: Date;
	banqueDto: Banque;
	venduDto: Vendu[];
	totalVente: Number;
}