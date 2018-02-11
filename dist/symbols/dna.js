(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Enumerable that represents the DNA bases
     * @see https://en.wikipedia.org/wiki/DNA#Properties
     */
    var DNA;
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
    })(DNA = exports.DNA || (exports.DNA = {}));
});
