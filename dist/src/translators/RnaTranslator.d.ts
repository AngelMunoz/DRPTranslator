import symbols = require('../symbols/Symbols');
import codon = require("../symbols/Codon");
import RNA = symbols.RNA;
import Codon = codon.Codon;
export declare class RNATranslator {
    transRNAtoDNA(rna: string): string;
    transRNAtoRNA(rna: string): string;
    transRNAtoAA(rna: string, starts?: boolean, stops?: boolean): string;
    findStarts(rna: string): number[];
    findStops(rna: string): number[];
    rnaToCodonArray(rna: string, starts?: boolean, stops?: boolean): Codon[];
    findSeqStartAndStop(rna: string, start?: boolean, stop?: boolean): string;
    matchRnaBase(b: any): RNA;
    matchOpositeRnaBase(b: RNA): RNA;
    rnaToString(rna: RNA[]): string;
}
