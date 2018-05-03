"use strict";

let add = require("../views/addview");

/**
 * Invest view class derived from addview class
 */
class InvestView extends add
{
  /**
   * Constructor of derived class. Calling constructor of base class
   *
   * @param {Object} parent parent class
   * @param {Object} m mithril object
   */
  constructor(parent, m)
  {
    super(parent, m, "investment");
    this._save = m("div", {class: "row"}, m("input[type=text],[placeholder=Actual ammount of capital],[name=capital]"));
    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of spent],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of spents], [name=value]"),
                                                            this._m("select[name=frequency]", [m("option", "Year"),
                                                                               m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier], [name=modifier]"),
                                                            this._m("input[type=text],[placeholder=Expected increase per year], [name=increase]"),
                                                            this._button_next]);
  }

  /**
   * Handler for button onclick function
   */
  removeBtn()
  {
    let btn = document.getElementsByTagName("button")[0];
    let btn1 = document.getElementsByTagName("button")[1];
    let par = btn.parentNode;
    par.removeChild(btn);
    par = par.parentNode;
    let div = document.createElement("div");
    par.parentNode.insertBefore(div, btn1);
    let regular_row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of spent],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of spents], [name=value]"),
                                                            this._m("select[name=frequency]", [this._m("option", "Year"),
                                                                                               this._m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier], [name=modifier]"),
                                                            this._m("input[type=text],[placeholder=Expected increase per year], [name=increase]"),
                                                            this._m("p",{class: "removal1", onclick: this.remoweRow.bind(this)}, "X"),
                                                            this._button_next]);
    this._m.render(par.nextSibling, [this._save, regular_row]);
  }

  /**
   * Remove row from view
   *
   * @param  {Object} e event object
   */
  remoweRow(e)
  {
      let btn = e.target.parentNode.getElementsByTagName("button");

      if (confirm("Removal can erase your data."))
      {
          if (btn.length != 0)
          {
              e.target.parentNode.parentNode.previousSibling.firstChild.nextSibling.appendChild(btn[0]);
          }
          e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
      }
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

    let len = names.length;
    this.removeInvalid(names, len);
    for (let i = 0; i < len; i++)
    {
      request.push(new InvestItem(names[i].value, values[i].value, frequency[i].value, modifiers[i].value, capitals[i].value, increases[i].value));
      if (!request[i]._valid)
      {
        this.invalidDataMark(names[i]);
        return;
      }
    }

    e.target.disabled = true;
    e.request = {};
    e.request.data = request;
    e.request.type = this._look;
    this._parent.changeView(e);
  }

  /**
   * view method defining layout
   *
   * @return {Array} layout elements
   */
  view()
  {
    let m = this._m;
    let main = [m("main", {class: "begin container"}, [this._back,
                                                       this._title,
                                                       m("div", [this._save, this._row]),
                                                       this._button_confirm]),
                                                       m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
    return main;
  }
}

module.exports = InvestView;
