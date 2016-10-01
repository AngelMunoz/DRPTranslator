import { RNA } from '../symbols/rna';
import { DNA } from '../symbols/dna';
/**
 * Specialized class that allows to translate and transcript DNA sequences
 */
export declare class DNATranslator {
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
    transDNAtoDNA(dna: string): string;
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
    transDNAtoRNA(dna: string): string;
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
    transDNAtoAA(dna: string): string;
    /**
     * @param {String} One digit string (character) that is the base to be converted into the RNA enum.
     * @returns {RNA} Returns the corresponding RNA base.
     *
     */
    matchRnaBase(b: any): RNA;
    /**
     * @param {DNA} DNA base which needs to be replaced.
     * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
     */
    matchOpositeRnaBase(b: DNA): RNA;
    /**
     * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the RNA sequence provided.
     */
    rnaToString(dna: RNA[]): string;
    /**
     * @param {String} One digit string (character) that is the base to be converted into the DNA enum
     * @returns {DNA} Returns the corresponding DNA base
     *
     */
    matchDnaBase(b: any): DNA;
    /**
    * @param {DNA} DNA base which needs to be replaced
    * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided
    */
    matchOpositeDnaBase(b: DNA): DNA;
    /**
     * @param {DNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the DNA sequence provided.
     */
    dnaToString(dna: DNA[]): string;
}
