"use strict";
var symbols = require('./Symbols');
var RNA = symbols.RNA;
var Codon = (function () {
    function Codon(fp, sp, tp) {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }
    Object.defineProperty(Codon.prototype, "fp", {
        get: function () {
            return this._fp;
        },
        set: function (base) {
            this._fp = base;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codon.prototype, "sp", {
        get: function () {
            return this._sp;
        },
        set: function (base) {
            this._sp = base;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codon.prototype, "tp", {
        get: function () {
            return this._tp;
        },
        set: function (base) {
            this._tp = base;
        },
        enumerable: true,
        configurable: true
    });
    Codon.prototype.setCodon = function (fp, sp, tp) {
        this.fp = fp;
        this.sp = sp;
        this.tp = tp;
    };
    Codon.getCodonChain = function (codons) {
        var _this = this;
        var seq = "";
        codons.forEach(function (codon) {
            if (codons.indexOf(codon) === codons.length - 1) {
                seq += "" + _this.matchCodon(codon);
            }
            else {
                seq += _this.matchCodon(codon) + "-";
            }
        });
        return seq;
    };
    Codon.matchCodon = function (codon) {
        var aa = "";
        switch (codon.fp) {
            case RNA.A:
                switch (codon.sp) {
                    case RNA.A:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Lys";
                                break;
                            case RNA.U:
                                aa = "Asn";
                                break;
                            case RNA.G:
                                aa = "Lys";
                                break;
                            case RNA.C:
                                aa = "Asn";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.U:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Ile";
                                break;
                            case RNA.U:
                                aa = "Ile";
                                break;
                            case RNA.G:
                                aa = "Met";
                                break;
                            case RNA.C:
                                aa = "Ile";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.G:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Arg";
                                break;
                            case RNA.U:
                                aa = "Ser";
                                break;
                            case RNA.G:
                                aa = "Arg";
                                break;
                            case RNA.C:
                                aa = "Ser";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.C:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Thr";
                                break;
                            case RNA.U:
                                aa = "Thr";
                                break;
                            case RNA.G:
                                aa = "Thr";
                                break;
                            case RNA.C:
                                aa = "Thr";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                } //second level
                break;
            case RNA.U:
                switch (codon.sp) {
                    case RNA.A:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "STOP";
                                break;
                            case RNA.U:
                                aa = "Tyr";
                                break;
                            case RNA.G:
                                aa = "STOP";
                                break;
                            case RNA.C:
                                aa = "Tyr";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.U:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Leu";
                                break;
                            case RNA.U:
                                aa = "Phe";
                                break;
                            case RNA.G:
                                aa = "Leu";
                                break;
                            case RNA.C:
                                aa = "Phe";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.G:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "STOP";
                                break;
                            case RNA.U:
                                aa = "Cys";
                                break;
                            case RNA.G:
                                aa = "Trp";
                                break;
                            case RNA.C:
                                aa = "Cys";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.C:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Ser";
                                break;
                            case RNA.U:
                                aa = "Ser";
                                break;
                            case RNA.G:
                                aa = "Ser";
                                break;
                            case RNA.C:
                                aa = "Ser";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                } //second level
                break;
            case RNA.G:
                switch (codon.sp) {
                    case RNA.A:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Glu";
                                break;
                            case RNA.U:
                                aa = "Asp";
                                break;
                            case RNA.G:
                                aa = "Glu";
                                break;
                            case RNA.C:
                                aa = "Asp";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.U:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Val";
                                break;
                            case RNA.U:
                                aa = "Val";
                                break;
                            case RNA.G:
                                aa = "Val";
                                break;
                            case RNA.C:
                                aa = "Val";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.G:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Gly";
                                break;
                            case RNA.U:
                                aa = "Gly";
                                break;
                            case RNA.G:
                                aa = "Gly";
                                break;
                            case RNA.C:
                                aa = "Gly";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.C:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Ala";
                                break;
                            case RNA.U:
                                aa = "Ala";
                                break;
                            case RNA.G:
                                aa = "Ala";
                                break;
                            case RNA.C:
                                aa = "Ala";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                } //second level
                break;
            case RNA.C:
                switch (codon.sp) {
                    case RNA.A:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Gln";
                                break;
                            case RNA.U:
                                aa = "His";
                                break;
                            case RNA.G:
                                aa = "Gln";
                                break;
                            case RNA.C:
                                aa = "His";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.U:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Leu";
                                break;
                            case RNA.U:
                                aa = "Leu";
                                break;
                            case RNA.G:
                                aa = "Leu";
                                break;
                            case RNA.C:
                                aa = "Leu";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.G:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Arg";
                                break;
                            case RNA.U:
                                aa = "Arg";
                                break;
                            case RNA.G:
                                aa = "Arg";
                                break;
                            case RNA.C:
                                aa = "Arg";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case RNA.C:
                        switch (codon.tp) {
                            case RNA.A:
                                aa = "Pro";
                                break;
                            case RNA.U:
                                aa = "Pro";
                                break;
                            case RNA.G:
                                aa = "Pro";
                                break;
                            case RNA.C:
                                aa = "Pro";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                } //second level
                break;
            default:
                throw new TypeError("Invalid character");
        } //first level
        return aa;
    };
    return Codon;
}());
exports.Codon = Codon;
