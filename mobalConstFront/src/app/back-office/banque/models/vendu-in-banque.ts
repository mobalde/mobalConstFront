import { Vendu } from './../../bilan-compte/models/vendu';
import { Banque } from './banque';
export class VenduInBanque{
    id: Number;
	depotBanque: boolean;
	debutSemaine: Date;
	finSemaine: Date;
	banqueDto: Banque;
	venduDto: Vendu[];
	totalVente: Number;
}