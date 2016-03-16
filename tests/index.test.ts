/// <reference path="../typings/main.d.ts"/>
/// <reference path="../src/index.ts"/>

import chai = require("chai");
import codon = require('../src/symbols/Codon');
import symbols = require("../src/symbols/Symbols");
import dnatranslator = require("../src/translators/DnaTranslator");
import rnatranslator = require("../src/translators/RnaTranslator");

var expect = chai.expect;
var should = chai.should();
var RNA = symbols.RNA;
var Codon = codon.Codon;
var DNATranslator = dnatranslator.DNATranslator;
var RNATranslator = rnatranslator.RNATranslator;

describe('Codon Tests', () => {
    it('Codon.getCodonChain should return a matching codon string', () => {
        // codon.getCodonChain(codons:Codon[]);
        var cod1 = new Codon(RNA.U,RNA.A, RNA.G);
        var cod2 = new Codon(RNA.U,RNA.U, RNA.A);
        var cod3 = new Codon(RNA.G,RNA.C, RNA.C);
        var codArr = [cod1,cod2,cod3];
        var rnaSeq = Codon.getCodonChain(codArr);
        var expectedSeq = "STOP-Leu-Ala";
        rnaSeq.should.equal(expectedSeq);
    });
    it("codon.setCodon should set a new codon",() => {
        // codon.setCodon(fp:RNA,sp:RNA,tp:RNA);
        var cod1 = new Codon(RNA.G,RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        var expectedCod1 = "Ala";
        cod1AA.should.equal(expectedCod1);
        cod1.setCodon(RNA.U,RNA.U, RNA.A);
        var cod1AA2 = Codon.matchCodon(cod1);
        var expectedCod2 = "Leu";
        cod1AA2.should.equal(expectedCod2);
    });
});

describe("DNATranslator Tests",() =>{
  it("getRnatranslator should return an instance of RNATranslator class",() =>{
    var dnaTrans = new DNATranslator();
    expect(dnaTrans.rnaTranslator).to.be.an.instanceof(RNATranslator);
  });
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
    var transRnaSeq = dnaTrans.tansDNAtoRNA(dnaSeq);
    transRnaSeq.should.equal(expectedRnaSeq);
  });
});

describe("RNATranslator Tests",()=> {
  it("transRNAtoDNA should return the matching DNA sequence",() =>{
    var rnaTrans = new RNATranslator();
    var rnaSeq = "AUGCUGCUUUAG";
    var expectedRnaSeq = "TACGACGAAATC"
    var transRnaSeq = rnaTrans.transRNAtoDNA(rnaSeq);
    transRnaSeq.should.equal(expectedRnaSeq);
  });
  it("findStarts should return an array with the index of start sequences",() =>{

  });
  it("findStops should return an array with the index of stop sequences",() =>{

  });
});
