"use strict";

let expect = require("chai").expect;
let FinanceItem = require("../src/js/investItem.js");
let item;

describe("Invest item", ()=>
{
    it("Invest item should have", ()=>
    {
        item = new FinanceItem("Salary", 10, "Month", 1, 1, 1);
        expect(item).to.have.own.property("_capital");
        expect(item).to.have.own.property("_increase");
        expect(item._valid).to.equal(true);
    });

    it("Invest item should be invalid", ()=>
    {
        item = new FinanceItem();
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary");
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, "Month");
        expect(item._valid).to.equal(false);
        item = new FinanceItem("", 10, "Month", 1);
        expect(item._valid).to.equal(false);
        item = new FinanceItem(15, 10, "Month", 1);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", "A", "Month", 1);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, true, 1);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, "Hajla", 1);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, true, "false");
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, "Month", 1, true);
        expect(item._valid).to.equal(false);
        item = new FinanceItem("Salary", 10, "Month", 1, true, true);
        expect(item._valid).to.equal(false);
    });
});
