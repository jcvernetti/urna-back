"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Votacao = void 0;
var Votacao = /** @class */ (function () {
    function Votacao() {
        this.candidatos = [];
        this.votos = [];
    }
    Object.defineProperty(Votacao.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        set: function (value) {
            this._tipo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "inicio", {
        get: function () {
            return this._inicio;
        },
        set: function (value) {
            this._inicio = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "termino", {
        get: function () {
            return this._termino;
        },
        set: function (value) {
            this._termino = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "candidatos", {
        get: function () {
            return this._candidatos;
        },
        set: function (value) {
            this._candidatos = value == undefined ? [] : value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "iniciada", {
        get: function () {
            return this._iniciada;
        },
        set: function (value) {
            this._iniciada = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "votos", {
        get: function () {
            return this._votos;
        },
        set: function (value) {
            this._votos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "terminada", {
        get: function () {
            return this._terminada;
        },
        set: function (value) {
            this._terminada = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "isVotacaoCurso", {
        get: function () {
            return this._isVotacaoCurso;
        },
        set: function (value) {
            this._isVotacaoCurso = value;
        },
        enumerable: false,
        configurable: true
    });
    Votacao.prototype.addVoto = function (voto) {
        this.votos.push(voto);
    };
    Votacao.prototype.addCandidato = function (candidato) {
        this.candidatos.push(candidato);
    };
    return Votacao;
}());
exports.Votacao = Votacao;
