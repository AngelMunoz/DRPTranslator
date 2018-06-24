import { CodonMap } from "./codon-map";
import { RNA } from "./rna";
/**
 * A class that represents a codon object
 * a codon must have 3 bases to be able to be converted into an aminoacid
 * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
 */
export class Codon {

    /**
     * Returns a string made with the matches of a @see Codon array
     * @static
     * @return { string } the string with the codon translation
     * @example
     * ```JavaScript
     * var cod1 = new Codon(RNA.A,RNA.U,RNA.G);
     * var cod2 = new Codon(RNA.U,RNA.G,RNA.A);
     * var arr = [cod1,cod2];
     * var aaSeq = Codon.getCodonChain(arr);
     * console.log(aaSeq); // Met-STOP
     * ```
     * @throws {TypeError}
     */
    public static getCodonChain(codons: Codon[]): string {
        const codonstr = codons.map((codon) => this.matchCodon(codon)).join("-");
        if (codonstr.startsWith("-") || codonstr.match(/--/i) || codonstr.endsWith("-")) {
            let hint;
            if (codonstr.startsWith("-")) {
                hint = "Hint: You should check the first codon provided";
            } else if (codonstr.endsWith("-")) {
                hint = "Hint: You should check the last codon provided";
            } else {
                hint = `Hint: You should check a codon near index ${
                    codonstr.split("--")[0].split("-").length
                    }: ${
                    codons[codonstr.split("--")[0].split("-").length]
                    }`;
            }
            throw new TypeError(`One of the provided codons isn't a valid Codon\nparsed string: ${codonstr}\n${hint}`);
        }
        return codonstr;
    }

    /**
     * Matches a [[Codon]] object with a string that represents
     * the matching AminoAcid based on the Central Dogma of Molecular Biology
     * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
     * @static
     * @return {string | undefined}
     * ```JavaScript
     * var cod = new Codon(RNA.A,RNA.U,RNA.G);
     * console.log(Codon.matchCodon(cod)); // Met
     * ```
     */
    public static matchCodon(codon: Codon): string | undefined {
        // check the codon map for said codon
        return CodonMap.has(codon.toString()) ? CodonMap.get(codon.toString()) : undefined;
    }

    public fp: RNA;
    public sp: RNA;
    public tp: RNA;

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
    constructor(fp?: RNA, sp?: RNA, tp?: RNA) {
        this.fp = fp;
        this.sp = sp;
        this.tp = tp;
    }

    /**
     * Sets a new codon with the suplemented parameters
     * @param {RNA} fp Base
     * @param {RNA} sp Base
     * @param {RNA} tp Base
     */
    public setCodon(fp: RNA, sp: RNA, tp: RNA): void {
        this.fp = fp;
        this.sp = sp;
        this.tp = tp;
    }

    public toString() {
        return `${this.fp}${this.sp}${this.tp}`;
    }
}
