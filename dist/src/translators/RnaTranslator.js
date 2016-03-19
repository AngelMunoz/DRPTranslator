"use strict";
var symbols = require('../symbols/Symbols');
var codon = require("../symbols/Codon");
var RNA = symbols.RNA;
var Codon = codon.Codon;
var RNATranslator = (function () {
    function RNATranslator() {
    }
    RNATranslator.prototype.transRNAtoDNA = function (rna) {
        var rnaArr = [];
        for (var i = 0; i < rna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(this.matchRnaBase(rna.toUpperCase().charAt(i)));
        }
        var rnaStr = this.rnaToString(rnaArr);
        return rnaStr.replace(/U/g, "T");
    };
    RNATranslator.prototype.transRNAtoAA = function (rna) {
        var cod = new Codon();
        var codons = this.rnaToCodonArray(rna.toUpperCase());
        return Codon.getCodonChain(codons);
    };
    RNATranslator.prototype.findStarts = function (rna) {
        var startsPos = [];
        var start = rna.indexOf('AUG');
        if (start !== -1)
            startsPos.push(start);
        while (start !== -1) {
            start = rna.toUpperCase().indexOf('AUG', start + 1);
            if (start !== -1) {
                startsPos.push(start);
            }
            else {
                break;
            }
        }
        return startsPos;
    };
    RNATranslator.prototype.findStops = function (rna) {
        var stopsPos = [];
        var stop1 = rna.indexOf('UAA');
        var stop2 = rna.indexOf('UAG');
        var stop3 = rna.indexOf('UGA');
        if (stop1 !== -1)
            stopsPos.push(stop1);
        if (stop2 !== -1)
            stopsPos.push(stop2);
        if (stop3 !== -1)
            stopsPos.push(stop3);
        while (stop1 !== -1) {
            stop1 = rna.toUpperCase().indexOf('UAA', stop1 + 1);
            if (stop1 !== -1) {
                stopsPos.push(stop1);
            }
            else {
                break;
            }
        }
        while (stop2 !== -1) {
            stop2 = rna.toUpperCase().indexOf('UAG', stop2 + 1);
            if (stop2 !== -1) {
                stopsPos.push(stop2);
            }
            else {
                break;
            }
        }
        while (stop3 !== -1) {
            stop3 = rna.toUpperCase().indexOf('UGA', stop3 + 1);
            if (stop3 !== -1) {
                stopsPos.push(stop3);
            }
            else {
                break;
            }
        }
        return stopsPos;
    };
    RNATranslator.prototype.rnaToCodonArray = function (rna) {
        var _this = this;
        var codons = [];
        var rnaSeq = this.findSeqStartAndStop(rna);
        var chopedSeq = rnaSeq.match(/.{3}/g);
        chopedSeq.forEach(function (codStr) {
            var a = _this.matchRnaBase(codStr.charAt(0));
            var b = _this.matchRnaBase(codStr.charAt(1));
            var c = _this.matchRnaBase(codStr.charAt(2));
            var cod = new Codon(a, b, c);
            codons.push(cod);
        });
        return codons;
    };
    RNATranslator.prototype.findSeqStartAndStop = function (rna) {
        var starts = [];
        var stops = [];
        var seq;
        starts = this.findStarts(rna);
        stops = this.findStops(rna);
        seq = rna.substring(starts[0] || 0, stops[0] + 3 || rna.length);
        return seq;
    };
    RNATranslator.prototype.matchRnaBase = function (b) {
        switch (b) {
            case 'A':
                return RNA.A;
            case 'U':
                return RNA.U;
            case 'G':
                return RNA.G;
            case 'C':
                return RNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    };
    RNATranslator.prototype.matchOpositeRnaBase = function (b) {
        switch (b) {
            case RNA.A:
                return RNA.U;
            case RNA.U:
                return RNA.A;
            case RNA.G:
                return RNA.C;
            case RNA.C:
                return RNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    };
    RNATranslator.prototype.rnaToString = function (rna) {
        var dnaStr = "";
        rna.forEach(function (base) {
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
    return RNATranslator;
}());
exports.RNATranslator = RNATranslator;
