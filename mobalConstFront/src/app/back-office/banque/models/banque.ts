export class Banque{
    id: Number;
	dateOperation: Date;
	agence: String;
	numeroTicket: String;
	somme: Number;
	total: Number;
	isDepot: boolean;
	isRetrait: boolean;
	isVirement: boolean;
	soldeAnterieur: Number;
	motif: String;
	isTypeOperation: String;
}