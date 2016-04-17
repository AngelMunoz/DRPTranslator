import { DNA, RNA } from "./symbols/Symbols";
import { Codon } from "./symbols/Codon";
export declare class Matcher {
    static parseRna(b: RNA): string;
    static parseRna(b: string): RNA;
    static parseOpositeRna(b: RNA): string;
    static parseOpositeRna(b: string): RNA;
    static parseDna(b: DNA): string;
    static parseDna(b: string): DNA;
    static parseOpositeDna(b: DNA): string;
    static parseOpositeDna(b: string): DNA;
    static parseAA(amino: string): string;
    static parseAA(codons: Array<Codon>): Array<string>;
    static parseAA(codon: Codon): string;
    static parseAA(amino: string): Array<Codon>;
}
