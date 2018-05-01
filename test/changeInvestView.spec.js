"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("Change invest view", ()=>
{
    jsdom();
    beforeEach("Creating view", ()=>
    {
      let App = require("../src/js/app.js");
      let Change = require("../src/js/views/changeInvestView");
      let app = new App();
      let InvestItem = require("../src/js/investItem");
      let item = new InvestItem("Salary", 500, "Month", 1, 1000, 5);
      view = new Change(app, app._m, item);
    });

    it("Change invest view should have", ()=>
    {
        expect(view).to.have.property("_item");
    });
});
