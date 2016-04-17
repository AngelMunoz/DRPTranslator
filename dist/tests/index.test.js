"use strict";
/// <reference path="../typings/main.d.ts"/>
var chai = require("chai");
var expect = chai.expect;
var should = chai.should();
var Codon_1 = require("../src/symbols/Codon");
var Symbols_1 = require("../src/symbols/Symbols");
var RnaTranslator_1 = require("../src/translators/RnaTranslator");
var DnaTranslator_1 = require("../src/translators/DnaTranslator");
var Matcher_1 = require("../src/Matcher");
describe("MatcherTests", function () {
    it("ParseRna Equivalent String to RNA", function () {
        var expected = Symbols_1.RNA.A;
        var result = Matcher_1.Matcher.parseRna("A");
        result.should.equal(expected);
    });
    it("ParseRna Equivalent RNA to String", function () {
        var expected = "A";
        var result = Matcher_1.Matcher.parseRna(Symbols_1.RNA.A);
        result.should.equal(expected);
    });
});
describe('Codon Tests', function () {
    it('Codon.getCodonChain should return a matching codon string', function () {
        // codon.getCodonChain(codons:Codon[]);
        var cod1 = new Codon_1.Codon(Symbols_1.RNA.U, Symbols_1.RNA.A, Symbols_1.RNA.G);
        var cod2 = new Codon_1.Codon(Symbols_1.RNA.U, Symbols_1.RNA.U, Symbols_1.RNA.A);
        var cod3 = new Codon_1.Codon(Symbols_1.RNA.G, Symbols_1.RNA.C, Symbols_1.RNA.C);
        var codArr = [cod1, cod2, cod3];
        var rnaSeq = Codon_1.Codon.getCodonChain(codArr);
        var expectedSeq = "STOP-LEU-ALA";
        rnaSeq.should.equal(expectedSeq);
    });
    it("codon.setCodon should set a new codon", function () {
        // codon.setCodon(fp:RNA,sp:RNA,tp:RNA);
        var cod1 = new Codon_1.Codon(Symbols_1.RNA.G, Symbols_1.RNA.C, Symbols_1.RNA.C);
        var cod1AA = Codon_1.Codon.matchCodon(cod1);
        var expectedCod1 = "ALA";
        cod1AA.should.equal(expectedCod1);
        cod1.setCodon(Symbols_1.RNA.U, Symbols_1.RNA.U, Symbols_1.RNA.A);
        var cod1AA2 = Codon_1.Codon.matchCodon(cod1);
        var expectedCod2 = "LEU";
        cod1AA2.should.equal(expectedCod2);
    });
    it("codon.matchCodon should return a matching AA", function () {
        var cod1 = new Codon_1.Codon(Symbols_1.RNA.G, Symbols_1.RNA.C, Symbols_1.RNA.C);
        var cod1AA = Codon_1.Codon.matchCodon(cod1);
        var expectedCod1 = "ALA";
        cod1AA.should.equal(expectedCod1);
    });
});
describe("DNATranslator Tests", function () {
    it("transDNAtoDNA should return the matching complementary DNA sequence", function () {
        var dnaTrans = new DnaTranslator_1.DNATranslator();
        var dnaSeq = "ATGCCAGTCGATCG";
        var expectedDnaSeq = "TACGGTCAGCTAGC";
        var transDnaSeq = dnaTrans.transDNAtoDNA(dnaSeq);
        transDnaSeq.should.equal(expectedDnaSeq);
    });
    it("transDNAtoRNA should return the matching complementary RNA sequence", function () {
        var dnaTrans = new DnaTranslator_1.DNATranslator();
        var dnaSeq = "ATGCCAGTCGATCG";
        var expectedRnaSeq = "UACGGUCAGCUAGC";
        var transRnaSeq = dnaTrans.transDNAtoRNA(dnaSeq);
        transRnaSeq.should.equal(expectedRnaSeq);
    });
    it("transDNAtoAA should return the matching complementary AA sequence", function () {
        var dnaTrans = new DnaTranslator_1.DNATranslator();
        var dnaSeq = "TACCCAGTCGATACT"; // rna AUG GGU CAG CUA UGA
        var expectedAASeq = "MET-GLY-GLN-LEU-STOP";
        var transRnaSeq = dnaTrans.transDNAtoAA(dnaSeq);
        transRnaSeq.should.equal(expectedAASeq);
    });
});
describe("RNATranslator Tests", function () {
    it("transRNAtoDNA should return the matching DNA sequence", function () {
        var rnaTrans = new RnaTranslator_1.RNATranslator();
        var rnaSeq = "AUGCUGCUUUAG";
        var expectedRnaSeq = "TACGACGAAATC";
        var transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
        transRnaSeq.should.equal(expectedRnaSeq);
    });
    it("transRNAtoAA should return the matching AA sequence", function () {
        var rnaSeq = "AUGCUGCUUUAG"; // MET-LEU-LEU-STOP
        var rnaTrans = new RnaTranslator_1.RNATranslator();
        var expectedArr = [new Codon_1.Codon(Symbols_1.RNA.A, Symbols_1.RNA.U, Symbols_1.RNA.G),
            new Codon_1.Codon(Symbols_1.RNA.C, Symbols_1.RNA.U, Symbols_1.RNA.G),
            new Codon_1.Codon(Symbols_1.RNA.C, Symbols_1.RNA.U, Symbols_1.RNA.U),
            new Codon_1.Codon(Symbols_1.RNA.U, Symbols_1.RNA.A, Symbols_1.RNA.G)];
        var rnaCodArray = rnaTrans.rnaToCodonArray(rnaSeq);
        expect(rnaCodArray).to.eql(expectedArr);
    });
    it("findStarts should return an array with the index of start sequences", function () {
        var rnaTrans = new RnaTranslator_1.RNATranslator();
        var threeStarts = "AUGUUGCUUAUGAAUAUG"; // 0, 9, 15
        var sevenStarts = "AUGUUGCUUAUGAAUAUGCUUAUAAUGAUGAUG"; // 0, 9, 15, 24, 27, 30
        var oneStart = "AUGUUGCUUUGGAAUUCA"; // 0
        var noneStart = "ACGUUCGAC";
        var expectedThree = [0, 9, 15];
        var expectedSeven = [0, 9, 15, 24, 27, 30];
        var expectedOne = [0];
        var expectedNone = [];
        expect(rnaTrans.findStarts(threeStarts)).to.eql(expectedThree);
        expect(rnaTrans.findStarts(sevenStarts)).to.eql(expectedSeven);
        expect(rnaTrans.findStarts(oneStart)).to.eql(expectedOne);
        expect(rnaTrans.findStarts(noneStart)).to.eql(expectedNone);
    });
    it("findStops should return an array with the index of stop sequences", function () {
        var rnaTrans = new RnaTranslator_1.RNATranslator();
        var threeStops = "UAAUUGCUUUAGAAUUGA"; // 0, 9, 15
        var fiveStops = "UAAUUGCUUUAGAAUUGACUUAUAUAAUAGUGA"; // 0, 9, 15, 24, 27,30
        var oneStop = "UAAUUGCUUUGGAAUUCA"; // 0
        var noneStop = "UACGCGCGCAUCCGCG"; // []
        var expectedThree = [0, 9, 15];
        var expectedFive = [0, 9, 15, 24, 27, 30];
        var expectedOne = [0];
        var expectedNone = [];
        expect(rnaTrans.findStops(threeStops)).to.eql(expectedThree);
        expect(rnaTrans.findStops(fiveStops)).to.eql(expectedFive);
        expect(rnaTrans.findStops(oneStop)).to.eql(expectedOne);
        expect(rnaTrans.findStops(noneStop)).to.eql(expectedNone);
    });
    it("rnaToCodonArray should return a matching RNA->Codon array", function () {
        var rnaTrans = new RnaTranslator_1.RNATranslator();
        var dnaSeq = "AUGGGUCAGCUAUGA"; // rna TAC CCA GTC GAT ACT
        var expectedAASeq = "MET-GLY-GLN-LEU-STOP";
        var transRnaSeq = rnaTrans.transRNAtoAA(dnaSeq);
        transRnaSeq.should.equal(expectedAASeq);
    });
    it("findSeqStartAndStop return a sequence beggining with a start and ending with a stop", function () {
        var rnaTrans = new RnaTranslator_1.RNATranslator();
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
