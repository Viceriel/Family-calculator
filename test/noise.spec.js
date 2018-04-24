"use strict";

let Noise = require("../src/js/noise.js");
let expect = require("chai").expect;
let noise;

describe("Noise", ()=>
{
    beforeEach("Setting up noise",()=>
    {
      noise = new Noise(true);
    });

    it("Noise should have", ()=>
    {
        expect(noise).to.have.property("_active");
        noise.Borders = [1, 50];
        expect(noise).to.have.property("_mean");
        expect(noise).to.have.property("_std");
        expect(noise).to.have.property("_low");
        expect(noise).to.have.property("_high");
        expect(noise).to.have.property("_size");
    });

    it("Noise should be valid", ()=>
    {
      noise.Borders = [1, 50];
      expect(noise._valid).to.equal(true);
    });

    it("Noise should be invalid", ()=>
    {
      noise.Borders = [1, 1];
      expect(noise._valid).to.equal(false);
      let message = "Spread between low and high border value based on your monthly income is low! Please find a better job!";
      expect(noise._error).to.equal(message);
      noise.Borders = [1];
      expect(noise._valid).to.equal(false);
      message = "Inappropriate length of array";
      expect(noise._error).to.equal(message);
      noise.Borders = 1;
      expect(noise._valid).to.equal(false);
      message = "Inappropriate length of array";
      noise.Borders = ["banana", 2];
      expect(noise._valid).to.equal(false);
      message = "Some values are not a number";
      noise.Borders = [2, "orange"];
      expect(noise._valid).to.equal(false);
      message = "Some values are not a number";

    })
});
