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

    this._m = require("mithril");
    this._main = new mainview(this);
    this._items = {};
    this._items["spent"] = [];
    this._items["income"] = [];
    this._items["investment"] = [];
  }

  /**
   * Routing of single page application.
   */
  run()
  {
    this._m.mount(document.body, this._main);
  }

  /**
   * Method responsible for changing view base on caller
   *
   * @param {Object} e event object
   */
  changeView(e)
  {
    let mainview = require("../src/view.js");
    let addview =  require("../src/addview.js");
    let investview = require("../src/InvestView.js");
    let add, main, invest;

    switch(e.target.name)
    {
      case "spent":
        add = new addview(this, this._m, "spent");
        this._m.mount(document.body, add);
        break;
      case "main":
        if (e.request)
          this.mapToItems(e.request.data, e.request.type);

        main = new mainview(this, this._items);
        this._m.mount(document.body, main);
        break;
      case "income":
        add = new addview(this, this._m, "income");
        this._m.mount(document.body, add);
        break;
      case "investment":
        invest = new investview(this, this._m);
        this._m.mount(document.body, invest);
        break;
      default:
        break;
    }
  }

  /**
   * Method responsible for mapping input array to class property _items
   *
   * @param {Array} arr array with FinanceItem data
   * @param {String} type type of financeItem data
   */
  mapToItems(arr, type)
  {
    let len = arr.length;
    for (let i = 0; i < len; i++)
      this._items[type].push(arr[i]);
  }
}

let app = new App();
app.run();
