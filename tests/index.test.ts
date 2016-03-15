/// <reference path="../typings/main.d.ts"/>
/// <reference path="../src/index.ts"/>

import chai = require("chai");
import codon = require('../src/symbols/Codon');
import symbols = require("../src/symbols/Symbols");
var expect = chai.expect;
var should = chai.should();
var RNA = symbols.RNA;
var Codon = codon.Codon;

describe('Codon Tests', () => {
    it('Codon array should return a matching codon string', () => {
        // codon.getCodonChain(codons:Codon[]);
        var cod1 = new Codon(RNA.U,RNA.A, RNA.G);
        var cod2 = new Codon(RNA.U,RNA.U, RNA.A);
        var cod3 = new Codon(RNA.G,RNA.C, RNA.C);
        var codArr = [cod1,cod2,cod3];
        var rnaSeq = Codon.getCodonChain(codArr);
        rnaSeq.should.equal("STOP-Leu-Ala");
    });
    it("codon.setCodon() should set a new codon",() => {
        // codon.setCodon(fp:RNA,sp:RNA,tp:RNA);
        var cod1 = new Codon(RNA.G,RNA.C, RNA.C);
        var cod1AA = Codon.matchCodon(cod1);
        cod1AA.should.equal("Ala");
        cod1.setCodon(RNA.U,RNA.U, RNA.A);
        var cod1AA2 = Codon.matchCodon(cod1);
        cod1AA2.should.equal("Leu");
    });
});
