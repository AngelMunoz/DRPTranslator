"use strict";
import {DNA, RNA, AA} from "./symbols/Symbols";
import {Codon} from "./symbols/Codon";

export class Matcher {

    public static parseRna(b: RNA): string;
    public static parseRna(b: string): RNA;
    public static parseRna(b: any): any {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return RNA.A;
                case 'C':
                    return RNA.C;
                case 'U':
                    return RNA.U;
                case 'G':
                    return RNA.G;
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case RNA.A:
                    return 'A';
                case RNA.C:
                    return 'C';
                case RNA.U:
                    return 'U';
                case RNA.G:
                    return 'G';
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
    }

    public static parseOpositeRna(b: RNA): string;
    public static parseOpositeRna(b: string): RNA;
    public static parseOpositeRna(b: any): any {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return RNA.U;
                case 'C':
                    return RNA.G;
                case 'U':
                    return RNA.A;
                case 'G':
                    return RNA.C;
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case RNA.A:
                    return 'U';
                case RNA.C:
                    return 'G';
                case RNA.U:
                    return 'A';
                case RNA.G:
                    return 'C';
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
    }

    public static parseDna(b: DNA): string;
    public static parseDna(b: string): DNA;
    public static parseDna(b: any): any {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return DNA.A;
                case 'C':
                    return DNA.C;
                case 'T':
                    return DNA.T;
                case 'G':
                    return DNA.G;
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case DNA.A:
                    return 'A';
                case DNA.C:
                    return 'C';
                case DNA.T:
                    return 'T';
                case DNA.G:
                    return 'G';
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
    }

    public static parseOpositeDna(b: DNA): string;
    public static parseOpositeDna(b: string): DNA;
    public static parseOpositeDna(b: any): any {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return DNA.T;
                case 'C':
                    return DNA.G;
                case 'T':
                    return DNA.A;
                case 'G':
                    return DNA.C;
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case DNA.A:
                    return 'T';
                case DNA.C:
                    return 'G';
                case DNA.T:
                    return 'A';
                case DNA.G:
                    return 'C';
                default:
                    throw new Error(`Base: ${b} Is not a valid RNA Base`);
            }
        }
    }
    
    //TODO: Arreglar la implementacion para prevenir duplicados
    public static parseAA(amino:string):string;
    public static parseAA(codons:Array<Codon>):Array<string>;
    public static parseAA(codon:Codon):string;
    public static parseAA(amino:string):Array<Codon>;
    public static parseAA(param:any):any {
        throw new Error("Not Implemented");
    }
    
    
}