"use strict";
import symbols = require('../symbols/Codon');

export class RNATranslator {
    public static transRNAtoDNA(dna:string):string {
        // TODO: Implement DNA -> DNA logic
        throw "Not implemented exception";
    }
    public static transRNAtoAA(dna:string):string {
        // TODO: Implement DNA -> DNA logic
        throw "Not implemented exception";
    }
    public static findStarts(rna:string):number[] {
        throw "Not implemented exception";
    }
    public static findStops(rna:string):number[] {
        throw "Not implemented exception";
    }
    private static rnaToCodonArray(rna:string):symbols.Codon[] {
        throw "Not implemented exception"
    }

}
