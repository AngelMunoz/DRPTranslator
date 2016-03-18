"use strict";
var chai = require("chai");
var codon = require('../src/symbols/Codon');
var symbols = require("../src/symbols/Symbols");
var dnatranslator = require("../src/translators/DnaTranslator");
var rnatranslator = require("../src/translators/RnaTranslator");
var expect = chai.expect;
var should = chai.should();
var RNA = symbols.RNA;
var Codon = codon.Codon;
var DNATranslator = dnatranslator.DNATranslator;
var RNATranslator = rnatranslator.RNATranslator;
describe('Codon Tests', function () {
    it('Codon.getCodonChain should return a matching codon string', function () {
        var cod1 = new Codon(RNA.U, RNA.A, RNA.G);
        var cod2 = new Codon(RNA.U, RNA.U, RNA.A);
        var cod3 = new Codon(RNA.G, RNA.C, RNA.C);
        var codArr = [cod1, cod2, cod3];
        var rnaSeq = Codon.getCodonChain(codArr);
        var expectedSeq = "STOP-Leu-Ala";
        rnaSeq.should.equal(expectedSeq);
    });
    it("codon.setCodon should set a new codon", function () {
        var cod1 = new Codon(RNA.G, RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        var expectedCod1 = "Ala";
        cod1AA.should.equal(expectedCod1);
        cod1.setCodon(RNA.U, RNA.U, RNA.A);
        var cod1AA2 = Codon.matchCodon(cod1);
        var expectedCod2 = "Leu";
        cod1AA2.should.equal(expectedCod2);
    });
    it("codon.matchCodon should return a matching AA", function () {
        var cod1 = new Codon(RNA.G, RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        var expectedCod1 = "Ala";
        cod1AA.should.equal(expectedCod1);
    });
});
describe("DNATranslator Tests", function () {
    it("getRnatranslator should return an instance of RNATranslator class", function () {
        var dnaTrans = new DNATranslator();
        expect(dnaTrans.rnaTranslator).to.be.an.instanceof(RNATranslator);
    });
    it("transDNAtoDNA should return the matching complementary DNA sequence", function () {
        var dnaTrans = new DNATranslator();
        var dnaSeq = "ATGCCAGTCGATCG";
        var expectedDnaSeq = "TACGGTCAGCTAGC";
        var transDnaSeq = dnaTrans.transDNAtoDNA(dnaSeq);
        transDnaSeq.should.equal(expectedDnaSeq);
    });
    it("transDNAtoRNA should return the matching complementary RNA sequence", function () {
        var dnaTrans = new DNATranslator();
        var dnaSeq = "ATGCCAGTCGATCG";
        var expectedRnaSeq = "UACGGUCAGCUAGC";
        var transRnaSeq = dnaTrans.transDNAtoRNA(dnaSeq);
        transRnaSeq.should.equal(expectedRnaSeq);
    });
    it("transDNAtoAA should return the matching complementary AA sequence", function () {
        var dnaTrans = new DNATranslator();
        var dnaSeq = "TACCCAGTCGATACT";
        var expectedAASeq = "Met-Gly-Gln-Leu-STOP";
        var transRnaSeq = dnaTrans.transDNAtoAA(dnaSeq);
        transRnaSeq.should.equal(expectedAASeq);
    });
});
describe("RNATranslator Tests", function () {
    it("transRNAtoDNA should return the matching DNA sequence", function () {
        var rnaTrans = new RNATranslator();
        var rnaSeq = "AUGCUGCUUUAG";
        var expectedRnaSeq = "TACGACGAAATC";
        var transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
        transRnaSeq.should.equal(expectedRnaSeq);
    });
    it("transRNAtoAA should return the matching AA sequence", function () {
        var rnaSeq = "AUGCUGCUUUAG";
        var rnaTrans = new RNATranslator();
        var expectedArr = [new Codon(RNA.A, RNA.U, RNA.G),
            new Codon(RNA.C, RNA.U, RNA.G),
            new Codon(RNA.C, RNA.U, RNA.U),
            new Codon(RNA.U, RNA.A, RNA.G)];
        var rnaCodArray = rnaTrans.rnaToCodonArray(rnaSeq);
        expect(rnaCodArray).to.eql(expectedArr);
    });
    it("findStarts should return an array with the index of start sequences", function () {
        var rnaTrans = new RNATranslator();
        var threeStarts = "AUGUUGCUUAUGAAUAUG";
        var sevenStarts = "AUGUUGCUUAUGAAUAUGCUUAUAAUGAUGAUG";
        var oneStart = "AUGUUGCUUUGGAAUUCA";
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
        var rnaTrans = new RNATranslator();
        var threeStops = "UAAUUGCUUUAGAAUUGA";
        var fiveStops = "UAAUUGCUUUAGAAUUGACUUAUAUAAUAGUGA";
        var oneStop = "UAAUUGCUUUGGAAUUCA";
        var noneStop = "UACGCGCGCAUCCGCG";
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
        var rnaTrans = new RNATranslator();
        var dnaSeq = "AUGGGUCAGCUAUGA";
        var expectedAASeq = "Met-Gly-Gln-Leu-STOP";
        var transRnaSeq = rnaTrans.transRNAtoAA(dnaSeq);
        transRnaSeq.should.equal(expectedAASeq);
    });
    it("findSeqStartAndStop return a sequence beggining with a start and ending with a stop", function () {
        var rnaTrans = new RNATranslator();
        var rnaSeqTT = "AUGCUGCUUUAG";
        var rnaSeqTF = "AUGCUGCUUUUU";
        var rnaSeqFT = "UGGCUGCUUUAG";
        var rnaSeqFF = "UGGCUGCUUCCC";
        expect(rnaTrans.findSeqStartAndStop(rnaSeqTT)).to.include("AUG", "UAG");
        expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.include("AUG");
        expect(rnaTrans.findSeqStartAndStop(rnaSeqTF)).to.not.include("UAG");
        expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.include("UAG");
        expect(rnaTrans.findSeqStartAndStop(rnaSeqFT)).to.not.include("AUG");
        expect(rnaTrans.findSeqStartAndStop(rnaSeqFF)).to.not.include("AUG", "UAG");
    });
});
