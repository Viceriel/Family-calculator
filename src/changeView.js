"use strict";

let add = require("../src/addview");

/**
 * Component for change item view
 */
class changeView extends add
{
  /**
   * Constructor of changeview
   *
   * @param {App} parent instance of app class
   * @param {Mithril} m instance of mithril
   * @param {FinanceItem} item item which will be changed
   */
  constructor(parent, m, item)
  {
    super(parent, m, "a");
    this._title = this._m("h3", "Change selected item");
    this._item = item;
    let selection = ["", ""];
    if (this._item._frequency == "Year")
      selection[0] = "selected";
    else
      selection[1] = "selected";

    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of item],[value="+this._item._name+"],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of item],[value="+this._item._value+"] ,[name=value]", this._item.value),
                                                            this._m("select[name=frequency]", [m("option[selected="+selection[0]+"]", "Year"),
                                                                                               m("option[selected="+selection[1]+"]", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier],[value="+this._item._modifier+"],[name=modifier]")]);

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
    let request = [];
    let FinanceItem = require("../src/FinanceItem.js");

    this.removeInvalid(names, 1);
    request.push(new FinanceItem(names[0].value, values[0].value, frequency[0].value, modifiers[0].value));
    if (!request[0]._valid)
    {
      this.invalidDataMark(names[0]);
      return;
    }

    this._item.Name = names[0].value;
    this._item.Value = values[0].value;
    this._item.Frequency = frequency[0].value;
    this._item.Modifier = modifiers[0].value;

    this._parent.changeView(e);
  }
}

module.exports = changeView;
