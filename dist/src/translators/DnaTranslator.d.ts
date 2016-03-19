import symbols = require("../symbols/Symbols");
import DNA = symbols.DNA;
import RNA = symbols.RNA;
export declare class DNATranslator {
    transDNAtoDNA(dna: string): string;
    transDNAtoRNA(dna: string): string;
    transDNAtoAA(dna: string): string;
    matchRnaBase(b: any): RNA;
    matchOpositeRnaBase(b: DNA): RNA;
    rnaToString(dna: RNA[]): string;
    matchDnaBase(b: any): DNA;
    matchOpositeDnaBase(b: DNA): DNA;
    dnaToString(dna: DNA[]): string;
}
