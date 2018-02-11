import { RNA } from './symbols/rna';
import { DNA } from './symbols/dna';
import { Codon } from './symbols/codon';
import { DNATranslator } from './translators/dna.translator';
import { RNATranslator } from './translators/rna.translator';
declare const _default: {
    Translators: {
        DNATranslator: typeof DNATranslator;
        RNATranslator: typeof RNATranslator;
    };
    RNA: typeof RNA;
    DNA: typeof DNA;
    Codon: typeof Codon;
};
export default _default;
