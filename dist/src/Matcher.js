"use strict";
var Symbols_1 = require("./symbols/Symbols");
var Matcher = (function () {
    function Matcher() {
    }
    Matcher.parseRna = function (b) {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return Symbols_1.RNA.A;
                case 'C':
                    return Symbols_1.RNA.C;
                case 'U':
                    return Symbols_1.RNA.U;
                case 'G':
                    return Symbols_1.RNA.G;
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case Symbols_1.RNA.A:
                    return 'A';
                case Symbols_1.RNA.C:
                    return 'C';
                case Symbols_1.RNA.U:
                    return 'U';
                case Symbols_1.RNA.G:
                    return 'G';
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
    };
    Matcher.parseOpositeRna = function (b) {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return Symbols_1.RNA.U;
                case 'C':
                    return Symbols_1.RNA.G;
                case 'U':
                    return Symbols_1.RNA.A;
                case 'G':
                    return Symbols_1.RNA.C;
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case Symbols_1.RNA.A:
                    return 'U';
                case Symbols_1.RNA.C:
                    return 'G';
                case Symbols_1.RNA.U:
                    return 'A';
                case Symbols_1.RNA.G:
                    return 'C';
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
    };
    Matcher.parseDna = function (b) {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return Symbols_1.DNA.A;
                case 'C':
                    return Symbols_1.DNA.C;
                case 'T':
                    return Symbols_1.DNA.T;
                case 'G':
                    return Symbols_1.DNA.G;
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case Symbols_1.DNA.A:
                    return 'A';
                case Symbols_1.DNA.C:
                    return 'C';
                case Symbols_1.DNA.T:
                    return 'T';
                case Symbols_1.DNA.G:
                    return 'G';
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
    };
    Matcher.parseOpositeDna = function (b) {
        if (typeof (b) === 'string') {
            switch (b) {
                case 'A':
                    return Symbols_1.DNA.T;
                case 'C':
                    return Symbols_1.DNA.G;
                case 'T':
                    return Symbols_1.DNA.A;
                case 'G':
                    return Symbols_1.DNA.C;
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
        if (typeof (b) === 'number') {
            switch (b) {
                case Symbols_1.DNA.A:
                    return 'T';
                case Symbols_1.DNA.C:
                    return 'G';
                case Symbols_1.DNA.T:
                    return 'A';
                case Symbols_1.DNA.G:
                    return 'C';
                default:
                    throw new Error("Base: " + b + " Is not a valid RNA Base");
            }
        }
    };
    Matcher.parseAA = function (param) {
        throw new Error("Not Implemented");
    };
    return Matcher;
}());
exports.Matcher = Matcher;
