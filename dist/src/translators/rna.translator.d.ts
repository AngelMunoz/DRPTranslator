import { RNA } from '../symbols/rna';
import { Codon } from '../symbols/codon';
/**
 * Specialized class that allows to translate and transcript RNA sequences
 */
export declare class RNATranslator {
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
    transRNAtoDNA(rna: string): string;
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
    transRNAtoRNA(rna: string): string;
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
    transRNAtoAA(rna: string, starts?: boolean, stops?: boolean): string;
    /**
     * This method returns an array of positions where start sequences are
     * this method could be useful if you need to identify if ther are any repeated start codons in a sequence
     * or if you need to translate a sequence from different start codons.
     * @param {String} String RNA sequence that will be searched for Start sequences.
     * @return {Number []} Returns an array with the indexes of the start sequences ("AUG");
     */
    findStarts(rna: string): number[];
    /**
     * This method will find any stop codons in a RNA string,
     * @param {String} string containing RNA characters.
     * @return {Number []} Returns an array with the indexes of the Stop codons ('UAA','UAG','UGA')
     */
    findStops(rna: string): number[];
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
    rnaToCodonArray(rna: string, starts?: boolean, stops?: boolean): Codon[];
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
     * @return {String} Choped string containing the rna sequence ready to translate or transcript
     */
    findSeqStartAndStop(rna: string, start?: boolean, stop?: boolean): string;
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
    matchOpositeRnaBase(b: RNA): RNA;
    /**
     * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the RNA sequence provided.
     */
    rnaToString(rna: RNA[]): string;
}
