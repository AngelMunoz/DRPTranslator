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
so you can install it as a dependancy

`npm install --save drptranslator`


## Usage
**Javascript**

```javascript
var drptranslator = require('drptranslator/drptranslator');//this is a must
var RNATranslator = drptranslator.RNATranslator;
var rnaTranslator = new RNATranslator();

var aaSeq = rnaTranslator.transRNAtoAA("AUGGUCUGC");// Met-Val-Cys
console.log(aaSeq);
```

**Typescript**

```javascript
import * as drptranslator from "drptranslator/drptranslator";

var RNATranslator = drptranslator.RNATranslator;
var rnaTrans = new RNATranslator();

var rnatodna = rnaTrans.transRNAtoDNA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
var arnAASeq = rnaTrans.transRNAtoAA("CCGAUCGAUCGCGAUCGAUCUUGCUCA");
console.log(arnAASeq, rnatodna);

var DNATranslator = drptranslator.DNATranslator;
var dnaTrans = new DNATranslator();
var dnaAASeq = dnaTrans.transDNAtoAA("GGCTAGCTAGCGCTAGCTAGAACGAGT");
console.log(dnaAASeq);

// console output
// Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser GGCTAGCTAGCGCTAGCTAGAACGAGT
// Pro-Ile-Asp-Arg-Asp-Arg-Ser-Cys-Ser
```


## What's next?
* [ ] Document source files
* [ ] Creating a website for its API docs
* [ ] Adding more cappabilities
* [ ] Publish a demo of an app using the library

### Suggestions
If you have an idea or you want to help to make this something bigger, raise an issue :) I'm glad to check out your ideas!
