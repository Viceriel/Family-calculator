"use strict";

let assert = require("assert");
let jsdom = require("mocha-jsdom");
let foo;

describe("Application", ()=>
{
  jsdom();
  before(()=>
  {
    foo = require("../src/js/app.js");
  })

  it("App should exists", ()=>
             {
               let a = new foo();
               assert(a, new foo());
             })
})
