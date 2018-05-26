"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("View", ()=>
{
    jsdom();
    beforeEach("Create view", ()=>
    {
        let App = require("../src/js/app");
        let Main = require("../src/js/views/view");
        let Item = require("../src/js/FinanceItem");
        let req = {};
        req.income = [];
        req.income[0] = new Item("Salary", 1000, "Month", 1);
        req.income[1] = new Item("Ticket", 70, "Month", 1);
        req.spend = [];
        req.spend[0] = new Item("Food", 75, "Month", 1);
        req.investment =[];
        let app = new App();
        view = new Main(app, req);
    });

    it ("View should have", ()=>
    {
        expect(view).to.have.property("_spents");
        expect(view).to.have.property("_income");
        expect(view).to.have.property("_investment");
        expect(view).to.have.property("_noise");
    });

    it("Layout should contains", ()=>
    {
         let m = require("mithril");
         m.mount(document.body, view);
         let paragraps = document.getElementsByClassName("items");
         expect(paragraps.length).to.equal(3);
         let btns = document.getElementsByTagName("button");
         expect(btns.length).to.equal(4);

    });
});
