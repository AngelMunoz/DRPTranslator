import { should } from "fuse-test-runner";
import { Codon } from "../lib/symbols/codon";
import { RNA } from "../lib/symbols/rna";
import { DNATranslator } from "../lib/translators/dna.translator";

export class DNATranslatorTest {

  public "transDNAtoDNA should return the matching complementary DNA sequence"() {
    const dnaTrans = new DNATranslator();
    const dnaSeq = "ATGCCAGTCGATCG";
    const expectedDnaSeq = "TACGGTCAGCTAGC";
    const transDnaSeq = dnaTrans.transDNAtoOpositeDNA(dnaSeq);
    should(transDnaSeq).equal(expectedDnaSeq);
  }

  public "transDNAtoRNA should return the matching complementary RNA sequence"() {
    const dnaTrans = new DNATranslator();
    const dnaSeq = "ATGCCAGTCGATCG";
    const expectedRnaSeq = "UACGGUCAGCUAGC";
    const transRnaSeq = dnaTrans.transDNAtoRNA(dnaSeq);
    should(transRnaSeq).equal(expectedRnaSeq);
  }

  public "transDNAtoAA should return the matching complementary AA sequence"() {
    const dnaTrans = new DNATranslator();
    const dnaSeq = "TACCCAGTCGATACT"; // rna AUG GGU CAG CUA UGA
    const expectedAASeq = "Met-Gly-Gln-Leu-STOP";
    const transRnaSeq = dnaTrans.transDNAtoAA(dnaSeq);
    should(transRnaSeq).equal(expectedAASeq);
  }

}
