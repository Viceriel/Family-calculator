"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let view;

describe("Add view", ()=>
{
    jsdom();
    beforeEach("Creating view", ()=>
    {
       let App = require("../src/js/app.js");
       let Add = require("../src/js/views/addview");
       let app = new App();
       view = new Add(app, app._m, "income");
    });

    it("Add view should have", ()=>
    {
         expect(view).to.have.property("_look");
         expect(view).to.have.property("_m");
         expect(view).to.have.property("_parent");
         expect(view).to.have.property("_valid");
         expect(view).to.have.property("_title");
         expect(view).to.have.property("_back");
    });

    it("Layout should contains", ()=>
    {
        let m = require("mithril");
        m.mount(document.body, view);
        let btn = document.getElementsByTagName("button");
        expect(btn.length).to.equal(2);
        let inputs = document.getElementsByTagName("input");
        expect(inputs.length).to.equal(3);
        let rows = document.getElementsByClassName("row");
        expect(rows.length).to.equal(1);
        let e = {};
        e.target = btn[0];
        view.remoweRow(e);
        rows = document.getElementsByClassName("row");
        expect(rows.length).to.equal(1);
        view.processItems();
        let invalid = document.getElementsByClassName("invalid");
        expect(invalid.length).to.equal(1);
        view.removeBtn();
        rows = document.getElementsByClassName("row");
        expect(rows.length).to.equal(2);
    });
});
