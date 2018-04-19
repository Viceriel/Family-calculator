"use strict";

let Noise = require("../src/js/noise.js");
let expect = require("chai").expect;
let noise;

describe("Noise", ()=>
{
    it("Noise should have", ()=>
    {
        noise = new Noise();
        noise.Borders = [1, 50];
        expect(noise).to.have.property("_mean");
        expect(noise).to.have.property("_std");
        expect(noise).to.have.property("_low");
        expect(noise).to.have.property("_high");
    });
});
