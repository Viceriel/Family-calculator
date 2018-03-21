"use strict";

let add = require("../src/addview");

/**
 * Component for change item view
 */
class changeView extends add
{
  constructor(parent, m, item)
  {
    super(parent, m, "a");
    this._title = this._m("h3", "Change selected item");
    this._item = item;

    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of item],[value="+this._item._name+"],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of "+ this._look+"], [name=value]", this._item.value),
                                                            this._m("select[name=frequency]", [m("option", "Year"),
                                                                               m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier], [name=modifier]", this._item.modifier)]);

  }
}

module.exports = changeView;
