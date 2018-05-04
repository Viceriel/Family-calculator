"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("Change view", ()=>
{
    jsdom();
    beforeEach("Creating view", ()=>
    {
        let App = require("../src/js/app.js");
        let Change = require("../src/js/views/changeView");
        let app = new App();
        let FinanceItem = require("../src/js/FinanceItem");
        let item = new FinanceItem("Salary", 500, "Month", 1);
        view = new Change(app, app._m, item);
    });

    it("Change view should have", ()=>
    {
      expect(view).to.have.property("_parent");
      expect(view).to.have.property("_m");
      expect(view).to.have.property("_item");
      expect(view).to.have.property("_row");
      expect(view).to.have.property("view");
      expect(view).to.have.property("_title");
    });

    it("Layout should contains", ()=>
    {
      let m = require("mithril");
      m.mount(document.body, view);
      let inputs = document.getElementsByTagName("input");
      expect(inputs.length).to.equal(3);
      expect(inputs[0].value).to.equal(view._item.Name);
      expect(parseFloat(inputs[1].value)).to.equal(view._item.Value);
      expect(parseFloat(inputs[2].value)).to.equal(view._item.Modifier);
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
      inputs[0].value = "Salary";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[1].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[1].value = "500";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
      inputs[2].value = "";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
      inputs[2].value = "1";
      view.processItems();
      invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(0);
    });
});
