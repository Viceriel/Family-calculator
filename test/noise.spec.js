"use strict";

let Noise = require("../src/js/noise.js");
let expect = require("chai").expect;
let noise;

describe("Noise", ()=>
{
    it("Noise should have", ()=>
    {
        noise = new Noise(1, 1);
        expect(noise).to.have.property("_mean");
        expect(noise).to.have.property("_std");
        expect(noise).to.have.property("_activity");
        expect(noise).to.have.property("_low");
        expect(noise).to.have.property("_high");
    });
});
