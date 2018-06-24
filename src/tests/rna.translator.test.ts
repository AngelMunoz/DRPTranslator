import { should } from "fuse-test-runner";
import { Codon } from "../lib/symbols/codon";
import { RNA } from "../lib/symbols/rna";
import { RNATranslator } from "../lib/translators/rna.translator";

export class RNATranslatorTest {

  public "transRNAtoDNA should return the matching DNA sequence"() {
    const rnaTrans = new RNATranslator();
    const rnaSeq = "AUGCUGCUUUAG";
    const expectedRnaSeq = "TACGACGAAATC";
    const transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
    should(transRnaSeq).equal(expectedRnaSeq);
  }

  public "transRNAtoAA should return the matching AA sequence"() {
    const rnaSeq = "AUGCUGCUUUAG"; // Met-Leu-Leu-STOP
    const rnaTrans = new RNATranslator();
    const expectedArr = [
      new Codon(RNA.A, RNA.U, RNA.G),
      new Codon(RNA.C, RNA.U, RNA.G),
      new Codon(RNA.C, RNA.U, RNA.U),
      new Codon(RNA.U, RNA.A, RNA.G),
    ];
    const rnaCodArray = rnaTrans.rnaToCodonArray(rnaSeq);
    should(rnaCodArray).deepEqual(expectedArr);
  }

  public "findStarts should return an array with the index of start sequences"() {

    const rnaTrans = new RNATranslator();
    const threeStarts = "AUGUUGCUUAUGAAUAUG"; // 0, 9, 15
    const sevenStarts = "AUGUUGCUUAUGAAUAUGCUUAUAAUGAUGAUG"; // 0, 9, 15, 24, 27, 30
    const oneStart = "AUGUUGCUUUGGAAUUCA"; // 0
    const noneStart = "ACGUUCGAC";
    const expectedThree = [0, 9, 15];
    const expectedSeven = [0, 9, 15, 24, 27, 30];
    const expectedOne = [0];
    const expectedNone = [];
    should(rnaTrans.findStarts(threeStarts)).deepEqual(expectedThree);
    should(rnaTrans.findStarts(sevenStarts)).deepEqual(expectedSeven);
    should(rnaTrans.findStarts(oneStart)).deepEqual(expectedOne);
    should(rnaTrans.findStarts(noneStart)).deepEqual(expectedNone);
  }

  public "findStops should return an array with the index of stop sequences"() {
    const rnaTrans = new RNATranslator();
    const threeStops = "UAAUUGCUUUAGAAUUGA"; // 0, 9, 15
    const fiveStops = "UAAUUGCUUUAGAAUUGACUUAUAUAAUAGUGA"; // 0, 9, 15, 24, 27,30
    const oneStop = "UAAUUGCUUUGGAAUUCA"; // 0
    const noneStop = "UACGCGCGCAUCCGCG"; // []
    const expectedThree = [0, 9, 15];
    const expectedFive = [0, 9, 15, 24, 27, 30];
    const expectedOne = [0];
    const expectedNone = [];
    should(rnaTrans.findStops(threeStops)).deepEqual(expectedThree);
    should(rnaTrans.findStops(fiveStops)).deepEqual(expectedFive);
    should(rnaTrans.findStops(oneStop)).deepEqual(expectedOne);
    should(rnaTrans.findStops(noneStop)).deepEqual(expectedNone);
  }

  public "rnaToCodonArray should return a matching RNA->Codon array"() {
    const rnaTrans = new RNATranslator();
    const dnaSeq = "AUGGGUCAGCUAUGA"; // rna TAC CCA GTC GAT ACT
    const expectedAASeq = "Met-Gly-Gln-Leu-STOP";
    const transRnaSeq = rnaTrans.transRNAtoAA(dnaSeq);
    should(transRnaSeq).equal(expectedAASeq);
  }

  public "findSeqStartAndStop return a sequence beggining with a start and ending with a stop"() {
    const rnaTrans = new RNATranslator();
    const rnaSeqTT = "AUGCUGCUUUAG"; // true true 0,9
    const rnaSeqTF = "AUGCUGCUUUUU"; // true false 0
    const rnaSeqFT = "UGGCUGCUUUAG"; // false true 9
    const rnaSeqFF = "UGGCUGCUUCCC"; // false false 0,0
    should(rnaTrans.findSeqStartAndStop(rnaSeqTT))
      .findString("AUG")
      .findString("UAG");

    should(rnaTrans.findSeqStartAndStop(rnaSeqTF))
      .findString("AUG");

    should(rnaTrans.findSeqStartAndStop(rnaSeqTF))
      .notFindString("UAG");

    should(rnaTrans.findSeqStartAndStop(rnaSeqFT))
      .findString("UAG");

    should(rnaTrans.findSeqStartAndStop(rnaSeqFT))
      .notFindString("AUG");

    should(rnaTrans.findSeqStartAndStop(rnaSeqFF))
      .notFindString("AUG")
      .notFindString("UAG");
  }

}
