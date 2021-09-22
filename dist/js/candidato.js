"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidato = void 0;
var Candidato = /** @class */ (function () {
    function Candidato(id, nome, numero) {
        this._id = id;
        this._nome = nome;
        this._numero = numero;
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
    Object.defineProperty(Candidato.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    return Candidato;
}());
exports.Candidato = Candidato;
