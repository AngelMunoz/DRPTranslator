/// <reference path="../typings/main.d.ts"/>

import chai = require("chai");
var expect = chai.expect;
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
