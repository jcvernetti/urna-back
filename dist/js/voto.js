"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voto = void 0;
var Voto = /** @class */ (function () {
    function Voto(nome, numero, data) {
        this.nomeCandidato = nome;
        this.numeroCandidato = numero;
        this.dataVoto = data;
    }
    Object.defineProperty(Voto.prototype, "nomeCandidato", {
        get: function () {
            return this._nomeCandidato;
        },
        set: function (value) {
            this._nomeCandidato = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Voto.prototype, "numeroCandidato", {
        get: function () {
            return this._numeroCandidato;
        },
        set: function (value) {
            this._numeroCandidato = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Voto.prototype, "dataVoto", {
        get: function () {
            return this._dataVoto;
        },
        set: function (value) {
            this._dataVoto = value;
        },
        enumerable: false,
        configurable: true
    });
    return Voto;
}());
exports.Voto = Voto;
