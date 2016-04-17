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
exports.AA = {
    "PHE": [
        "UUU",
        "UUC"
    ],
    "LEU": [
        "UUA",
        "UUG",
        "CUU",
        "CUC",
        "CUA",
        "CUG"
    ],
    "ILE": [
        "AUU",
        "AUC",
        "AUA"
    ],
    "MET": ["AUG"],
    "VAL": [
        "GUU",
        "GUC",
        "GUA",
        "GUG"
    ],
    "SER": [
        "UCU",
        "UCC",
        "UCA",
        "UCG",
        "AGU",
        "AGC"
    ],
    "PRO": [
        "CCU",
        "CCC",
        "CCA",
        "CCG"
    ],
    "THR": [
        "ACU",
        "ACC",
        "ACA",
        "ACG"
    ],
    "ALA": [
        "GCU",
        "GCC",
        "GCA",
        "GCG"
    ],
    "TYR": [
        "UAU",
        "UAC"
    ],
    "STOP": [
        "UAA",
        "UAG",
        "UGA"
    ],
    "HIS": [
        "CAU",
        "CAC"
    ],
    "GLN": [
        "CAA",
        "CAG"
    ],
    "ASN": [
        "AAU",
        "AAC"
    ],
    "LYS": [
        "AAA",
        "AAG"
    ],
    "ASP": [
        "GAU",
        "GAC"
    ],
    "GLU": [
        "GAA",
        "GAG"
    ],
    "CYS": [
        "UGU",
        "UGC"
    ],
    "TRP": ["UGG"],
    "ARG": [
        "CGU",
        "CGC",
        "CGA",
        "CGG",
        "AGA",
        "AGG"
    ],
    "GLY": [
        "GGU",
        "GGC",
        "GGA",
        "GGG"
    ]
};
