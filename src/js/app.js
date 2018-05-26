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
    let mainview = require("../js/views/view.js");
    let Noise = require("../js/noise.js");

    this._m = require("mithril");
    this._main = new mainview(this);
    this._noise = new Noise(false);
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
   * Method responsible for changing view base on caller
   *
   * @param {Object} e event object
   */
  changeView(e)
  {
    let mainview = require("../js/views/view");
    let addview =  require("../js/views/addview");
    let investview = require("../js/views/investView");
    let changeview = require("../js/views/changeView");
    let changeinvest = require("../js/views/changeInvestView");
    let noiseview = require("../js/views/noiseview");
    let reportview = require("../js/views/reportview");
    let computeEngine = require("../js/computeEngine");
    let engine = 0;
    let view;

    if (!e)
        return;

    switch(e.target.name)
    {
        case "spend":
            view = new addview(this, this._m, "spend");
            break;
        case "main":
            if (e.request)
                this.mapToItems(e.request.data, e.request.type);

            view = new mainview(this, this._items);
            break;
        case "income":
            view = new addview(this, this._m, "income");
            break;
        case "investment":
            view = new investview(this, this._m);
            break;
        case "change":
            view = new changeview(this, this._m, this._items[e.target.itemName][e.target.itemLocation]);
            break;
        case "changeinvest":
            view = new changeinvest(this, this._m, this._items[e.target.itemName][e.target.itemLocation]);
            break;
        case "noise":
            view = new noiseview(this, this._m, this._items["income"], e.mainsize, this._noise);
            break;
        case "report":
            engine = new computeEngine(1, 1000, this._items, this._noise);
            view = new reportview(this, this._m, engine);
            break;
        default:
            return;
    }

    if (view.Valid)
        this._m.mount(document.body, view);
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

module.exports = App;
