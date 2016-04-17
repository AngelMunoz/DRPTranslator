"use strict";
import {RNA, AA} from "./Symbols";
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
export class Codon {

    private _fp: RNA;
    private _sp: RNA;
    private _tp: RNA;

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
    constructor(fp: RNA, sp: RNA, tp: RNA) {
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
    public setCodon(fp: RNA, sp: RNA, tp: RNA): void {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }

    public toString(): string {
        var codon = "";
        switch (this._fp) {
            case RNA.A:
                codon += 'A';
                break;
            case RNA.U:
                codon += 'U';
                break;
            case RNA.G:
                codon += 'G';
                break;
            case RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        switch (this._sp) {
            case RNA.A:
                codon += 'A';
                break;
            case RNA.U:
                codon += 'U';
                break;
            case RNA.G:
                codon += 'G';
                break;
            case RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        switch (this._tp) {
            case RNA.A:
                codon += 'A';
                break;
            case RNA.U:
                codon += 'U';
                break;
            case RNA.G:
                codon += 'G';
                break;
            case RNA.C:
                codon += 'C';
                break;
            default:
                break;
        }
        return codon;
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
    public static getCodonChain(codons: Codon[]): string {

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
    public static matchCodon(codon: Codon): string {
        var aa = "";
        for (var key in AA) {
            if (AA.hasOwnProperty(key)) {
                AA[key].forEach((cod) => {
                    if (cod == codon.toString()){
                       aa = key;
                    }
                });
            }
        }
        return aa;
    }
}
