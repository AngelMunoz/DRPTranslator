(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./symbols/rna", "./symbols/dna", "./symbols/codon", "./translators/dna.translator", "./translators/rna.translator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rna_1 = require("./symbols/rna");
    exports.RNA = rna_1.RNA;
    var dna_1 = require("./symbols/dna");
    exports.DNA = dna_1.DNA;
    var codon_1 = require("./symbols/codon");
    exports.Codon = codon_1.Codon;
    var dna_translator_1 = require("./translators/dna.translator");
    exports.DNATranslator = dna_translator_1.DNATranslator;
    var rna_translator_1 = require("./translators/rna.translator");
    exports.RNATranslator = rna_translator_1.RNATranslator;
});
