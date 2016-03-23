"use strict";
import symbols = require('../symbols/Symbols');
import codon = require("../symbols/Codon");
import DNA = symbols.DNA;
import RNA = symbols.RNA;
import Codon = codon.Codon;

/**
 * Specialized class that allows to translate and transcript RNA sequences
 */
export class RNATranslator {
    /**
     * @param {String} RNA sequence to be translated into a complementary chain of DNA.
     * @returns {String} The string returned is a complementary sequence of the provided.
     *
     * ```
     * UACGAU
     *
     * ATGCTA
     * ```
     */
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


    /**
     * @param {String} RNA sequence to be translated into a complementary chain of RNA
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * UACGAU
     *
     * AUGCUA
     * ```
     */
    public transRNAtoRNA(rna:string):string  {
        var rnaArr: RNA[] = [];
        for (var i = 0; i < rna.length; i++) {
            rnaArr[i] = this.matchOpositeRnaBase(
                this.matchRnaBase(
                    rna.toUpperCase().charAt(i)
                )
            )
                }
        var tempRnaRes = this.rnaToString(rnaArr);
        return tempRnaRes;
    }

    /**
     * This method is a quite tricky to implement, while some schools will say you have to
     * read all the chain with it's multiple stop codons, some will tell you there's only one start and stop codon
     * the new approach here is to let you decide whether you want to include all starts or all stops or both.
     *
     * @param {String} RNA sequence to be translated into a complementary chain of Aminoacids
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @returns {String} The string returned is a complementary sequence of the provided in the parameter
     *
     * ```
     * UACGAU
     *
     * Tyr-Asp
     * ```
     */
    public transRNAtoAA(rna:string, starts?:boolean, stops?:boolean):string {
        var codons = this.rnaToCodonArray(rna.toUpperCase(), starts, stops);
        return Codon.getCodonChain(codons);
    }

    /**
     * This method returns an array of positions where start sequences are
     * this method could be useful if you need to identify if ther are any repeated start codons in a sequence
     * or if you need to translate a sequence from different start codons.
     * @param {String} String RNA sequence that will be searched for Start sequences.
     * @return {Number []} Returns an array with the indexes of the start sequences ("AUG");
     */
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

    /**
     * This method will find any stop codons in a RNA string,
     * @param {String} string containing RNA characters.
     * @return {Number []} Returns an array with the indexes of the Stop codons ('UAA','UAG','UGA')
     */
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

    /**
     * Given a RNA string, this method will convert any codons available in the string
     * however this method will try to translate a sequence from the first start codon and the first STOP codon
     * Given `AGAUGCUGCUGCAGU` the string used for the translation will be `AUGCUGCUGCAGU`
     * or Given `AGAUGGUAUAGCUGCUGCAGU` the string for translation will be `AUGGUAUAG`
     * @param {String} RNA string that will be used for translation.
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @returns {Codon[]} Codon array that can be used to transcribe into an AA sequence
     */
    public rnaToCodonArray(rna:string, starts?:boolean, stops?:boolean):Codon[] {

        var codons = [];
        var rnaSeq = this.findSeqStartAndStop(rna, starts, stops);
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

    /**
     * Given a RNA string, this method will chop the RNA string
     * into the First Start and the First STOP codon's available in the string
     * Given `AGAUGCUGCUGCAGU` the string returned will be `AUGCUGCUGCAGU`
     * or Given `AGAUGGUAUAGCUGCUGCAGU` the string returned will be `AUGGUAUAG`
     * Given the case without any Start or STOP codons, the string will be unmodified.
     * **NEW**
     * The parameters start and stop have been added which in turn will let you decide whether
     * you want to include full starts or full stops, notice however that the sequence will be different
     * if you put starts=true & stops=true, for example:
     * ```JavaScript
     * findSeqStartAndStop("AAAAUGACGAUG", true); // starts = [3, 9] -> AUGACGAUG
     * findSeqStartAndStop("CGAUGCGUAUGCGCG", true) // starts = [2,8] -> AUGCGUAUGCGCG
     * findSeqStartAndStop("AAAAUGACGAUG", false); // starts = [] -> AAAAUGACGAUG
     * findSeqStartAndStop("CGAUGCGUAUGCGCG", false) // starts = [] -> CGAUGCGUAUGCGCG
     * ```
     * @param {String} RNA string that will be choped into a smaller sequence
     * @param {Boolean} Starts, tells the function if the sequence should be scanned for start codons
     * @param {Boolean} Stops, tells the function if the sequence should be scanned for stop codons
     * @return {String} Choped string containing the rna sequence ready to translate or transcript
     */
    public findSeqStartAndStop(rna:string, start=false, stop=false):string {
      var starts:number[] = [];
      var stops:number[] = [];
      var seq:string;

      if (start && stop) {
        starts = this.findStarts(rna);
        stops = this.findStops(rna);
        seq = rna.substring(starts[0] || 0, stops[0]+3 || rna.length);
      }
      else if(!start && stop) {
        stops = this.findStops(rna);
        seq = rna.substring(0, stops[0]+3 || rna.length);
      }
      else if(start && !stop){
        starts = this.findStarts(rna);
        seq = rna.substring(starts[0] || 0,rna.length);
      }
      else {
        seq = rna;
      }
      return seq;
    }

    /**
     * @param {String} One digit string (character) that is the base to be converted into the RNA enum.
     * @returns {RNA} Returns the corresponding RNA base.
     *
     */
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

    /**
     * @param {DNA} DNA base which needs to be replaced.
     * @returns {RNA} Returns a RNA base which is the oposite base of the DNA base provided.
     */
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

    /**
     * @param {RNA[]} RNA array containing the sequence to be parsed into a string.
     * @returns {String} String containing the RNA sequence provided.
     */
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
