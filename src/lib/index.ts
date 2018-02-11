import { RNA } from './symbols/rna';
import { DNA } from './symbols/dna';
import { Codon } from './symbols/codon';
import { DNATranslator } from './translators/dna.translator';
import { RNATranslator } from './translators/rna.translator';

export default {
  Translators: {
    DNATranslator,
    RNATranslator,
  },
  RNA,
  DNA,
  Codon
}