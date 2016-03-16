"use strict";
import symbols = require('../symbols/Codon');

export class RNATranslator {
    public transRNAtoDNA(dna:string):string {
        // TODO: Implement DNA -> DNA logic
        throw "Not implemented exception";
    }
    public transRNAtoAA(dna:string):string {
        // TODO: Implement DNA -> DNA logic
        throw "Not implemented exception";
    }
    public findStarts(rna:string):number[] {
        throw "Not implemented exception";
    }
    public findStops(rna:string):number[] {
        throw "Not implemented exception";
    }
    private rnaToCodonArray(rna:string):symbols.Codon[] {
        throw "Not implemented exception"
    }

}
