/// <reference path="../typings/index.d.ts" />
import * as chai from 'chai';
import { Codon } from '../src/symbols/codon';
import { RNA } from '../src/symbols/rna';
import { DNATranslator } from '../src/translators/dna.translator';
import { RNATranslator } from '../src/translators/rna.translator';
const should = chai.should();
const expect = chai.expect;

describe('Codon Tests', () => {
  it('Codon.getCodonChain should return a matching codon string', () => {
    // codon.getCodonChain(codons:Codon[]);
    let cod1 = new Codon(RNA.U, RNA.A, RNA.G);
    let cod2 = new Codon(RNA.U, RNA.U, RNA.A);
    let cod3 = new Codon(RNA.G, RNA.C, RNA.C);
    let codArr = [cod1, cod2, cod3];
    let rnaSeq = Codon.getCodonChain(codArr);
    let expectedSeq = "STOP-Leu-Ala";
    rnaSeq.should.equal(expectedSeq);
  });
  it("codon.setCodon should set a new codon", () => {
    // codon.setCodon(fp:RNA,sp:RNA,tp:RNA);
    let cod1 = new Codon(RNA.G, RNA.C, RNA.C);
    let cod1AA = Codon.matchCodon(cod1);
    let expectedCod1 = "Ala";
    cod1AA.should.equal(expectedCod1);
    cod1.setCodon(RNA.U, RNA.U, RNA.A);
    let cod1AA2 = Codon.matchCodon(cod1);
    let expectedCod2 = "Leu";
    cod1AA2.should.equal(expectedCod2);
  });
  it("codon.matchCodon should return a matching AA", () => {
    let cod1 = new Codon(RNA.G, RNA.C, RNA.C);
    let cod1AA = Codon.matchCodon(cod1);
    let expectedCod1 = "Ala";
    cod1AA.should.equal(expectedCod1);
  });
});

describe("DNATranslator Tests", () => {
  it("transDNAtoDNA should return the matching complementary DNA sequence", () => {
    let dnaTrans = new DNATranslator();
    let dnaSeq = "ATGCCAGTCGATCG";
    let expectedDnaSeq = "TACGGTCAGCTAGC";
    let transDnaSeq = dnaTrans.transDNAtoDNA(dnaSeq);
    transDnaSeq.should.equal(expectedDnaSeq);
  });
  it("transDNAtoRNA should return the matching complementary RNA sequence", () => {
    let dnaTrans = new DNATranslator();
    let dnaSeq = "ATGCCAGTCGATCG";
    let expectedRnaSeq = "UACGGUCAGCUAGC";
    let transRnaSeq = dnaTrans.transDNAtoRNA(dnaSeq);
    transRnaSeq.should.equal(expectedRnaSeq);
  });
  it("transDNAtoAA should return the matching complementary AA sequence", () => {
    let dnaTrans = new DNATranslator();
    let dnaSeq = "TACCCAGTCGATACT"; // rna AUG GGU CAG CUA UGA
    let expectedAASeq = "Met-Gly-Gln-Leu-STOP";
    let transRnaSeq = dnaTrans.transDNAtoAA(dnaSeq);
    transRnaSeq.should.equal(expectedAASeq);
  });
  describe("RNATranslator Tests", () => {
    it("transRNAtoDNA should return the matching DNA sequence", () => {
      let rnaTrans = new RNATranslator();
      let rnaSeq = "AUGCUGCUUUAG";
      let expectedRnaSeq = "TACGACGAAATC";
      let transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
      transRnaSeq.should.equal(expectedRnaSeq);
    });
    it("transRNAtoAA should return the matching AA sequence", () => {
      let rnaSeq = "AUGCUGCUUUAG";// Met-Leu-Leu-STOP
      let rnaTrans = new RNATranslator();
      let expectedArr = [new Codon(RNA.A, RNA.U, RNA.G),
      new Codon(RNA.C, RNA.U, RNA.G),
      new Codon(RNA.C, RNA.U, RNA.U),
      new Codon(RNA.U, RNA.A, RNA.G)];
      let rnaCodArray = rnaTrans.rnaToCodonArray(rnaSeq);
      expect(rnaCodArray).to.eql(expectedArr);
    });
    it("findStarts should return an array with the index of start sequences", () => {
      let rnaTrans = new RNATranslator();
      let threeStarts = "AUGUUGCUUAUGAAUAUG"; // 0, 9, 15
      let sevenStarts = "AUGUUGCUUAUGAAUAUGCUUAUAAUGAUGAUG"; // 0, 9, 15, 24, 27, 30
      let oneStart = "AUGUUGCUUUGGAAUUCA"; // 0
      let noneStart = "ACGUUCGAC";
      let expectedThree = [0, 9, 15];
      let expectedSeven = [0, 9, 15, 24, 27, 30];
      let expectedOne = [0];
      let expectedNone = [];
      expect(rnaTrans.findStarts(threeStarts)).to.eql(expectedThree);
      expect(rnaTrans.findStarts(sevenStarts)).to.eql(expectedSeven);
      expect(rnaTrans.findStarts(oneStart)).to.eql(expectedOne);
      expect(rnaTrans.findStarts(noneStart)).to.eql(expectedNone);
    });
    it("findStops should return an array with the index of stop sequences", () => {
      let rnaTrans = new RNATranslator();
      let threeStops = "UAAUUGCUUUAGAAUUGA"; // 0, 9, 15
      let fiveStops = "UAAUUGCUUUAGAAUUGACUUAUAUAAUAGUGA"; // 0, 9, 15, 24, 27,30
      let oneStop = "UAAUUGCUUUGGAAUUCA"; // 0
      let noneStop = "UACGCGCGCAUCCGCG"; // []
      let expectedThree = [0, 9, 15];
      let expectedFive = [0, 9, 15, 24, 27, 30];
      let expectedOne = [0];
      let expectedNone = [];
      expect(rnaTrans.findStops(threeStops)).to.eql(expectedThree);
      expect(rnaTrans.findStops(fiveStops)).to.eql(expectedFive);
      expect(rnaTrans.findStops(oneStop)).to.eql(expectedOne);
      expect(rnaTrans.findStops(noneStop)).to.eql(expectedNone);
    });
    it("rnaToCodonArray should return a matching RNA->Codon array", () => {
      let rnaTrans = new RNATranslator();
      let dnaSeq = "AUGGGUCAGCUAUGA"; // rna TAC CCA GTC GAT ACT
      let expectedAASeq = "Met-Gly-Gln-Leu-STOP";
      let transRnaSeq = rnaTrans.transRNAtoAA(dnaSeq);
      transRnaSeq.should.equal(expectedAASeq);
    });
    it("findSeqStartAndStop return a sequence beggining with a start and ending with a stop", () => {
      let rnaTrans = new RNATranslator();
      let rnaSeqTT = "AUGCUGCUUUAG"; // true true 0,9
      let rnaSeqTF = "AUGCUGCUUUUU"; // true false 0
      let rnaSeqFT = "UGGCUGCUUUAG"; // false true 9
      let rnaSeqFF = "UGGCUGCUUCCC"; // false false 0,0
      expect(rnaTrans.findSeqStartAndStop(rnaSeqTT)).to.include("AUG", "UAG");

      expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.include("AUG");
      expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.not.include("UAG");

      expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.include("UAG");
      expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.not.include("AUG");


      expect(rnaTrans.findSeqStartAndStop(rnaSeqFF)).to.not.include("AUG", "UAG");
    });
  });

