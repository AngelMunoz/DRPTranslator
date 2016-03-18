"use strict";
var DrpTranslator;
(function (DrpTranslator) {
    var Symbols;
    (function (Symbols) {
        (function (RNA) {
            RNA[RNA["A"] = 0] = "A";
            RNA[RNA["U"] = 1] = "U";
            RNA[RNA["G"] = 2] = "G";
            RNA[RNA["C"] = 3] = "C";
        })(Symbols.RNA || (Symbols.RNA = {}));
        var RNA = Symbols.RNA;
    })(Symbols = DrpTranslator.Symbols || (DrpTranslator.Symbols = {}));
})(DrpTranslator = exports.DrpTranslator || (exports.DrpTranslator = {}));
