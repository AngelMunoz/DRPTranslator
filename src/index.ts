import symbols = require('./symbols/Symbols');
import codon = require("./symbols/Codon");
import dnaTranslator = require('./translators/DnaTranslator');
import rnaTranslator = require('./translators/RnaTranslator');

var c =  new codon.Codon();

var d = new rnaTranslator.RNATranslator();
