"use strict";

let add = require("../views/investView.js");

/**
 * Component represents change of the invest view
 */
class ChangeInvestView extends add
{
  constructor(parent, m, item)
  {
    super(parent, m);
    this._item = item;
    this._title = m("h3", "Change selected investment");

    let selection = ["",""];
    if (this._item._frequency == "Year")
      selection[0] = "selected";
    else
      selection[1] = "selected";

    this._save = m("div", {class: "row"}, m("input[type=text],[placeholder=Actual ammount of capital],[name=capital],[value="+this._item._capital+"]"));
    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of spent],[name=name],[value="+this._item._name+"]"),
                                                            this._m("input[type=text],[placeholder=Value of spents],[name=value],[value="+this._item._value+"]"),
                                                            this._m("select[name=frequency]", [m("option[selected="+selection[0]+"]", "Year"),
                                                                                               m("option[selected="+selection[1]+"]", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier],[name=modifier],[value="+this._item._modifier+"]"),
                                                            this._m("input[type=text],[placeholder=Expected increase per year],[name=increase],[value="+this._item._increase+"]")]);
  }

  /**
   * Event handler for confirm button onclick
   *
   * @param {Object} e Event Object
   */
  processItems(e)
  {
    let names = document.getElementsByName("name");
    let values = document.getElementsByName("value");
    let frequency = document.getElementsByName("frequency");
    let modifiers = document.getElementsByName("modifier");
    let capitals = document.getElementsByName("capital");
    let increases = document.getElementsByName("increase");
    let request = [];
    let InvestItem = require("../../js/investItem.js");

    this.removeInvalid(names, 1);
    request.push(new InvestItem(names[0].value, values[0].value, frequency[0].value, modifiers[0].value, capitals[0].value, increases[0].value));
    if (!request[0]._valid)
    {
      this.invalidDataMark(names[0]);
      return;
    }

    this._item.Name = names[0].value;
    this._item.Value = values[0].value;
    this._item.Frequency = frequency[0].value;
    this._item.Modifier = modifiers[0].value;
    this._item.Capital = capitals[0].value;
    this._item.Increase = increases[0].value;

    this._parent.changeView(e);
  }
}

module.exports = ChangeInvestView;
