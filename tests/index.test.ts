/// <reference path="../typings/main.d.ts"/>
import chai = require("chai");
var expect = chai.expect;
var should = chai.should();
import {Codon} from "../src/symbols/Codon";
import {RNA} from "../src/symbols/Symbols";
import {RNATranslator} from "../src/translators/RnaTranslator";
import {DNATranslator} from "../src/translators/DnaTranslator";
import {Matcher} from "../src/Matcher";

describe("MatcherTests", () =>{
  it("ParseRna Equivalent String to RNA", () => {
    var expected = RNA.A;
    var result = Matcher.parseRna("A");
    result.should.equal(expected);
  });
  it("ParseRna Equivalent RNA to String", () => {
    var expected = "A";
    var result = Matcher.parseRna(RNA.A);
    result.should.equal(expected);
  });
});

describe('Codon Tests', () => {
    it('Codon.getCodonChain should return a matching codon string', () => {
        // codon.getCodonChain(codons:Codon[]);
        var cod1 = new Codon(RNA.U,RNA.A, RNA.G);
        var cod2 = new Codon(RNA.U,RNA.U, RNA.A);
        var cod3 = new Codon(RNA.G,RNA.C, RNA.C);
        var codArr = [cod1,cod2,cod3];
        var rnaSeq = Codon.getCodonChain(codArr);
        var expectedSeq = "STOP-LEU-ALA";
        rnaSeq.should.equal(expectedSeq);
    });
    it("codon.setCodon should set a new codon",() => {
        // codon.setCodon(fp:RNA,sp:RNA,tp:RNA);
        var cod1 = new Codon(RNA.G,RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        var expectedCod1 = "ALA";
        cod1AA.should.equal(expectedCod1);
        cod1.setCodon(RNA.U,RNA.U, RNA.A);
        var cod1AA2 = Codon.matchCodon(cod1);
        var expectedCod2 = "LEU";
        cod1AA2.should.equal(expectedCod2);
    });
    it("codon.matchCodon should return a matching AA",()=>{
        var cod1 = new Codon(RNA.G,RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        var expectedCod1 = "ALA";
        cod1AA.should.equal(expectedCod1);
    });
});

describe("DNATranslator Tests",() =>{
  it("transDNAtoDNA should return the matching complementary DNA sequence",() =>{
    var dnaTrans = new DNATranslator();
    var dnaSeq = "ATGCCAGTCGATCG";
    var expectedDnaSeq = "TACGGTCAGCTAGC";
    var transDnaSeq = dnaTrans.transDNAtoDNA(dnaSeq);
    transDnaSeq.should.equal(expectedDnaSeq);
  });
  it("transDNAtoRNA should return the matching complementary RNA sequence",() =>{
    var dnaTrans = new DNATranslator();
    var dnaSeq = "ATGCCAGTCGATCG";
    var expectedRnaSeq = "UACGGUCAGCUAGC";
    var transRnaSeq = dnaTrans.transDNAtoRNA(dnaSeq);
    transRnaSeq.should.equal(expectedRnaSeq);
  });
  it("transDNAtoAA should return the matching complementary AA sequence",() =>{
    var dnaTrans = new DNATranslator();
    var dnaSeq = "TACCCAGTCGATACT"; // rna AUG GGU CAG CUA UGA
    var expectedAASeq = "MET-GLY-GLN-LEU-STOP";
    var transRnaSeq = dnaTrans.transDNAtoAA(dnaSeq);
    transRnaSeq.should.equal(expectedAASeq);
  });
});

describe("RNATranslator Tests",()=> {
  it("transRNAtoDNA should return the matching DNA sequence",() =>{
    var rnaTrans = new RNATranslator();
    var rnaSeq = "AUGCUGCUUUAG";
    var expectedRnaSeq = "TACGACGAAATC";
    var transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
    transRnaSeq.should.equal(expectedRnaSeq);
  });
  it("transRNAtoAA should return the matching AA sequence",()=>{
      var rnaSeq = "AUGCUGCUUUAG";// MET-LEU-LEU-STOP
      var rnaTrans = new RNATranslator();
      var expectedArr = [new Codon(RNA.A, RNA.U, RNA.G),
                         new Codon(RNA.C, RNA.U, RNA.G),
                         new Codon(RNA.C, RNA.U, RNA.U),
                         new Codon(RNA.U, RNA.A, RNA.G)]
      var rnaCodArray = rnaTrans.rnaToCodonArray(rnaSeq);
      expect(rnaCodArray).to.eql(expectedArr);
  });
  it("findStarts should return an array with the index of start sequences",() =>{
    var rnaTrans = new RNATranslator();
    var threeStarts = "AUGUUGCUUAUGAAUAUG"; // 0, 9, 15
    var sevenStarts = "AUGUUGCUUAUGAAUAUGCUUAUAAUGAUGAUG"; // 0, 9, 15, 24, 27, 30
    var oneStart = "AUGUUGCUUUGGAAUUCA"; // 0
    var noneStart = "ACGUUCGAC";
    var expectedThree = [0,9,15];
    var expectedSeven = [0, 9, 15, 24, 27, 30];
    var expectedOne = [0];
    var expectedNone = [];
    expect(rnaTrans.findStarts(threeStarts)).to.eql(expectedThree);
    expect(rnaTrans.findStarts(sevenStarts)).to.eql(expectedSeven);
    expect(rnaTrans.findStarts(oneStart)).to.eql(expectedOne);
    expect(rnaTrans.findStarts(noneStart)).to.eql(expectedNone);
  });
  it("findStops should return an array with the index of stop sequences",() =>{
    var rnaTrans = new RNATranslator();
    var threeStops = "UAAUUGCUUUAGAAUUGA"; // 0, 9, 15
    var fiveStops = "UAAUUGCUUUAGAAUUGACUUAUAUAAUAGUGA"; // 0, 9, 15, 24, 27,30
    var oneStop = "UAAUUGCUUUGGAAUUCA"; // 0
    var noneStop = "UACGCGCGCAUCCGCG"; // []
    var expectedThree = [0,9,15];
    var expectedFive = [0, 9, 15, 24, 27,30];
    var expectedOne = [0];
    var expectedNone = [];
    expect(rnaTrans.findStops(threeStops)).to.eql(expectedThree);
    expect(rnaTrans.findStops(fiveStops)).to.eql(expectedFive);
    expect(rnaTrans.findStops(oneStop)).to.eql(expectedOne);
    expect(rnaTrans.findStops(noneStop)).to.eql(expectedNone);
  });
  it("rnaToCodonArray should return a matching RNA->Codon array",()=>{
      var rnaTrans = new RNATranslator();
      var dnaSeq = "AUGGGUCAGCUAUGA"; // rna TAC CCA GTC GAT ACT
      var expectedAASeq = "MET-GLY-GLN-LEU-STOP";
      var transRnaSeq = rnaTrans.transRNAtoAA(dnaSeq);
      transRnaSeq.should.equal(expectedAASeq);
  });
  it("findSeqStartAndStop return a sequence beggining with a start and ending with a stop",()=>{
      var rnaTrans = new RNATranslator();
      var rnaSeqTT = "AUGCUGCUUUAG"; // true true 0,9
      var rnaSeqTF = "AUGCUGCUUUUU"; // true false 0
      var rnaSeqFT = "UGGCUGCUUUAG"; // false true 9
      var rnaSeqFF = "UGGCUGCUUCCC"; // false false 0,0
      expect(rnaTrans.findSeqStartAndStop(rnaSeqTT)).to.include("AUG", "UAG");

      expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.include("AUG");
      expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.not.include("UAG");

      expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.include("UAG");
      expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.not.include("AUG");

      expect(rnaTrans.findSeqStartAndStop(rnaSeqFF)).to.not.include("AUG", "UAG");
  });
});
