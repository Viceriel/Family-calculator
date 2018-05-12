"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("Add invest view", ()=>
{
  jsdom();
  beforeEach("Creating view", ()=>
  {
    let App = require("../src/js/app");
    let InvestView = require("../src/js/views/investView");
    let app = new App();
    view = new InvestView(app, app._m);
  });

  it("Add invest view should have", ()=>
  {
      expect(view).to.have.property("_title");
      expect(view).to.have.property("_parent");
      expect(view).to.have.property("_m");
      expect(view).to.have.property("_save");
  });

  it("Layout should contains", ()=>
  {
      let m = require("mithril");
      m.mount(document.body, view);
      let buttons = document.getElementsByTagName("button");
      expect(buttons.length).to.equal(2);
      let inputs = document.getElementsByTagName("input");
      expect(inputs.length).to.equal(5);
      let rows = document.getElementsByClassName("row");
      expect(rows.length).to.equal(2);
      view.processItems();
      let invalid = document.getElementsByClassName("invalid");
      expect(invalid.length).to.equal(1);
  });
});
