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
    let mainview = require("../js/views/view");
    let Noise = require("../js/noise");

    this._m = require("mithril");
    this._main = new mainview(this);
    this._noise = new Noise(false);
    this._items = {};
    this._items["spend"] = [];
    this._items["income"] = [];
    this._items["investment"] = [];
    this._savings = 0;
    this._footer =  this._m("footer", {class: "container-fluid text-center"}, [this._m("h3","Nič sa nezdá byť drahé na úver"),
                                                                               this._m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")]);

    this._map = new Map();
    this._map.set("Income", "income");
    this._map.set("Spends", "spend");
    this._map.set("Investments", "investment");
    this._map.set("spend", "addview");
    this._map.set("income", "addview");
    this._map.set("investment", "investview");
    this._map.set("change", "changeview");
    this._map.set("changeinvest", "changeinvestview");
    this._map.set("noise", "noiseview");
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
    let reportview = require("../js/views/reportview");
    let computeEngine = require("../js/computeEngine");
    let factory = require("../js/componentFactory");
    factory = new factory();
    let engine = 0;
    let view;
    let savings = 0;
    let range = 0;

    if (!e)
        return;

    switch(e.target.name)
    {
        case "main":
            if (e.request)
                this.mapToItems(e.request.data, e.request.type);

            view = factory.getComponent("mainview", this, e);
            break;
        case "report":
            savings = document.getElementsByTagName("input")[0].value;
            range = document.getElementsByTagName("select")[0].value;
            engine = new computeEngine(range, savings, this._items, this._noise);
            view = new reportview(this, this._m, engine);

            if (!engine.Valid)
                alert(engine._error);

            break;
        default:
            view = factory.getComponent(this._map.get(e.target.name), this, e);
            break;
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
