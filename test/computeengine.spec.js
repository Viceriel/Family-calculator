"use strict";

let expect = require("chai").expect;
let engine;

describe("Compute engine", ()=>
{
   beforeEach("Create engine", ()=>
   {
      let Noise = require("../src/js/noise");
      let data = {};
      let Item = require("../src/js/FinanceItem");
      let Invest = require("../src/js/investItem");
      let savings = 1000;
      data.spend = [];
      data.spend[0] = new Item("Food", 50, "Month", 1);
      data.income = [];
      data.income[0] = new Item("Salary", 500, "Month", 1);
      data.investment = [];
      data.investment[0] = new Invest("Pension Fund", 100, "Month", 1, 1000, 6);
      let ComputeEngine = require("../src/js/computeEngine");
      let noise = new Noise(true);
      let range = 3;
      engine = new ComputeEngine(range, savings, data, noise);
   });

   it("Compute engine should have", ()=>
   {
       expect(engine).to.have.property("_data");
       expect(engine).to.have.property("_savings");
       expect(engine).to.have.property("_noise");
       expect(engine).to.have.property("_year_ratio");
       expect(engine).to.have.property("_month_ratio");
       expect(engine).to.have.property("_integrated_incomes");
       expect(engine).to.have.property("_integrated_investments");
   });
});
