import symbols = require('./Symbols');
import RNA = symbols.RNA;
export declare class Codon {
    private _fp;
    private _sp;
    private _tp;
    constructor(fp?: RNA, sp?: RNA, tp?: RNA);
    fp: RNA;
    sp: RNA;
    tp: RNA;
    setCodon(fp: RNA, sp: RNA, tp: RNA): void;
    static getCodonChain(codons: Codon[]): string;
    static matchCodon(codon: Codon): string;
}
