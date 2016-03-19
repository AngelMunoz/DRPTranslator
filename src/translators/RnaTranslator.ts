"use strict";
import symbols = require('../symbols/Symbols');
import codon = require("../symbols/Codon");
import DNA = symbols.DNA;
import RNA = symbols.RNA;
import Codon = codon.Codon;

export class RNATranslator {

    public transRNAtoDNA(rna:string):string {
        var rnaArr:RNA[] = [];
        for(var i = 0; i < rna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(
                          this.matchRnaBase(
                            rna.toUpperCase().charAt(i)
                          ));
        }
        var rnaStr = this.rnaToString(rnaArr);
        return rnaStr.replace(/U/g, "T");
    }

    public transRNAtoAA(rna:string):string {
        var cod = new Codon();
        var codons = this.rnaToCodonArray(rna.toUpperCase());
        return Codon.getCodonChain(codons);
    }

    public findStarts(rna:string):number[] {
      var startsPos:number[] = [];
      var start = rna.indexOf('AUG');
      if (start !== -1)
        startsPos.push(start);

      while (start !== -1) {
        start = rna.toUpperCase().indexOf('AUG', start + 1);
        if (start !== -1){
          startsPos.push(start);
        }
        else {
          break;
        }
      }

      return startsPos;

    }

    public findStops(rna:string):number[] {
      var stopsPos:number[] = [];
      var stop1 = rna.indexOf('UAA');
      var stop2 = rna.indexOf('UAG');
      var stop3 = rna.indexOf('UGA');

      if (stop1 !== -1)
        stopsPos.push(stop1)
      if (stop2 !== -1)
        stopsPos.push(stop2)
      if (stop3 !== -1)
        stopsPos.push(stop3)

      while (stop1 !== -1) {
        stop1 = rna.toUpperCase().indexOf('UAA', stop1 + 1);
        if (stop1 !== -1){
          stopsPos.push(stop1);
        }
        else {
          break;
        }
      }
      while (stop2 !== -1) {
        stop2 = rna.toUpperCase().indexOf('UAG', stop2 + 1);
        if (stop2 !== -1){
          stopsPos.push(stop2);
        }
        else {
          break;
        }
      }
      while (stop3 !== -1) {
        stop3 = rna.toUpperCase().indexOf('UGA', stop3 + 1);
        if (stop3 !== -1){
          stopsPos.push(stop3);
        }
        else {
          break;
        }
      }
      return stopsPos;
    }

    public rnaToCodonArray(rna:string):Codon[] {

        var codons = [];
        var rnaSeq = this.findSeqStartAndStop(rna);
        var chopedSeq = rnaSeq.match(/.{3}/g);
        chopedSeq.forEach((codStr) => {
            var a = this.matchRnaBase(codStr.charAt(0));
            var b = this.matchRnaBase(codStr.charAt(1));
            var c = this.matchRnaBase(codStr.charAt(2));
            var cod = new Codon(a,b,c);
            codons.push(cod);
        });
        return codons;
    }

    public findSeqStartAndStop(rna:string):string {
      var starts:number[] = [];
      var stops:number[] = [];
      var seq:string;
      starts = this.findStarts(rna);
      stops = this.findStops(rna);
      seq = rna.substring(starts[0] || 0, stops[0]+3 || rna.length);
      return seq;
    }

    public matchRnaBase(b):RNA {
      switch(b) {
        case 'A':
          return RNA.A
        case 'U':
          return RNA.U;
        case 'G':
          return RNA.G;
        case 'C':
          return RNA.C;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public matchOpositeRnaBase(b:RNA):RNA {
      switch(b) {
        case RNA.A:
          return RNA.U;
        case RNA.U:
          return RNA.A;
        case RNA.G:
          return RNA.C;
        case RNA.C:
          return RNA.G;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public rnaToString(rna:RNA[]):string{
      var dnaStr:string = "";
      rna.forEach((base) => {
        switch(base) {
          case RNA.A:
            dnaStr += 'A';
            break;
          case RNA.U:
            dnaStr += 'U';
            break;
          case RNA.G:
            dnaStr += 'G';
            break;
          case RNA.C:
            dnaStr += 'C';
            break;
          default:
            throw new TypeError("Invalid character");
        }
      });
      return dnaStr;
    }
}
