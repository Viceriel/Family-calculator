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
    this._items["spend"] = [];
    this._items["income"] = [];
    this._items["investment"] = [];

    this._map = new Map();
    this._map.set("Income", "income");
    this._map.set("Spends", "spend");
    this._map.set("Investments", "investment");
  }

  /**
   * Routing of single page application.
   */
  run()
  {
    this._m.mount(document.body, this._main);
  }

  /**
   * Method responsible for processing change item request
   *
   * @param {Object} e event object
   */
  processChange(e)
  {
     let first = false;
     let children = e.target.parentNode.childNodes;
     let index = 0;

     let len = children.length;
     for (let i = 2; i < len; i++)
     {
       if (e.target == children[i])
       {
         index = i - 2;
         break;
       }
     }

     e.target.name = "change";
     e.target.itemLocation = index;
     e.target.itemName = this._map.get(children[0].innerHTML);
     this.changeView(e);
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
    let changeview = require("../src/changeView.js");
    let add, main, invest, change;

    switch(e.target.name)
    {
      case "spend":
        add = new addview(this, this._m, "spend");
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
      case "change":
        change = new changeview(this, this._m, this._items[e.target.itemName][e.target.itemLocation]);
        this._m.mount(document.body, change);
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
