export class Banque{
    id: Number;
	dateOperation: Date;
	agence: String;
	numeroTicket: String;
	somme: Number;
	total: Number;
	depot: boolean;
	retrait: boolean;
	virement: boolean;
	soldeAnterieur: Number;
	motif: String;
}