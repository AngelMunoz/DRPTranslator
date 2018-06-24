import { DNA } from "../symbols/dna";
import { RNA } from "../symbols/rna";
import { RNATranslator } from "./rna.translator";

/**
 * Specialized class that allows to translate and transcript DNA sequences
 */
export class DNATranslator {

  /**
   * @param {string} DNA sequence to be translated into a complementary chain of DNA.
   * @returns {string} The string returned is a complementary sequence of the provided in the parameter.
   *
   * ```
   * ATGCTA
   *
   * TACGAT
   * ```
   */
  public transDNAtoOpositeDNA(dna: string): string {
    const dnaArr = dna
      // get uppercase string
      .toUpperCase()
      .split("")
      // convert each letter in the string to RNA
      .map((base) => this.matchOpositeDnaBase(this.matchDnaBase(base)));
    return this.dnaToString(dnaArr);
  }

  /**
   * @param {string} dna sequence to be translated into a complementary chain of RNA
   * @returns {string} The string returned is a complementary sequence of the provided in the parameter
   *
   * ```
   * ATGCTA
   *
   * UACGAU
   * ```
   */
  public transDNAtoRNA(dna: string): string {
    const rnaArr = dna
      // get uppercase string
      .toUpperCase()
      .split("")
      // convert each letter in the string to RNA
      .map((base) => this.matchOpositeRnaBase(this.matchDnaBase(base)));
    return this.rnaToString(rnaArr);

  }

  /**
   * @param {string} dna sequence to be translated into a complementary chain of Aminoacids
   * @returns {string} The string returned is a complementary sequence of the provided in the parameter
   *
   * ```
   * ATGCTA
   *
   * Tyr-Asp
   * ```
   */
  public transDNAtoAA(dna: string): string {
    const rnaTrans = new RNATranslator();
    const rnaSeq = this.transDNAtoRNA(dna);
    return rnaTrans.transRNAtoAA(rnaSeq);
  }

  /**
   * @param {string} base digit string (character) that is the base to be converted into the RNA enum.
   * @returns {RNA} Returns the corresponding RNA base.
   *
   */
  public matchRnaBase(base: string): RNA {
    switch (base) {
      case "A":
        return RNA.A;
      case "T":
        return RNA.U;
      case "G":
        return RNA.G;
      case "C":
        return RNA.C;
      default:
        throw new TypeError(`Invalid character: ${base}`);
    }
  }

  /**
   * @param {DNA} base base which needs to be replaced.
   * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
   */
  public matchOpositeRnaBase(base: DNA): RNA {
    switch (base) {
      case DNA.A:
        return RNA.U;
      case DNA.T:
        return RNA.A;
      case DNA.G:
        return RNA.C;
      case DNA.C:
        return RNA.G;
      default:
        throw new TypeError(`Invalid character: ${base}`);
    }
  }

  /**
   * @param {DNA} base base which needs to be replaced
   * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided
   */
  public matchOpositeDnaBase(base: DNA): DNA {
    switch (base) {
      case DNA.A:
        return DNA.T;
      case DNA.T:
        return DNA.A;
      case DNA.G:
        return DNA.C;
      case DNA.C:
        return DNA.G;
      default:
        throw new TypeError(`Invalid character: ${base}`);
    }
  }

  /**
   * @param {string} base digit string (character) that is the base to be converted into the DNA enum
   * @returns {DNA} Returns the corresponding DNA base
   *
   */
  public matchDnaBase(base: string): DNA {
    switch (base) {
      case "A":
        return DNA.A;
      case "T":
        return DNA.T;
      case "G":
        return DNA.G;
      case "C":
        return DNA.C;
      default:
        throw new TypeError(`Invalid character: ${base}`);
    }
  }

  /**
   * @param {RNA[]} rnaArray array containing the sequence to be parsed into a string.
   * @returns {string} string containing the RNA sequence provided.
   */
  public rnaToString(rnaArray: RNA[]): string {
    return rnaArray.join("");
  }

  /**
   * @param {DNA[]} dnaArray array containing the sequence to be parsed into a string.
   * @returns {string} string containing the DNA sequence provided.
   */
  public dnaToString(dnaArray: DNA[]): string {
    return dnaArray.join("");
  }

}
