import symbols = require('../symbols/Symbols');
import codon = require("../symbols/Codon");
import RNA = symbols.RNA;
import Codon = codon.Codon;
export declare class RNATranslator {
    transRNAtoDNA(rna: string): string;
    transRNAtoAA(rna: string): string;
    findStarts(rna: string): number[];
    findStops(rna: string): number[];
    rnaToCodonArray(rna: string): Codon[];
    findSeqStartAndStop(rna: string): string;
    matchRnaBase(b: any): RNA;
    matchOpositeRnaBase(b: RNA): RNA;
    rnaToString(rna: RNA[]): string;
}
