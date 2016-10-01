"use strict";
const rna_1 = require('./rna');
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
class Codon {
    /**
     * Codon constructor can optionaly accept it's RNA bases.
     *
     * @param fp First base of the codon
     * @param sp Second base of the codon
     * @param tp Third base of the codon
     * ```JavaScript
     * var cod = new Codon(RNA.A, RNA.U, RNA.G);
     * // OR
     * var cod = new Codon();
     * ```
     */
    constructor(fp, sp, tp) {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }
    /**
     * @returns {RNA} returns an Enum of the type: See [[RNA]]
     */
    get fp() {
        return this._fp;
    }
    set fp(base) {
        this._fp = base;
    }
    /**
     * @returns {RNA} returns an Enum of the type: See [[RNA]]
     */
    get sp() {
        return this._sp;
    }
    /**
     * @returns {RNA} returns an Enum of the type: See [[RNA]]
     */
    set sp(base) {
        this._sp = base;
    }
    get tp() {
        return this._tp;
    }
    /**
     * @return {RNA} returns an Enum of the type: See [[RNA]]
     */
    set tp(base) {
        this._tp = base;
    }
    /**
     * Sets a new codon with the suplemented parameters
     * @param fp [[RNA]] Base
     * @param sp [[RNA]] Base
     * @param tp [[RNA]] Base
     */
    setCodon(fp, sp, tp) {
        this.fp = fp;
        this.sp = sp;
        this.tp = tp;
    }
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
    static getCodonChain(codons) {
        var seq = "";
        codons.forEach((codon) => {
            if (codons.indexOf(codon) === codons.length - 1) {
                seq += `${this.matchCodon(codon)}`;
            }
            else {
                seq += `${this.matchCodon(codon)}-`;
            }
        });
        return seq;
    }
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
    static matchCodon(codon) {
        var aa = "";
        switch (codon.fp) {
            case rna_1.RNA.A:
                switch (codon.sp) {
                    case rna_1.RNA.A:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Lys";
                                break;
                            case rna_1.RNA.U:
                                aa = "Asn";
                                break;
                            case rna_1.RNA.G:
                                aa = "Lys";
                                break;
                            case rna_1.RNA.C:
                                aa = "Asn";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.U:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Ile";
                                break;
                            case rna_1.RNA.U:
                                aa = "Ile";
                                break;
                            case rna_1.RNA.G:
                                aa = "Met";
                                break;
                            case rna_1.RNA.C:
                                aa = "Ile";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.G:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Arg";
                                break;
                            case rna_1.RNA.U:
                                aa = "Ser";
                                break;
                            case rna_1.RNA.G:
                                aa = "Arg";
                                break;
                            case rna_1.RNA.C:
                                aa = "Ser";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.C:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Thr";
                                break;
                            case rna_1.RNA.U:
                                aa = "Thr";
                                break;
                            case rna_1.RNA.G:
                                aa = "Thr";
                                break;
                            case rna_1.RNA.C:
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
            case rna_1.RNA.U:
                switch (codon.sp) {
                    case rna_1.RNA.A:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "STOP";
                                break;
                            case rna_1.RNA.U:
                                aa = "Tyr";
                                break;
                            case rna_1.RNA.G:
                                aa = "STOP";
                                break;
                            case rna_1.RNA.C:
                                aa = "Tyr";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.U:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Leu";
                                break;
                            case rna_1.RNA.U:
                                aa = "Phe";
                                break;
                            case rna_1.RNA.G:
                                aa = "Leu";
                                break;
                            case rna_1.RNA.C:
                                aa = "Phe";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.G:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "STOP";
                                break;
                            case rna_1.RNA.U:
                                aa = "Cys";
                                break;
                            case rna_1.RNA.G:
                                aa = "Trp";
                                break;
                            case rna_1.RNA.C:
                                aa = "Cys";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.C:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Ser";
                                break;
                            case rna_1.RNA.U:
                                aa = "Ser";
                                break;
                            case rna_1.RNA.G:
                                aa = "Ser";
                                break;
                            case rna_1.RNA.C:
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
            case rna_1.RNA.G:
                switch (codon.sp) {
                    case rna_1.RNA.A:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Glu";
                                break;
                            case rna_1.RNA.U:
                                aa = "Asp";
                                break;
                            case rna_1.RNA.G:
                                aa = "Glu";
                                break;
                            case rna_1.RNA.C:
                                aa = "Asp";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.U:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Val";
                                break;
                            case rna_1.RNA.U:
                                aa = "Val";
                                break;
                            case rna_1.RNA.G:
                                aa = "Val";
                                break;
                            case rna_1.RNA.C:
                                aa = "Val";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.G:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Gly";
                                break;
                            case rna_1.RNA.U:
                                aa = "Gly";
                                break;
                            case rna_1.RNA.G:
                                aa = "Gly";
                                break;
                            case rna_1.RNA.C:
                                aa = "Gly";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.C:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Ala";
                                break;
                            case rna_1.RNA.U:
                                aa = "Ala";
                                break;
                            case rna_1.RNA.G:
                                aa = "Ala";
                                break;
                            case rna_1.RNA.C:
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
            case rna_1.RNA.C:
                switch (codon.sp) {
                    case rna_1.RNA.A:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Gln";
                                break;
                            case rna_1.RNA.U:
                                aa = "His";
                                break;
                            case rna_1.RNA.G:
                                aa = "Gln";
                                break;
                            case rna_1.RNA.C:
                                aa = "His";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.U:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Leu";
                                break;
                            case rna_1.RNA.U:
                                aa = "Leu";
                                break;
                            case rna_1.RNA.G:
                                aa = "Leu";
                                break;
                            case rna_1.RNA.C:
                                aa = "Leu";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.G:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Arg";
                                break;
                            case rna_1.RNA.U:
                                aa = "Arg";
                                break;
                            case rna_1.RNA.G:
                                aa = "Arg";
                                break;
                            case rna_1.RNA.C:
                                aa = "Arg";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        } //third level
                        break;
                    case rna_1.RNA.C:
                        switch (codon.tp) {
                            case rna_1.RNA.A:
                                aa = "Pro";
                                break;
                            case rna_1.RNA.U:
                                aa = "Pro";
                                break;
                            case rna_1.RNA.G:
                                aa = "Pro";
                                break;
                            case rna_1.RNA.C:
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
    }
}
exports.Codon = Codon;
