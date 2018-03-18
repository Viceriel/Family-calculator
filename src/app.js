"use strict";

/**
 * Main class represents application
 */
class App
{
  /**
   * Assigne the  views.
   */
  constructor()
  {
    let mainview = require("../src/view.js");
    let addview =  require("../src/addview");

    this._m = require("mithril");
    this._main = new mainview();
    this._add = new addview(this, this._m);
  }

  /**
   * Routing of single page application.
   */
  run()
  {
    this._m.route(document.body, "/home",
                                    {
                                      "/home": this._main,
                                      "/add": this._add,
                                    });
  }

  switch()
  {
    this._m.mount(document.body, this._main);
  }
}

let app = new App();
app.run();
