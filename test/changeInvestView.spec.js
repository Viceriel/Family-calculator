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
        expect(view).to.have.property("_row");
        expect(view).to.have.property("_title");
        expect(view).to.have.property("_m");
        expect(view).to.have.property("_item");
    });

    it("Layout should contains", ()=>
    {
      let m = require("mithril");
      m.mount(document.body, view);
      let inputs = document.getElementsByTagName("input");
      expect(inputs.length).to.equal(5);
      expect(parseFloat(inputs[0].value)).to.equal(view._item.Capital);
      expect(inputs[1].value).to.equal(view._item.Name);
      expect(parseFloat(inputs[2].value)).to.equal(view._item.Value);
      expect(parseFloat(inputs[3].value)).to.equal(view._item.Modifier);
      expect(parseFloat(inputs[4].value)).to.equal(view._item.Increase);
      let select = document.getElementsByTagName("select");
      expect(select.selected).to.equal(view._item.Freqeuncy);
      let button = document.getElementsByTagName("button");
      expect(button.length).to.equal(1);
      view.processItems();
      let invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[0].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[0].value = "1000";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[1].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[1].value = "Salary";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[2].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[2].value = "500";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[3].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[3].value = "1";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[4].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[4].value = "5";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
    });
});;
