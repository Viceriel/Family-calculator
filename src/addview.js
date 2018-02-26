"use strict";

let m = require("mithril");

/**
 * Mithril components serves as add item window
 */
class AddView
{
  constructor(name)
  {
    this._name = name;
  }

  oncreate()
  {
    alert(this._name);
  }
  view()
  {
    let main = m("main", {class: "container"}, m("h3","Add income:"));
    return main;
  }
}

module.exports = AddView;
