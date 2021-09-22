export class Apuracao{
    private _nome: string;
    private _numero?: number;
    private _qtde: number;
    private _percentual: number;
    
    
	constructor(nome?: string, numero?: number, qtde?: number, percentual?: number) {
        this._nome = nome;
		//this._numero = numero;
        this._qtde = qtde;
        this._percentual = percentual;
	}
    
    public get nome(): string {
        return this._nome;
    }
    
    public set nome(value: string) {
        this._nome = value;
    }
    
    public get numero(): number {
        return this._numero;
    }
    
    public set numero(value: number) {
        this._numero = value;
    }
    
    public get qtde(): number {
        return this._qtde;
    }

    public set qtde(value: number) {
        this._qtde = value;
    }

    public get percentual(): number {
        return this._percentual;
    }

    public set percentual(value: number) {
        this._percentual = value;
    }


}
