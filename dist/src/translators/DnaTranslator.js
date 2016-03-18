"use strict";
var rnatranslator = require("./RnaTranslator");
var symbols = require("../symbols/Symbols");
var DNA = symbols.DNA;
var RNA = symbols.RNA;
var RNATranslator = rnatranslator.RNATranslator;
var DNATranslator = (function () {
    function DNATranslator() {
        this._rnaTranslator = new RNATranslator();
    }
    Object.defineProperty(DNATranslator.prototype, "rnaTranslator", {
        get: function () {
            return this._rnaTranslator;
        },
        enumerable: true,
        configurable: true
    });
    DNATranslator.prototype.transDNAtoDNA = function (dna) {
        var dnaArr = [];
        for (var i = 0; i < dna.length; i++) {
            dnaArr[i] = this.matchOpositeDnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.dnaToString(dnaArr);
    };
    DNATranslator.prototype.transDNAtoRNA = function (dna) {
        var rnaArr = [];
        for (var i = 0; i < dna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.rnaToString(rnaArr);
    };
    DNATranslator.prototype.transDNAtoAA = function (dna) {
        var rnaSeq = this.transDNAtoRNA(dna);
        return this.rnaTranslator.transRNAtoAA(rnaSeq);
    };
    DNATranslator.prototype.matchRnaBase = function (b) {
        switch (b) {
            case 'A':
                return RNA.A;
            case 'T':
                return RNA.U;
            case 'G':
                return RNA.G;
            case 'C':
                return RNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    };
    DNATranslator.prototype.matchOpositeRnaBase = function (b) {
        switch (b) {
            case DNA.A:
                return RNA.U;
            case DNA.T:
                return RNA.A;
            case DNA.G:
                return RNA.C;
            case DNA.C:
                return RNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    };
    DNATranslator.prototype.rnaToString = function (dna) {
        var dnaStr = "";
        dna.forEach(function (base) {
            switch (base) {
                case RNA.A:
                    dnaStr += 'A';
                    break;
                case RNA.U:
                    dnaStr += 'U';
                    break;
                case RNA.G:
                    dnaStr += 'G';
                    break;
                case RNA.C:
                    dnaStr += 'C';
                    break;
                default:
                    throw new TypeError("Invalid character");
            }
        });
        return dnaStr;
    };
    DNATranslator.prototype.matchDnaBase = function (b) {
        switch (b) {
            case 'A':
                return DNA.A;
            case 'T':
                return DNA.T;
            case 'G':
                return DNA.G;
            case 'C':
                return DNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    };
    DNATranslator.prototype.matchOpositeDnaBase = function (b) {
        switch (b) {
            case DNA.A:
                return DNA.T;
            case DNA.T:
                return DNA.A;
            case DNA.G:
                return DNA.C;
            case DNA.C:
                return DNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    };
    DNATranslator.prototype.dnaToString = function (dna) {
        var dnaStr = "";
        dna.forEach(function (base) {
            switch (base) {
                case DNA.A:
                    dnaStr += 'A';
                    break;
                case DNA.T:
                    dnaStr += 'T';
                    break;
                case DNA.G:
                    dnaStr += 'G';
                    break;
                case DNA.C:
                    dnaStr += 'C';
                    break;
                default:
                    throw new TypeError("Invalid character");
            }
        });
        return dnaStr;
    };
    return DNATranslator;
}());
exports.DNATranslator = DNATranslator;
