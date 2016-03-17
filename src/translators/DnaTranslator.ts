/// <reference path="../symbols/Symbols.ts"/>
/// <reference path="./RnaTranslator.ts"/>
"use strict";
import rnatranslator = require("./RnaTranslator");
import symbols = require("../symbols/Symbols");
import DNA = symbols.DNA;
import RNA = symbols.RNA;
import RNATranslator = rnatranslator.RNATranslator;

export class DNATranslator {
    private _rnaTranslator:RNATranslator;

    constructor() {
      this._rnaTranslator = new RNATranslator();
    }

    get rnaTranslator() {
      return this._rnaTranslator
    }

    public transDNAtoDNA(dna:string):string {
        var dnaArr:DNA[] = [];
        for(var i = 0; i < dna.length;i++) {
          dnaArr[i] = this.matchOpositeDnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.dnaToString(dnaArr);
    }

    public transDNAtoRNA(dna:string):string {
        var rnaArr:RNA[] = [];
        for(var i = 0; i < dna.length;i++) {
          rnaArr[i] = this.matchOpositeRnaBase(this.matchDnaBase(dna.toUpperCase().charAt(i)));
        }
        return this.rnaToString(rnaArr);

    }

    public transDNAtoAA(dna:string):string {
        var rnaSeq = this.transDNAtoRNA(dna);
        return this.rnaTranslator.transRNAtoAA(rnaSeq);
    }

    public matchRnaBase(b):RNA {
      switch(b) {
        case 'A':
          return RNA.A
        case 'T':
          return RNA.U;
        case 'G':
          return RNA.G;
        case 'C':
          return RNA.C;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public matchOpositeRnaBase(b:DNA):RNA {
      switch(b) {
        case DNA.A:
          return RNA.U;
        case DNA.T:
          return RNA.A;
        case DNA.G:
          return RNA.C;
        case DNA.C:
          return RNA.G;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public rnaToString(dna:RNA[]):string{
      var dnaStr:string = "";
      dna.forEach((base) => {
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

    public matchDnaBase(b):DNA {
      switch(b) {
        case 'A':
          return DNA.A
        case 'T':
          return DNA.T;
        case 'G':
          return DNA.G;
        case 'C':
          return DNA.C;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public matchOpositeDnaBase(b:DNA):DNA {
      switch(b) {
        case DNA.A:
          return DNA.T;
        case DNA.T:
          return DNA.A;
        case DNA.G:
          return DNA.C;
        case DNA.C:
          return DNA.G;
        default:
          throw new TypeError("Invalid character");
      }
    }

    public dnaToString(dna:DNA[]):string{
      var dnaStr:string = "";
      dna.forEach((base) => {
        switch(base) {
          case DNA.A:
            dnaStr += 'A';
            break;
          case DNA.T:
            dnaStr += 'T';
            break;
          case DNA.G:
            dnaStr += 'G';
            break;
          case DNA.C:
            dnaStr += 'C';
            break;
          default:
            throw new TypeError("Invalid character");
        }
      });
      return dnaStr;
    }

}
