[![Build Status](https://travis-ci.org/AngelMunoz/DRPTranslator.svg?branch=master)](https://travis-ci.org/AngelMunoz/DRPTranslator)

# **NOTICE**
Since version 1.2.0 This library requires you to use **node 6+**


# Hello everyone!
Welcome to DNA-RNA-Protein Translator or if you may drptranslator
I have a very bad problem of naming but don't let that stop you!

**DRPTranslator** is a small library written in typescript, this is intended for a really
low entry level of genetics, nothing really advanced since I'm not a genetist after all.
However if you want this to help someone at school this can suit you well :)

At the moment these are some of the usages of the principal uses:

- Translate a DNA sequence into a RNA sequence
- Obtain the complementary DNA sequence from another DNA sequence
- Translate directly from DNA to an Aminoacid sequence
- Translate RNA to an Aminoacid sequence
- Find starts and stops codons in a sequence

and some other cool stuff
like a obtaining a *codon array*  or find the *first and last start and stop sequence*.

## Install
how can you consume this library? this is intended to be used in a nodejs environment
so you can install it as a dependency

`npm install --save drptranslator`


## Usage
Tou can [Test it Here](https://npm.runkit.com/drptranslator)
**Javascript**

```javascript
const { RNATranslator, DNATranslator } = require("drptranslator");

const rTranslator = new RNATranslator();
const dTranslator = new DNATranslator();
const rnaAaSeq = rTranslator.transRNAtoAA("AUGGUCUGC");
const dnaAaSeq = dTranslator.transDNAtoAA("ATGGTCTGC");
const rnatodna = rTranslator.transRNAtoDNA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
const arnAASeq = rTranslator.transRNAtoAA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
const dnaAASeq = dTranslator.transDNAtoAA("GGCTAGCTAGCGCTAGCTAGAACGAGT");

console.log(rnaAaSeq, dnaAaSeq, arnAASeq, rnatodna, dnaAASeq);
// "Met-Val-Cys"
// "Tyr-Gln-Thr"
// "Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser"
// "GGCTAGCTAGCGCTAGCTAGAACGAGT"
// "Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser"
```

**Typescript**

```javascript
import { RNATranslator, DNATranslator }  from "drptranslator";

const rTranslator = new RNATranslator();
const dTranslator = new DNATranslator();
const rnaAaSeq = rTranslator.transRNAtoAA("AUGGUCUGC");
const dnaAaSeq = dTranslator.transDNAtoAA("ATGGTCTGC");
const rnatodna = rTranslator.transRNAtoDNA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
const arnAASeq = rTranslator.transRNAtoAA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
const dnaAASeq = dTranslator.transDNAtoAA("GGCTAGCTAGCGCTAGCTAGAACGAGT");

console.log(rnaAaSeq, dnaAaSeq, arnAASeq, rnatodna, dnaAASeq);
// "Met-Val-Cys"
// "Tyr-Gln-Thr"
// "Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser"
// "GGCTAGCTAGCGCTAGCTAGAACGAGT"
// "Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser"
```


## What's next?
* [x] Document source files
* [x] Creating a website for its API docs
* [ ] Publish a demo of an app using the library
* [ ] Adding more cappabilities

### Suggestions
If you have an idea or you want to help to make this something bigger, raise an issue :) I'm glad to check out your ideas!
