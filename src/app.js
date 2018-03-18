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
    this._main = new mainview(this);
    this._add = new addview(this, this._m);
    this._items = [];
  }

  /**
   * Routing of single page application.
   */
  run()
  {
    this._m.mount(document.body, this._main);
  }

  changeView(e)
  {
    let mainview = require("../src/view.js");
    let addview =  require("../src/addview");

    switch(e.target.name)
    {
      case "spent":
        let add = new addview(this, this._m);
        this._m.mount(document.body, add);
        break;
      case "main":
        if (e.request)
          this.mapToItems(e.request);

        let main = new mainview(this, this._items);
        this._m.mount(document.body, main);
        break;
      default:
        break;
    }
  }

  mapToItems(arr)
  {
    let len = arr.length;
    for (let i = 0; i < len; i++)
      this._items.push(arr[i]);
  }
}

let app = new App();
app.run();
