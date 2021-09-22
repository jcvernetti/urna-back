import { Apuracao } from './apuracao';
export class ApuracaoGeral{

    private _nulos: number;
    private _brancos: number;
    private _validos: Array<Apuracao>;
    private _totalValidos: number;
    private _total: number;

    constructor(){
        this.validos = [];
    }

    public get nulos(): number {
        return this._nulos;
    }

    public set nulos(value: number) {
        this._nulos = value;
    }

    public get brancos(): number {
        return this._brancos;
    }

    public set brancos(value: number) {
        this._brancos = value;
    }

    public get validos(): Array<Apuracao> {
        return this._validos;
    }

    public set validos(value: Array<Apuracao>) {
        this._validos = value;
    }

    public addValidos(value: Apuracao){
        this.validos.push(value);
    }

    public get totalValidos(): number {
        return this._totalValidos;
    }

    public set totalValidos(value: number) {
        this._totalValidos = value;
    }

    public get total(): number {
        return this._total;
    }

    public set total(value: number) {
        this._total = value;
    }
}