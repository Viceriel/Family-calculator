let expect = require("chai").expect;
let FinanceItem = require("../src/js/FinanceItem.js");
let item;

describe("Finance item", ()=>
{
    it("Should be valid", ()=>
    {
        item = new FinanceItem("Salary", 10, "Month", 1);
        expect(item._valid).to.equal(true);
        expect(item.Name).to.equal("Salary");
        expect(item.Value).to.equal(10);
        expect(item.Frequency).to.equal("Month");
        expect(item.Modifier).to.equal(1);
    });

    it ("Should be invalid", ()=>
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
    });
});
