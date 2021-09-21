export class Voto{
    private _nomeCandidato: string;
    private _numeroCandidato: number;
    private _dataVoto: Date; 
    
    constructor(nome: string, numero: number, data: Date){
        this.nomeCandidato = nome;
        this.numeroCandidato = numero;
        this.dataVoto = data;
    }

    public get nomeCandidato(): string {
        return this._nomeCandidato;
    }
    
    public set nomeCandidato(value: string) {
        this._nomeCandidato = value;
    }
    
    public get numeroCandidato(): number {
        return this._numeroCandidato;
    }
    
    public get dataVoto(): Date {
        return this._dataVoto;
    }
    
    public set dataVoto(value: Date) {
        this._dataVoto = value;
    }
    
    public set numeroCandidato(value: number) {
        this._numeroCandidato = value;
    }
}