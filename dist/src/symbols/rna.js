"use strict";
/**
 * Enumerable that represents the RNA bases
 * @see https://en.wikipedia.org/wiki/RNA#Stucture
 */
(function (RNA) {
    /**
     * Adenine
     */
    RNA[RNA["A"] = 0] = "A";
    /**
     * Uracil
     */
    RNA[RNA["U"] = 1] = "U";
    /**
     * Guanine
     */
    RNA[RNA["G"] = 2] = "G";
    /**
     * Cytosine
     */
    RNA[RNA["C"] = 3] = "C";
})(exports.RNA || (exports.RNA = {}));
var RNA = exports.RNA;
