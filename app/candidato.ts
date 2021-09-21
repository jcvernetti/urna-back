export class Candidato{
    private _nome: string;
    private _numero: number;

	constructor(nome: string, numero: number) {
		this.nome = nome;
		this.numero = numero;
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
}