"use strict";
var DrpTranslator;
(function (DrpTranslator) {
    var Symbols;
    (function (Symbols) {
        (function (DNA) {
            DNA[DNA["A"] = 0] = "A";
            DNA[DNA["T"] = 1] = "T";
            DNA[DNA["G"] = 2] = "G";
            DNA[DNA["C"] = 3] = "C";
        })(Symbols.DNA || (Symbols.DNA = {}));
        var DNA = Symbols.DNA;
    })(Symbols = DrpTranslator.Symbols || (DrpTranslator.Symbols = {}));
})(DrpTranslator = exports.DrpTranslator || (exports.DrpTranslator = {}));
