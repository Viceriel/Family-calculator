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
      data.spend[1] = new Item("Holiday", 200, "Year", 1);
      data.income = [];
      data.income[0] = new Item("Salary", 500, "Month", 1);
      data.investment = [];
      data.investment[0] = new Invest("Pension Fund", 100, "Month", 1, 1000, 6);
      data.investment[1] = new Invest("Luck",1000, "Year", 1, 0, 10);
      let ComputeEngine = require("../src/js/computeEngine");
      let noise = new Noise(false);
      noise.Borders = [parseInt(-500 / 50, 10), parseInt(500 / 20, 10)];
      let range = 2;
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

   it("Compute engine should compute", ()=>
   {
       engine.integrate();
       expect(engine.IntegratedIncomes).to.deep.equal([1350, 1700, 2050, 2400, 2750, 3100, 3450, 3800, 4150, 4500, 4850, 4000, 4350, 4700, 5050, 5400, 5750, 6100, 6450, 6800, 7150, 7500, 7850, 7000]);
       expect(engine.IntegratedInvestments[0]).to.deep.equal([1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2332, 2432, 2532, 2632, 2732, 2832, 2932, 3032, 3132, 3232, 3332, 3432, 3743.92]);
       expect(engine.IntegratedInvestments[1]).to.deep.equal([1100, 2310]);
       expect(engine.IntegratedWhealth).to.deep.equal([2450, 2900, 3350, 3800, 4250, 4700, 5150, 5600, 6050, 6500, 6950, 7432, 7882, 8332, 8782, 9232, 9682, 10132, 10582, 11032, 11482, 11932, 12382, 13053.92]);
   });
});
