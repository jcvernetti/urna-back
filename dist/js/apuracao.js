"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apuracao = void 0;
var Apuracao = /** @class */ (function () {
    function Apuracao(nome, numero, qtde, percentual) {
        this._nome = nome;
        //this._numero = numero;
        this._qtde = qtde;
        this._percentual = percentual;
    }
    Object.defineProperty(Apuracao.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Apuracao.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        set: function (value) {
            this._numero = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Apuracao.prototype, "qtde", {
        get: function () {
            return this._qtde;
        },
        set: function (value) {
            this._qtde = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Apuracao.prototype, "percentual", {
        get: function () {
            return this._percentual;
        },
        set: function (value) {
            this._percentual = value;
        },
        enumerable: false,
        configurable: true
    });
    return Apuracao;
}());
exports.Apuracao = Apuracao;
