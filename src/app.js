"use strict";

/*let m = require("mithril");
let mainview = require("../src/view.js");
let addview = require("../src/addview");

let a = new mainview();
let b = new addview("marcelka");*/SVGFEMorphologyElement

class App
{
  constructor()
  {
    let mainview = require("../src/view.js");
    let addview =  require("../src/addview");

    this._m = require("mithril");
    this._main = new mainview();
    this._add = new addview(this, this._m);
  }

  run()
  {
    this._m.route(document.body, "/home",
                                    {
                                      "/home": this._main,
                                      "/add": this._add,
                                    });
  }
}

let app = new App();
app.run();
