"use strict";
import symbols = require('./Symbols');
import RNA = symbols.RNA;
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
export class Codon {

    private _fp:RNA;
    private _sp:RNA;
    private _tp:RNA;

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
    constructor(fp?:RNA, sp?:RNA, tp?:RNA) {
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
    set fp(base:RNA) {
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
    set sp(base:RNA) {
        this._sp = base;
    }

    get tp() {
        return this._tp;
    }
    /**
     * @return {RNA} returns an Enum of the type: See [[RNA]]
     */
    set tp(base:RNA) {
        this._tp = base;
    }

    /**
     * Sets a new codon with the suplemented parameters
     * @param fp [[RNA]] Base
     * @param sp [[RNA]] Base
     * @param tp [[RNA]] Base
     */
    public setCodon(fp:RNA,sp:RNA,tp:RNA):void {
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
    public static getCodonChain(codons:Codon[]):string {

        var seq = "";
        codons.forEach((codon) =>{
            if(codons.indexOf(codon) === codons.length-1) {
                seq+= `${this.matchCodon(codon)}`;
            }
            else {
                seq+= `${this.matchCodon(codon)}-`;
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
    public static matchCodon(codon:Codon):string {
        var aa = "";
        switch(codon.fp) {
            case RNA.A:
                switch(codon.sp) {
                    case RNA.A:
                        switch(codon.tp) {
                            case RNA.A: // AAA
                                aa = "Lys";
                                break;
                            case RNA.U: // AAU
                                aa = "Asn";
                                break;
                            case RNA.G: // AAG
                                aa = "Lys";
                                break;
                            case RNA.C: // AAC
                                aa = "Asn";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.U:
                        switch(codon.tp) {
                            case RNA.A: // AUA
                                aa = "Ile";
                                break;
                            case RNA.U: // AUU
                                aa = "Ile";
                                break;
                            case RNA.G: // AUG
                                aa = "Met";
                                break;
                            case RNA.C: // AUC
                                aa = "Ile";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.G:
                        switch(codon.tp) {
                            case RNA.A: // AGA
                                aa = "Arg";
                                break;
                            case RNA.U: // AGU
                                aa = "Ser";
                                break;
                            case RNA.G: // AGG
                                aa = "Arg";
                                break;
                            case RNA.C: // AGC
                                aa = "Ser";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.C:
                        switch(codon.tp) {
                            case RNA.A: // ACA
                                aa = "Thr";
                                break;
                            case RNA.U: // ACU
                                aa = "Thr";
                                break;
                            case RNA.G: // ACG
                                aa = "Thr";
                                break;
                            case RNA.C: // ACC
                                aa = "Thr";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                }//second level
                break;
            case RNA.U:
                switch(codon.sp) {
                    case RNA.A:
                        switch(codon.tp) {
                            case RNA.A: // UAA
                                aa = "STOP"
                                break;
                            case RNA.U: // UAU
                                aa = "Tyr"
                                break;
                            case RNA.G: // UAG
                                aa = "STOP"
                                break;
                            case RNA.C: // UAC
                                aa = "Tyr"
                                break;
                            default:
                                throw new TypeError("Invalid character")
                        }//third level
                        break;
                    case RNA.U:
                        switch(codon.tp) {
                            case RNA.A: // UUA
                                aa = "Leu"
                                break;
                            case RNA.U: // UUU
                                aa = "Phe"
                                break;
                            case RNA.G: // UUG
                                aa = "Leu"
                                break;
                            case RNA.C: // UUC
                                aa = "Phe"
                                break;
                            default:
                                throw new TypeError("Invalid character")
                        }//third level
                        break;
                    case RNA.G:
                        switch(codon.tp) {
                            case RNA.A: // UGA
                                aa = "STOP"
                                break;
                            case RNA.U: // UGU
                                aa = "Cys"
                                break;
                            case RNA.G: // UGG
                                aa = "Trp"
                                break;
                            case RNA.C: // UGC
                                aa = "Cys"
                                break;
                            default:
                                throw new TypeError("Invalid character")
                        }//third level
                        break;
                    case RNA.C:
                        switch(codon.tp) {
                            case RNA.A: // UCA
                                aa = "Ser"
                                break;
                            case RNA.U: // UCU
                                aa = "Ser"
                                break;
                            case RNA.G: // UCG
                                aa = "Ser"
                                break;
                            case RNA.C: // UCC
                                aa = "Ser"
                                break;
                            default:
                                throw new TypeError("Invalid character")
                        }//third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                }//second level
                break;
            case RNA.G:
                switch(codon.sp) {
                    case RNA.A:
                        switch(codon.tp) {
                            case RNA.A: // GAA
                                aa = "Glu";
                                break;
                            case RNA.U: // GAU
                                aa = "Asp";
                                break;
                            case RNA.G: // GAG
                                aa = "Glu";
                                break;
                            case RNA.C: // GAC
                                aa = "Asp";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.U:
                        switch(codon.tp) {
                            case RNA.A: // GUA
                                aa = "Val";
                                break;
                            case RNA.U: // GUU
                                aa = "Val";
                                break;
                            case RNA.G: // GUG
                                aa = "Val";
                                break;
                            case RNA.C: // GUC
                                aa = "Val";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.G:
                        switch(codon.tp) {
                            case RNA.A: // GGA
                                aa = "Gly";
                                break;
                            case RNA.U: // GGU
                                aa = "Gly";
                                break;
                            case RNA.G: // GGG
                                aa = "Gly";
                                break;
                            case RNA.C: // GGC
                                aa = "Gly";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.C:
                        switch(codon.tp) {
                            case RNA.A: // GCA
                                aa = "Ala";
                                break;
                            case RNA.U: // GCU
                                aa = "Ala";
                                break;
                            case RNA.G: // GCG
                                aa = "Ala";
                                break;
                            case RNA.C: // GCC
                                aa = "Ala";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                }//second level
                break;
            case RNA.C:
                switch(codon.sp) {
                    case RNA.A:
                        switch(codon.tp) {
                            case RNA.A: // CAA
                                aa = "Gln";
                                break;
                            case RNA.U: // CAU
                                aa = "His";
                                break;
                            case RNA.G: // CAG
                                aa = "Gln";
                                break;
                            case RNA.C: // CAC
                                aa = "His";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.U:
                        switch(codon.tp) {
                            case RNA.A: // CUA
                                aa = "Leu";
                                break;
                            case RNA.U: // CUU
                                aa = "Leu";
                                break;
                            case RNA.G: // CUG
                                aa = "Leu";
                                break;
                            case RNA.C: // CUC
                                aa = "Leu";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.G:
                        switch(codon.tp) {
                            case RNA.A: // CGA
                                aa = "Arg";
                                break;
                            case RNA.U: // CGU
                                aa = "Arg";
                                break;
                            case RNA.G: // CGG
                                aa = "Arg";
                                break;
                            case RNA.C: // CGC
                                aa = "Arg";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    case RNA.C:
                        switch(codon.tp) {
                            case RNA.A: // CCA
                                aa = "Pro";
                                break;
                            case RNA.U: // CCU
                                aa = "Pro";
                                break;
                            case RNA.G: // CCG
                                aa = "Pro";
                                break;
                            case RNA.C: // CCC
                                aa = "Pro";
                                break;
                            default:
                                throw new TypeError("Invalid character");
                        }//third level
                        break;
                    default:
                        throw new TypeError("Invalid character");
                }//second level
                break;
            default:
                throw new TypeError("Invalid character");
        }//first level
        return aa;
    }
}
