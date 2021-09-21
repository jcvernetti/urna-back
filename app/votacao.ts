import { Candidato } from './candidato';
export class Votacao{
    private _tipo: number;
    private _inicio: Date;
    private _termino: Date;
    private _iniciada: boolean;
    private _candidatos: Array<Candidato>;

	public get tipo(): number {
		return this._tipo;
	}

	public set tipo(value: number) {
		this._tipo = value;
	}

	public get inicio(): Date {
		return this._inicio;
	}

	public set inicio(value: Date) {
		this._inicio = value;
	}

	public get termino(): Date {
		return this._termino;
	}

	public set termino(value: Date) {
		this._termino = value;
	}

	public get candidatos(): Array<Candidato> {
		return this._candidatos;
	}

	public set candidatos(value: Array<Candidato>) {
		this._candidatos = value == undefined ? [] : value;
	}

	public get iniciada(): boolean {
		return this._iniciada;
	}

	public set iniciada(value: boolean) {
		this._iniciada = value;
	}

}