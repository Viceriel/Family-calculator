"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("Noise view", ()=>
{
    jsdom();
    beforeEach("Creating view", ()=>
    {
      let Noiseview = require("../src/js/views/noiseview");
      let App = require("../src/js/app");
      let item = require("../src/js/FinanceItem");
      let noise = require("../src/js/noise");
      let app = new App();
      let n = new noise(false);

      view = new Noiseview(app, app._m, [new item("Salary", 500, "Month", 1), new item("Ticket", 70, "Month", 1)], 1200, n);
    });

    it("Noise view should have", ()=>
    {
      expect(view).to.have.property("_parent");
      expect(view).to.have.property("_m");
      expect(view).to.have.property("_title");
      expect(view).to.have.property("_noise");
      expect(view).to.have.property("_row");
      expect(view.Valid).to.equal(true);
    });

    it("Noise view should be invalid", ()=>
    {
      let Noiseview = require("../src/js/views/noiseview");
      let App = require("../src/js/app");
      let item = require("../src/js/FinanceItem");
      let noise = require("../src/js/noise");
      let app = new App();
      let n = new noise(false);

      view = new Noiseview(app, app._m, [new item("Salary", 500, "Month", 1), new item("Ticket", 70, "Month", 1)], 1199, n);
      expect(view.Valid).to.equal(false);
      view = new Noiseview(app, app._m, [new item("Salary", 500, "Year", 1), new item("Ticket", 70, "Year", 1)], 1200, n);
      expect(view.Valid).to.equal(false);
      view = new Noiseview(app, app._m, [new item("Salary", 50, "Month", 1), new item("Ticket", 70, "Month", 1)], 1200, n);
      expect(view.Valid).to.equal(false);
    });

    it("Layout should contains", ()=>
    {
      let m = require("mithril");
      m.mount(document.body, view);
      let inputs = document.getElementsByTagName("input");
      expect(inputs.length).to.equal(3);
      let btn = document.getElementsByTagName("button");
      expect(btn.length).to.equal(2);
      view.noiseService({});
      expect(view._noise.Active).to.equal(true);
      view.noiseService({});
      expect(view._noise.Active).to.equal(false);
      view.noiseService({});
      inputs[1].value = 0;
      inputs[2].value = 100;
      let e = {};
      e.redraw = "";
      view.recalculate(e);
      expect(view._noise.Active).to.equal(true);
    });
});
