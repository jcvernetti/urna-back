import { Candidato } from './candidato';
import { Voto } from './voto';
export class Votacao{
    private _tipo: number;
    private _dtInicio: Date;
    private _timeInicio: Date;
	private _dtFim: Date;
    private _timeFim: Date;
    private _iniciada: boolean;
	private _terminada: boolean;
	private _isVotacaoCurso: Boolean;
	private _votos: Array<Voto>;
    private _candidatos: Array<Candidato>;

	constructor(){
		this.candidatos = [];
		this.votos = [];
	}

	public get tipo(): number {
		return this._tipo;
	}

	public set tipo(value: number) {
		this._tipo = value;
	}

	public get dtInicio(): Date {
		return this._dtInicio;
	}

	public set dtInicio(value: Date) {
		this._dtInicio = value;
	}

	public get dtFim(): Date {
		return this._dtFim;
	}

	public set dtFim(value: Date) {
		this._dtFim = value;
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

	public get votos(): Array<Voto> {
		return this._votos;
	}
	
	public set votos(value: Array<Voto>) {
		this._votos = value;
	}

	public get terminada(): boolean {
		return this._terminada;
	}

	public set terminada(value: boolean) {
		this._terminada = value;
	}

	public get isVotacaoCurso(): Boolean {
		return this._isVotacaoCurso;
	}

	public set isVotacaoCurso(value: Boolean) {
		this._isVotacaoCurso = value;
	}
	
	public get timeInicio(): Date {
		return this._timeInicio;
	}
	public set timeInicio(value: Date) {
		this._timeInicio = value;
	}

	public get timeFim(): Date {
		return this._timeFim;
	}
	public set timeFim(value: Date) {
		this._timeFim = value;
	}

	public addVoto(voto: Voto){
		this.votos.push(voto);
	}

	public addCandidato(candidato: Candidato){
		this.candidatos.push(candidato);
	}
}