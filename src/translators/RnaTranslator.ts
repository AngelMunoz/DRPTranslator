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

    public transRNAtoAA(dna:string):string {
        // TODO: Implement DNA -> DNA logic
        throw "Not implemented exception";
    }

    public findStarts(rna:string):number[] {
      var startsPos:number[] = [];
      var start = rna.indexOf('AUG');

      while (start !== -1) {
        start = rna.toUpperCase().indexOf('AUG', start + 1);
        startsPos.push(start);
      }

      return startsPos;

    }

    public findStops(rna:string):number[] {
      var stopsPos:number[] = [];
      var stop1 = rna.indexOf('UAA');
      var stop2 = rna.indexOf('UAG');
      var stop3 = rna.indexOf('UGA');

      while (stop1 !== -1) {
        stop1 = rna.toUpperCase().indexOf('UAA', stop1 + 1);
        stopsPos.push(stop1);
      }
      while (stop2 !== -1) {
        stop2 = rna.toUpperCase().indexOf('UAG', stop2 + 1);
        stopsPos.push(stop1);
      }
      while (stop3 !== -1) {
        stop3 = rna.toUpperCase().indexOf('UGA', stop3 + 1);
        stopsPos.push(stop1);
      }
      return stopsPos;
    }

    private rnaToCodonArray(rna:string):Codon[] {
        throw "Not implemented exception"
    }

    private matchRnaBase(b):RNA {
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
    private matchOpositeRnaBase(b:RNA):RNA {
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

    private rnaToString(rna:RNA[]):string{
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
