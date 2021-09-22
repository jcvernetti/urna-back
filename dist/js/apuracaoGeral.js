"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApuracaoGeral = void 0;
var ApuracaoGeral = /** @class */ (function () {
    function ApuracaoGeral() {
        this.validos = [];
    }
    Object.defineProperty(ApuracaoGeral.prototype, "nulos", {
        get: function () {
            return this._nulos;
        },
        set: function (value) {
            this._nulos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApuracaoGeral.prototype, "brancos", {
        get: function () {
            return this._brancos;
        },
        set: function (value) {
            this._brancos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApuracaoGeral.prototype, "validos", {
        get: function () {
            return this._validos;
        },
        set: function (value) {
            this._validos = value;
        },
        enumerable: false,
        configurable: true
    });
    ApuracaoGeral.prototype.addValidos = function (value) {
        this.validos.push(value);
    };
    Object.defineProperty(ApuracaoGeral.prototype, "totalValidos", {
        get: function () {
            return this._totalValidos;
        },
        set: function (value) {
            this._totalValidos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApuracaoGeral.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (value) {
            this._total = value;
        },
        enumerable: false,
        configurable: true
    });
    return ApuracaoGeral;
}());
exports.ApuracaoGeral = ApuracaoGeral;
