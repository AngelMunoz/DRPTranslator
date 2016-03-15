"use strict";
import symbols = require('./Symbols');
import RNA = symbols.RNA;

export class Codon {
    private _fp:RNA;
    private _sp:RNA;
    private _tp:RNA;

    constructor(fp?:RNA, sp?:RNA, tp?:RNA) {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }

    get fp() {
        return this._fp;
    }
    set fp(base:RNA) {
        this._fp = base;
    }
    get sp() {
        return this._sp;
    }
    set sp(base:RNA) {
        this._sp = base;
    }
    get tp() {
        return this._tp;
    }
    set tp(base:RNA) {
        this._tp = base;
    }

    public getCodon():string {
        // TODO: Implement Codon logic
        throw "Not Implemented Exception";
    }

    public setCodon(fp:RNA,sp:RNA,tp:RNA):void {
        this._fp = fp;
        this._sp = sp;
        this._tp = tp;
    }

    public getCodonChain(codons:Codon[]):string {
        // TODO: implement codon chain logic
        throw "Not Implemented Exception";
    }

    private matchCodon(codon:string):Codon {
        throw "Not implemented Exception";
    }
}
