"use strict";
const rna_1 = require('../symbols/rna');
const dna_1 = require('../symbols/dna');
const rna_translator_1 = require('./rna.translator');
"use strict";
/**
 * Specialized class that allows to translate and transcript DNA sequences
 */
class DNATranslator {
    /**
     * @param {String} DNA sequence to be translated into a complementary chain of DNA.
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter.
     *
     * ```
     * ATGCTA
     *
     * TACGAT
     * ```
     */
    transDNAtoDNA(dna) {
        var dnaArr = [];
        for (var i = 0; i < dna.length; i++) {
            dnaArr[i] = this.matchOpositeDnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.dnaToString(dnaArr);
    }
    /**
     * @param {String} DNA sequence to be translated into a complementary chain of RNA
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * ATGCTA
     *
     * UACGAU
     * ```
     */
    transDNAtoRNA(dna) {
        var rnaArr = [];
        for (var i = 0; i < dna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.rnaToString(rnaArr);
    }
    /**
     * @param {String} DNA sequence to be translated into a complementary chain of Aminoacids
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * ATGCTA
     *
     * Tyr-Asp
     * ```
     */
    transDNAtoAA(dna) {
        var rnaTrans = new rna_translator_1.RNATranslator();
        var rnaSeq = this.transDNAtoRNA(dna);
        var aaSeq = rnaTrans.transRNAtoAA(rnaSeq);
        return aaSeq;
    }
    /**
     * @param {String} One digit string (character) that is the base to be converted into the RNA enum.
     * @returns {RNA} Returns the corresponding RNA base.
     *
     */
    matchRnaBase(b) {
        switch (b) {
            case 'A':
                return rna_1.RNA.A;
            case 'T':
                return rna_1.RNA.U;
            case 'G':
                return rna_1.RNA.G;
            case 'C':
                return rna_1.RNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    }
    /**
     * @param {DNA} DNA base which needs to be replaced.
     * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
     */
    matchOpositeRnaBase(b) {
        switch (b) {
            case dna_1.DNA.A:
                return rna_1.RNA.U;
            case dna_1.DNA.T:
                return rna_1.RNA.A;
            case dna_1.DNA.G:
                return rna_1.RNA.C;
            case dna_1.DNA.C:
                return rna_1.RNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    }
    /**
     * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the RNA sequence provided.
     */
    rnaToString(dna) {
        var dnaStr = "";
        dna.forEach((base) => {
            switch (base) {
                case rna_1.RNA.A:
                    dnaStr += 'A';
                    break;
                case rna_1.RNA.U:
                    dnaStr += 'U';
                    break;
                case rna_1.RNA.G:
                    dnaStr += 'G';
                    break;
                case rna_1.RNA.C:
                    dnaStr += 'C';
                    break;
                default:
                    throw new TypeError("Invalid character");
            }
        });
        return dnaStr;
    }
    /**
     * @param {String} One digit string (character) that is the base to be converted into the DNA enum
     * @returns {DNA} Returns the corresponding DNA base
     *
     */
    matchDnaBase(b) {
        switch (b) {
            case 'A':
                return dna_1.DNA.A;
            case 'T':
                return dna_1.DNA.T;
            case 'G':
                return dna_1.DNA.G;
            case 'C':
                return dna_1.DNA.C;
            default:
                throw new TypeError("Invalid character");
        }
    }
    /**
    * @param {DNA} DNA base which needs to be replaced
    * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided
    */
    matchOpositeDnaBase(b) {
        switch (b) {
            case dna_1.DNA.A:
                return dna_1.DNA.T;
            case dna_1.DNA.T:
                return dna_1.DNA.A;
            case dna_1.DNA.G:
                return dna_1.DNA.C;
            case dna_1.DNA.C:
                return dna_1.DNA.G;
            default:
                throw new TypeError("Invalid character");
        }
    }
    /**
     * @param {DNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the DNA sequence provided.
     */
    dnaToString(dna) {
        var dnaStr = "";
        dna.forEach((base) => {
            switch (base) {
                case dna_1.DNA.A:
                    dnaStr += 'A';
                    break;
                case dna_1.DNA.T:
                    dnaStr += 'T';
                    break;
                case dna_1.DNA.G:
                    dnaStr += 'G';
                    break;
                case dna_1.DNA.C:
                    dnaStr += 'C';
                    break;
                default:
                    throw new TypeError("Invalid character");
            }
        });
        return dnaStr;
    }
}
exports.DNATranslator = DNATranslator;
