import { RNA } from '../symbols/rna';
import { DNA } from '../symbols/dna';
import { RNATranslator } from './rna.translator';

/**
 * Specialized class that allows to translate and transcript DNA sequences
 */
export class DNATranslator {

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
  public transDNAtoDNA(dna: string): string {
    var dnaArr: DNA[] = [];
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
  public transDNAtoRNA(dna: string): string {
    var rnaArr: RNA[] = [];
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
  public transDNAtoAA(dna: string): string {
    var rnaTrans = new RNATranslator();
    var rnaSeq = this.transDNAtoRNA(dna);
    var aaSeq = rnaTrans.transRNAtoAA(rnaSeq);
    return aaSeq;
  }


  /**
   * @param {String} One digit string (character) that is the base to be converted into the RNA enum.
   * @returns {RNA} Returns the corresponding RNA base.
   * 
   */
  public matchRnaBase(b): RNA {
    switch (b) {
      case 'A':
        return RNA.A;
      case 'T':
        return RNA.U;
      case 'G':
        return RNA.G;
      case 'C':
        return RNA.C;
      default:
        throw new TypeError("Invalid character");
    }
  }

  /**
   * @param {DNA} DNA base which needs to be replaced.
   * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
   */
  public matchOpositeRnaBase(b: DNA): RNA {
    switch (b) {
      case DNA.A:
        return RNA.U;
      case DNA.T:
        return RNA.A;
      case DNA.G:
        return RNA.C;
      case DNA.C:
        return RNA.G;
      default:
        throw new TypeError("Invalid character");
    }
  }

  /**
   * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
   * @returns {String} String containing the RNA sequence provided.
   */
  public rnaToString(dna: RNA[]): string {
    var dnaStr: string = "";
    dna.forEach((base) => {
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
  }

  /**
   * @param {String} One digit string (character) that is the base to be converted into the DNA enum
   * @returns {DNA} Returns the corresponding DNA base
   * 
   */
  public matchDnaBase(b): DNA {
    switch (b) {
      case 'A':
        return DNA.A;
      case 'T':
        return DNA.T;
      case 'G':
        return DNA.G;
      case 'C':
        return DNA.C;
      default:
        throw new TypeError("Invalid character");
    }
  }

  /**
  * @param {DNA} DNA base which needs to be replaced
  * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided
  */
  public matchOpositeDnaBase(b: DNA): DNA {
    switch (b) {
      case DNA.A:
        return DNA.T;
      case DNA.T:
        return DNA.A;
      case DNA.G:
        return DNA.C;
      case DNA.C:
        return DNA.G;
      default:
        throw new TypeError("Invalid character");
    }
  }

  /**
   * @param {DNA[]} RNA array containing the sequence to be parsed into a string.
   * @returns {String} String containing the DNA sequence provided.
   */
  public dnaToString(dna: DNA[]): string {
    var dnaStr: string = "";
    dna.forEach((base) => {
      switch (base) {
        case DNA.A:
          dnaStr += 'A';
          break;
        case DNA.T:
          dnaStr += 'T';
          break;
        case DNA.G:
          dnaStr += 'G';
          break;
        case DNA.C:
          dnaStr += 'C';
          break;
        default:
          throw new TypeError("Invalid character");
      }
    });
    return dnaStr;
  }

}
