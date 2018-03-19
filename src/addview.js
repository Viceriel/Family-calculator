"use strict";

/**
 * Mithril components serves as add item window
 */
class AddView
{
  /**
   * Assigne parent and mithril. Create layout components.
   * @param {App} parent parent class
   * @param {Mithril} m Mithril class
   * @param {String} look view organisation
   */
  constructor(parent, m, look)
  {
    this._parent = parent;
    this._look = look;
    this._m = m;
    this._title = this._m("h3", "Add " + look);
    this._button_next = this._m("button", {class: "btn btn-outline-success btn-custom-green", onclick: this.removeBtn.bind(this)}, "Next");
    this._button_confirm = this._m("button[name=main]", {class: "btn btn-outline-success btn-custom-yellow", onclick: this.processItems.bind(this)}, "Confirm");
    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of spent],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of spents], [name=value]"),
                                                            this._m("select[name=frequency]", [m("option", "Year"),
                                                                               m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier], [name=modifier]"),
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
    this._m.render(par.nextSibling, this._row);
  }

  /**
   * Function called by Mithril before component removal. Responsible for remove animation.
   *
   * @param {vnode} vnode
   */
  onbeforeremove(vnode)
  {
      vnode.dom.classList.add("exit");
      return new Promise((resolve)=>
      {
          setTimeout(resolve, 250);
      });
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
    let FinanceItem = require("../src/FinanceItem.js")

    let len = names.length;
    for (let i = 0; i < len; i++)
    {
      request.push(new FinanceItem(names[i].value, values[i].value, frequency[i].value, modifiers[i].value));
      if (!request[i]._valid)
        return;
    }

    e.request = {};
    e.request.data = request;
    e.request.type = this._look;
    this._parent.changeView(e);
  }

  /**
   * Function representing the component. Addview layout
   *
   * @return {Array}
   */
  view()
  {
    let m = this._m;
    let main = [m("main", {class: "begin container"}, [this._title,
                                                       m("div", this._row),
                                                       this._button_confirm]),
                                                       m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
    return main;
  }
}

module.exports = AddView;
