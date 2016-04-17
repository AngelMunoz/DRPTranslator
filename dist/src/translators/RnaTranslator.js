"use strict";
var Codon_1 = require("../symbols/Codon");
var Symbols_1 = require("../symbols/Symbols");
/**
 * Specialized class that allows to translate and transcript RNA sequences
 */
var RNATranslator = (function () {
    function RNATranslator() {
    }
    /**
     * @param {String} RNA sequence to be translated into a complementary chain of DNA.
     * @returns {String} The string returned is a complementary sequence of the provided.
     *
     * ```
     * UACGAU
     *
     * ATGCTA
     * ```
     */
    RNATranslator.prototype.transRNAtoDNA = function (rna) {
        var rnaArr = [];
        for (var i = 0; i < rna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(this.matchRnaBase(rna.toUpperCase().charAt(i)));
        }
        var rnaStr = this.rnaToString(rnaArr);
        return rnaStr.replace(/U/g, "T");
    };
    /**
     * @param {String} RNA sequence to be translated into a complementary chain of RNA
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * UACGAU
     *
     * AUGCUA
     * ```
     */
    RNATranslator.prototype.transRNAtoRNA = function (rna) {
        var rnaArr = [];
        for (var i = 0; i < rna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(this.matchRnaBase(rna.toUpperCase().charAt(i)));
        }
        var tempRnaRes = this.rnaToString(rnaArr);
        return tempRnaRes;
    };
    /**
     * This method is a quite tricky to implement, while some schools will say you have to
     * read all the chain with it's multiple stop codons, some will tell you there's only one start and stop codon
     * the new approach here is to let you decide whether you want to include all starts or all stops or both.
     *
     * @param {String} RNA sequence to be translated into a complementary chain of Aminoacids
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * UACGAU
     *
     * Tyr-Asp
     * ```
     */
    RNATranslator.prototype.transRNAtoAA = function (rna, starts, stops) {
        var codons = this.rnaToCodonArray(rna.toUpperCase(), starts, stops);
        return Codon_1.Codon.getCodonChain(codons);
    };
    /**
     * This method returns an array of positions where start sequences are
     * this method could be useful if you need to identify if ther are any repeated start codons in a sequence
     * or if you need to translate a sequence from different start codons.
     * @param {String} String RNA sequence that will be searched for Start sequences.
     * @return {Number []} Returns an array with the indexes of the start sequences ("AUG");
     */
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
    /**
     * This method will find any stop codons in a RNA string,
     * @param {String} string containing RNA characters.
     * @return {Number []} Returns an array with the indexes of the Stop codons ('UAA','UAG','UGA')
     */
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
    /**
     * Given a RNA string, this method will convert any codons available in the string
     * however this method will try to translate a sequence from the first start codon and the first STOP codon
     * Given `AGAUGCUGCUGCAGU` the string used for the translation will be `AUGCUGCUGCAGU`
     * or Given `AGAUGGUAUAGCUGCUGCAGU` the string for translation will be `AUGGUAUAG`
     * @param {String} RNA string that will be used for translation.
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @returns {Codon[]} Codon array that can be used to transcribe into an AA sequence
     */
    RNATranslator.prototype.rnaToCodonArray = function (rna, starts, stops) {
        var _this = this;
        var codons = [];
        var rnaSeq = this.findSeqStartAndStop(rna, starts, stops);
        var chopedSeq = rnaSeq.match(/.{3}/g);
        chopedSeq.forEach(function (codStr) {
            var a = _this.matchRnaBase(codStr.charAt(0));
            var b = _this.matchRnaBase(codStr.charAt(1));
            var c = _this.matchRnaBase(codStr.charAt(2));
            var cod = new Codon_1.Codon(a, b, c);
            codons.push(cod);
        });
        return codons;
    };
    /**
     * Given a RNA string, this method will chop the RNA string
     * into the First Start and the First STOP codon's available in the string
     * Given `AGAUGCUGCUGCAGU` the string returned will be `AUGCUGCUGCAGU`
     * or Given `AGAUGGUAUAGCUGCUGCAGU` the string returned will be `AUGGUAUAG`
     * Given the case without any Start or STOP codons, the string will be unmodified.
     * **NEW**
     * The parameters start and stop have been added which in turn will let you decide whether
     * you want to include full starts or full stops, notice however that the sequence will be different
     * if you put starts=true & stops=true, for example:
     * ```JavaScript
     * findSeqStartAndStop("AAAAUGACGAUG", true); // starts = [3, 9] -> AUGACGAUG
     * findSeqStartAndStop("CGAUGCGUAUGCGCG", true) // starts = [2,8] -> AUGCGUAUGCGCG
     * findSeqStartAndStop("AAAAUGACGAUG", false); // starts = [] -> AAAAUGACGAUG
     * findSeqStartAndStop("CGAUGCGUAUGCGCG", false) // starts = [] -> CGAUGCGUAUGCGCG
     * ```
     * @param {String} RNA string that will be choped into a smaller sequence
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @return {String} Choped string containing only one Start codon and only one STOP codon.
     */
    RNATranslator.prototype.findSeqStartAndStop = function (rna, start, stop) {
        if (start === void 0) { start = false; }
        if (stop === void 0) { stop = false; }
        var starts = [];
        var stops = [];
        var seq;
        if (start && stop) {
            starts = this.findStarts(rna);
            stops = this.findStops(rna);
            seq = rna.substring(starts[0] || 0, stops[0] + 3 || rna.length);
        }
        else if (!start && stop) {
            stops = this.findStops(rna);
            seq = rna.substring(0, stops[0] + 3 || rna.length);
        }
        else if (start && !stop) {
            starts = this.findStarts(rna);
            seq = rna.substring(starts[0] || 0, rna.length);
        }
        else {
            seq = rna;
        }
        return seq;
    };
    /**
     * @param {String} One digit string (character) that is the base to be converted into the RNA enum.
     * @returns {RNA} Returns the corresponding RNA base.
     *
     */
    RNATranslator.prototype.matchRnaBase = function (b) {
        switch (b) {
            case 'A':
                return Symbols_1.RNA.A;
            case 'U':
                return Symbols_1.RNA.U;
            case 'G':
                return Symbols_1.RNA.G;
            case 'C':
                return Symbols_1.RNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    };
    /**
     * @param {DNA} DNA base which needs to be replaced.
     * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
     */
    RNATranslator.prototype.matchOpositeRnaBase = function (b) {
        switch (b) {
            case Symbols_1.RNA.A:
                return Symbols_1.RNA.U;
            case Symbols_1.RNA.U:
                return Symbols_1.RNA.A;
            case Symbols_1.RNA.G:
                return Symbols_1.RNA.C;
            case Symbols_1.RNA.C:
                return Symbols_1.RNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    };
    /**
     * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the RNA sequence provided.
     */
    RNATranslator.prototype.rnaToString = function (rna) {
        var dnaStr = "";
        rna.forEach(function (base) {
            switch (base) {
                case Symbols_1.RNA.A:
                    dnaStr += 'A';
                    break;
                case Symbols_1.RNA.U:
                    dnaStr += 'U';
                    break;
                case Symbols_1.RNA.G:
                    dnaStr += 'G';
                    break;
                case Symbols_1.RNA.C:
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
