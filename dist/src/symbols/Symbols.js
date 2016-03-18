"use strict";
(function (DNA) {
    DNA[DNA["A"] = 0] = "A";
    DNA[DNA["T"] = 1] = "T";
    DNA[DNA["G"] = 2] = "G";
    DNA[DNA["C"] = 3] = "C";
})(exports.DNA || (exports.DNA = {}));
var DNA = exports.DNA;
(function (RNA) {
    RNA[RNA["A"] = 0] = "A";
    RNA[RNA["U"] = 1] = "U";
    RNA[RNA["G"] = 2] = "G";
    RNA[RNA["C"] = 3] = "C";
})(exports.RNA || (exports.RNA = {}));
var RNA = exports.RNA;
