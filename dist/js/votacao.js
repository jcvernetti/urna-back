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
    Object.defineProperty(Votacao.prototype, "dtInicio", {
        get: function () {
            return this._dtInicio;
        },
        set: function (value) {
            this._dtInicio = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "dtFim", {
        get: function () {
            return this._dtFim;
        },
        set: function (value) {
            this._dtFim = value;
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
    Object.defineProperty(Votacao.prototype, "timeInicio", {
        get: function () {
            return this._timeInicio;
        },
        set: function (value) {
            this._timeInicio = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Votacao.prototype, "timeFim", {
        get: function () {
            return this._timeFim;
        },
        set: function (value) {
            this._timeFim = value;
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
