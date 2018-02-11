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
     * Enumerable that represents the RNA bases
     * @see https://en.wikipedia.org/wiki/RNA#Stucture
     */
    var RNA;
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
    })(RNA = exports.RNA || (exports.RNA = {}));
});
