export class Candidato{
	private _id: number;
    private _nome: string;
    private _numero: number;

	constructor(id:number, nome: string, numero: number) {
		this._id = id;
		this._nome = nome;
		this._numero = numero;
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

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}
}