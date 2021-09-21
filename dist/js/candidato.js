"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidato = void 0;
var Candidato = /** @class */ (function () {
    function Candidato(nome, numero) {
        this.nome = nome;
        this.numero = numero;
    }
    Object.defineProperty(Candidato.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Candidato.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        set: function (value) {
            this._numero = value;
        },
        enumerable: false,
        configurable: true
    });
    return Candidato;
}());
exports.Candidato = Candidato;
