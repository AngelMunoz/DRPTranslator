import { RNA } from "./Symbols";
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
export declare class Codon {
    private _fp;
    private _sp;
    private _tp;
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
    constructor(fp: RNA, sp: RNA, tp: RNA);
    /**
     * Sets a new codon with the suplemented parameters
     * @param fp [[RNA]] Base
     * @param sp [[RNA]] Base
     * @param tp [[RNA]] Base
     */
    setCodon(fp: RNA, sp: RNA, tp: RNA): void;
    toString(): string;
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
    static getCodonChain(codons: Codon[]): string;
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
    static matchCodon(codon: Codon): string;
}
