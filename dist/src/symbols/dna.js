"use strict";
/**
 * Enumerable that represents the DNA bases
 * @see https://en.wikipedia.org/wiki/DNA#Properties
 */
(function (DNA) {
    /**
     * Adenine
     */
    DNA[DNA["A"] = 0] = "A";
    /**
     * Thymine
     */
    DNA[DNA["T"] = 1] = "T";
    /**
     * Guanine
     */
    DNA[DNA["G"] = 2] = "G";
    /**
     * Cytosine
     */
    DNA[DNA["C"] = 3] = "C";
})(exports.DNA || (exports.DNA = {}));
var DNA = exports.DNA;
