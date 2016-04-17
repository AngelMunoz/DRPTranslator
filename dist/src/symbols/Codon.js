"use strict";
var Symbols_1 = require("./Symbols");
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
var Codon = (function () {
    /**
     * Codon constructor can optionaly accept it's RNA bases.
     *
     * @param fp First base of the codon
     * @param sp Second base of the codon
     * @param tp Third base of the codon
     * ```JavaScript
     * var cod = new Codon(RNA.A, RNA.U, RNA.G);
     * ```
     */
    function Codon(fp, sp, tp) {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }
    /**
     * Sets a new codon with the suplemented parameters
     * @param fp [[RNA]] Base
     * @param sp [[RNA]] Base
     * @param tp [[RNA]] Base
     */
    Codon.prototype.setCodon = function (fp, sp, tp) {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    };
    Codon.prototype.toString = function () {
        var codon = "";
        switch (this._fp) {
            case Symbols_1.RNA.A:
                codon += 'A';
                break;
            case Symbols_1.RNA.U:
                codon += 'U';
                break;
            case Symbols_1.RNA.G:
                codon += 'G';
                break;
            case Symbols_1.RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        switch (this._sp) {
            case Symbols_1.RNA.A:
                codon += 'A';
                break;
            case Symbols_1.RNA.U:
                codon += 'U';
                break;
            case Symbols_1.RNA.G:
                codon += 'G';
                break;
            case Symbols_1.RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        switch (this._tp) {
            case Symbols_1.RNA.A:
                codon += 'A';
                break;
            case Symbols_1.RNA.U:
                codon += 'U';
                break;
            case Symbols_1.RNA.G:
                codon += 'G';
                break;
            case Symbols_1.RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        return codon;
    };
    /**
     * Returns a string made with the matches of a [[Codon]] array
     * @static
     * @return {String}
     * ```JavaScript
     * var cod1 = new Codon(RNA.A,RNA.U,RNA.G);
     * var cod2 = new Codon(RNA.U,RNA.G,RNA.A);
     * var arr = [cod1,cod2];
     * var aaSeq = Codon.getCodonChain(arr);
     * console.log(aaSeq); // Met-STOP
     * ```
     */
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
    /**
     * Matches a [[Codon]] object with a string that represents
     * the matching AminoAcid based on the Central Dogma of Molecular Biology
     * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
     * @static
     * @return {String}
     * ```JavaScript
     * var cod = new Codon(RNA.A,RNA.U,RNA.G);
     * console.log(Codon.matchCodon(cod)); // Met
     * ```
     */
    Codon.matchCodon = function (codon) {
        var aa = "";
        for (var key in Symbols_1.AA) {
            if (Symbols_1.AA.hasOwnProperty(key)) {
                Symbols_1.AA[key].forEach(function (cod) {
                    if (cod == codon.toString()) {
                        aa = key;
                    }
                });
            }
        }
        return aa;
    };
    return Codon;
}());
exports.Codon = Codon;
