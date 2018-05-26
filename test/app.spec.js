"use strict";

let jsdom = require("mocha-jsdom");
let expect = require("chai").expect;
let foo, app;

describe("Application", ()=>
{
  jsdom();
  beforeEach(()=>
  {
    let App = require("../src/js/app.js");
    app = new App();
  });

  it("App should exists", ()=>
             {
               expect(app).to.be.a("Object");
               expect(app).to.have.property("_m");
               expect(app).to.have.property("_map");
               expect(app).to.have.property("_items");
               expect(app).to.have.property("run");
               expect(app).to.have.property("mapToItems");
               expect(app).to.have.property("changeView");
               expect(app.run).to.be.a("function");
               expect(app.mapToItems).to.be.a("function");
               expect(app.changeView).to.be.a("function");
             });

  it("Application run should change the dom", ()=>
                                              {
                                                app.run();
                                                expect(document.getElementsByTagName("main")).to.have.length(1);
                                                expect(document.getElementsByTagName("div")).to.have.length(10);
                                              });
it("Application items should be empty at the beggining", ()=>
                                                         {
                                                             expect(app._items["spend"]).to.have.length(0);
                                                             expect(app._items["income"]).to.have.length(0);
                                                             expect(app._items["investment"]).to.have.length(0);
                                                         });
});
