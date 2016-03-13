/// <reference path="../typings/main.d.ts"/>
/// <reference path="../src/index.ts"/>

import chai = require("chai");
import drptranslator = require("../src/index");

var expect = chai.expect;
var assert = chai.assert;
var drp = drptranslator.DrpTranslator;
describe('Name of the test1', () =>{ // describe the test case
    it('what should it do', () =>{ // descrbibe what this step should do
        expect(true).to.be.true; // code the logic for the test
    });
    it("what else it should do", () => { // add steps as you need
        expect("It also does this").to.include("It also does this");
    });
});

describe('Name of the test2', () =>{ // describe the test case
    it('what should it do2', () =>{ // descrbibe what this step should do
        expect(true).to.be.true; // code the logic for the test
    });
    it("what else it should do2", () => { // add steps as you need
        expect("It also does this").to.include("It also does this");
    });
});

describe('Soup', () =>{ // describe the test case
    it('The soup must have noodles', () =>{ // descrbibe what this step should do
        assert.equal("The soup has: noodles", drp.soup("noodles"));
    });
    it("what else it should do2", () => { // add steps as you need
        expect("It also does this").to.include("It also does this");
    });
});
