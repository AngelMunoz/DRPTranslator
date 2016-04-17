/**
 * Enumerable that represents the DNA bases
 * @see https://en.wikipedia.org/wiki/DNA#Properties
 */
export enum DNA {
    /**
     * Adenine
     */
    A,
    /**
     * Thymine
     */
    T,
    /**
     * Guanine
     */
    G,
    /**
     * Cytosine
     */
    C
}
/**
 * Enumerable that represents the RNA bases
 * @see https://en.wikipedia.org/wiki/RNA#Stucture
 */
export enum RNA {
    /**
     * Adenine
     */
    A,
    /**
     * Uracil
     */
    U,
    /**
     * Guanine
     */
    G,
    /**
     * Cytosine
     */
    C
}
export var AA = {
    "PHE":[
        "UUU",
        "UUC"
    ],
    "LEU":[
        "UUA",
        "UUG",
        "CUU",
        "CUC",
        "CUA",
        "CUG"
    ],
    "ILE":[
        "AUU",
        "AUC",
        "AUA"
    ],
    "MET":["AUG"],
    "VAL":[
        "GUU",
        "GUC",
        "GUA",
        "GUG"
    ],
    "SER":[
        "UCU",
        "UCC",
        "UCA",
        "UCG",
        "AGU",
        "AGC"
    ],
    "PRO":[
        "CCU",
        "CCC",
        "CCA",
        "CCG"
    ],
    "THR":[
        "ACU",
        "ACC",
        "ACA",
        "ACG"
    ],
    "ALA":[
        "GCU",
        "GCC",
        "GCA",
        "GCG"
    ],
    "TYR":[
        "UAU",
        "UAC"
    ],
    "STOP":[
        "UAA",
        "UAG",
        "UGA"
    ],
    "HIS":[
        "CAU",
        "CAC"
    ],
    "GLN":[
        "CAA",
        "CAG"
    ],
    "ASN":[
        "AAU",
        "AAC"
    ],
    "LYS":[
        "AAA",
        "AAG"
    ],
    "ASP":[
        "GAU",
        "GAC"
    ],
    "GLU":[
        "GAA",
        "GAG"
    ],
    "CYS":[
        "UGU",
        "UGC"
    ],
    "TRP":["UGG"],
    "ARG":[
        "CGU",
        "CGC",
        "CGA",
        "CGG",
        "AGA",
        "AGG"
    ],
    "GLY":[
        "GGU",
        "GGC",
        "GGA",
        "GGG"
    ]
    
}