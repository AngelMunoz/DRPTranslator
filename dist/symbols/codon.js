(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./rna"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rna_1 = require("./rna");
    /**
     * A class that represents a codon object
     * a codon must have 3 bases to be able to be converted into an aminoacid
     * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
     */
    var Codon = /** @class */ (function () {
        /**
         * Codon constructor can optionaly accept it's RNA bases.
         *
         * @param fp First base of the codon
         * @param sp Second base of the codon
         * @param tp Third base of the codon
         * ```JavaScript
         * var cod = new Codon(RNA.A, RNA.U, RNA.G);
         * // OR
         * var cod = new Codon();
         * ```
         */
        function Codon(fp, sp, tp) {
            this._fp = fp;
            this._sp = sp;
            this._tp = tp;
        }
        Object.defineProperty(Codon.prototype, "fp", {
            /**
             * @returns {RNA} returns an Enum of the type: See [[RNA]]
             */
            get: function () {
                return this._fp;
            },
            set: function (base) {
                this._fp = base;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Codon.prototype, "sp", {
            /**
             * @returns {RNA} returns an Enum of the type: See [[RNA]]
             */
            get: function () {
                return this._sp;
            },
            /**
             * @returns {RNA} returns an Enum of the type: See [[RNA]]
             */
            set: function (base) {
                this._sp = base;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Codon.prototype, "tp", {
            get: function () {
                return this._tp;
            },
            /**
             * @return {RNA} returns an Enum of the type: See [[RNA]]
             */
            set: function (base) {
                this._tp = base;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets a new codon with the suplemented parameters
         * @param fp [[RNA]] Base
         * @param sp [[RNA]] Base
         * @param tp [[RNA]] Base
         */
        Codon.prototype.setCodon = function (fp, sp, tp) {
            this.fp = fp;
            this.sp = sp;
            this.tp = tp;
        };
        /**
         * Returns a string made with the matches of a [[Codon]] array
         * @static
         * @return {String}
         * ```JavaScript
         * var cod1 = new Codon(RNA.A,RNA.U,RNA.G);
         * var cod2 = new Codon(RNA.U,RNA.G,RNA.A);
         * var arr = [cod1,cod2];
         * var aaSeq = Codon.getCodonChain(arr);
         * console.log(aaSeq); // Met-STOP
         * ```
         */
        Codon.getCodonChain = function (codons) {
            var _this = this;
            var seq = "";
            codons.forEach(function (codon) {
                if (codons.indexOf(codon) === codons.length - 1) {
                    seq += "" + _this.matchCodon(codon);
                }
                else {
                    seq += _this.matchCodon(codon) + "-";
                }
            });
            return seq;
        };
        /**
         * Matches a [[Codon]] object with a string that represents
         * the matching AminoAcid based on the Central Dogma of Molecular Biology
         * @see https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table
         * @static
         * @return {String}
         * ```JavaScript
         * var cod = new Codon(RNA.A,RNA.U,RNA.G);
         * console.log(Codon.matchCodon(cod)); // Met
         * ```
         */
        Codon.matchCodon = function (codon) {
            var aa = "";
            switch (codon.fp) {
                case rna_1.RNA.A:
                    switch (codon.sp) {
                        case rna_1.RNA.A:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// AAA
                                    aa = "Lys";
                                    break;
                                case rna_1.RNA.U:// AAU
                                    aa = "Asn";
                                    break;
                                case rna_1.RNA.G:// AAG
                                    aa = "Lys";
                                    break;
                                case rna_1.RNA.C:// AAC
                                    aa = "Asn";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.U:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// AUA
                                    aa = "Ile";
                                    break;
                                case rna_1.RNA.U:// AUU
                                    aa = "Ile";
                                    break;
                                case rna_1.RNA.G:// AUG
                                    aa = "Met";
                                    break;
                                case rna_1.RNA.C:// AUC
                                    aa = "Ile";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.G:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// AGA
                                    aa = "Arg";
                                    break;
                                case rna_1.RNA.U:// AGU
                                    aa = "Ser";
                                    break;
                                case rna_1.RNA.G:// AGG
                                    aa = "Arg";
                                    break;
                                case rna_1.RNA.C:// AGC
                                    aa = "Ser";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.C:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// ACA
                                    aa = "Thr";
                                    break;
                                case rna_1.RNA.U:// ACU
                                    aa = "Thr";
                                    break;
                                case rna_1.RNA.G:// ACG
                                    aa = "Thr";
                                    break;
                                case rna_1.RNA.C:// ACC
                                    aa = "Thr";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        default:
                            throw new TypeError("Invalid character");
                    } //second level
                    break;
                case rna_1.RNA.U:
                    switch (codon.sp) {
                        case rna_1.RNA.A:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// UAA
                                    aa = "STOP";
                                    break;
                                case rna_1.RNA.U:// UAU
                                    aa = "Tyr";
                                    break;
                                case rna_1.RNA.G:// UAG
                                    aa = "STOP";
                                    break;
                                case rna_1.RNA.C:// UAC
                                    aa = "Tyr";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.U:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// UUA
                                    aa = "Leu";
                                    break;
                                case rna_1.RNA.U:// UUU
                                    aa = "Phe";
                                    break;
                                case rna_1.RNA.G:// UUG
                                    aa = "Leu";
                                    break;
                                case rna_1.RNA.C:// UUC
                                    aa = "Phe";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.G:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// UGA
                                    aa = "STOP";
                                    break;
                                case rna_1.RNA.U:// UGU
                                    aa = "Cys";
                                    break;
                                case rna_1.RNA.G:// UGG
                                    aa = "Trp";
                                    break;
                                case rna_1.RNA.C:// UGC
                                    aa = "Cys";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.C:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// UCA
                                    aa = "Ser";
                                    break;
                                case rna_1.RNA.U:// UCU
                                    aa = "Ser";
                                    break;
                                case rna_1.RNA.G:// UCG
                                    aa = "Ser";
                                    break;
                                case rna_1.RNA.C:// UCC
                                    aa = "Ser";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        default:
                            throw new TypeError("Invalid character");
                    } //second level
                    break;
                case rna_1.RNA.G:
                    switch (codon.sp) {
                        case rna_1.RNA.A:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// GAA
                                    aa = "Glu";
                                    break;
                                case rna_1.RNA.U:// GAU
                                    aa = "Asp";
                                    break;
                                case rna_1.RNA.G:// GAG
                                    aa = "Glu";
                                    break;
                                case rna_1.RNA.C:// GAC
                                    aa = "Asp";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.U:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// GUA
                                    aa = "Val";
                                    break;
                                case rna_1.RNA.U:// GUU
                                    aa = "Val";
                                    break;
                                case rna_1.RNA.G:// GUG
                                    aa = "Val";
                                    break;
                                case rna_1.RNA.C:// GUC
                                    aa = "Val";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.G:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// GGA
                                    aa = "Gly";
                                    break;
                                case rna_1.RNA.U:// GGU
                                    aa = "Gly";
                                    break;
                                case rna_1.RNA.G:// GGG
                                    aa = "Gly";
                                    break;
                                case rna_1.RNA.C:// GGC
                                    aa = "Gly";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.C:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// GCA
                                    aa = "Ala";
                                    break;
                                case rna_1.RNA.U:// GCU
                                    aa = "Ala";
                                    break;
                                case rna_1.RNA.G:// GCG
                                    aa = "Ala";
                                    break;
                                case rna_1.RNA.C:// GCC
                                    aa = "Ala";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        default:
                            throw new TypeError("Invalid character");
                    } //second level
                    break;
                case rna_1.RNA.C:
                    switch (codon.sp) {
                        case rna_1.RNA.A:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// CAA
                                    aa = "Gln";
                                    break;
                                case rna_1.RNA.U:// CAU
                                    aa = "His";
                                    break;
                                case rna_1.RNA.G:// CAG
                                    aa = "Gln";
                                    break;
                                case rna_1.RNA.C:// CAC
                                    aa = "His";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.U:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// CUA
                                    aa = "Leu";
                                    break;
                                case rna_1.RNA.U:// CUU
                                    aa = "Leu";
                                    break;
                                case rna_1.RNA.G:// CUG
                                    aa = "Leu";
                                    break;
                                case rna_1.RNA.C:// CUC
                                    aa = "Leu";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.G:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// CGA
                                    aa = "Arg";
                                    break;
                                case rna_1.RNA.U:// CGU
                                    aa = "Arg";
                                    break;
                                case rna_1.RNA.G:// CGG
                                    aa = "Arg";
                                    break;
                                case rna_1.RNA.C:// CGC
                                    aa = "Arg";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        case rna_1.RNA.C:
                            switch (codon.tp) {
                                case rna_1.RNA.A:// CCA
                                    aa = "Pro";
                                    break;
                                case rna_1.RNA.U:// CCU
                                    aa = "Pro";
                                    break;
                                case rna_1.RNA.G:// CCG
                                    aa = "Pro";
                                    break;
                                case rna_1.RNA.C:// CCC
                                    aa = "Pro";
                                    break;
                                default:
                                    throw new TypeError("Invalid character");
                            } //third level
                            break;
                        default:
                            throw new TypeError("Invalid character");
                    } //second level
                    break;
                default:
                    throw new TypeError("Invalid character");
            } //first level
            return aa;
        };
        return Codon;
    }());
    exports.Codon = Codon;
});
