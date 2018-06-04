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
    this._valid = true;
    this._look = look;
    this._m = m;
    this._back = m("span[id=back]", {class: "fa fa-arrow-circle-o-left", onclick: this.back.bind(this)});
    this._title = this._m("h3", "Add " + look);
    this._button_next = this._m("button", {class: "btn btn-outline-success btn-custom-green", onclick: this.removeBtn.bind(this)}, "Next");
    this._button_confirm = this._m("button[name=main]", {class: "btn btn-outline-success btn-custom-yellow", onclick: this.processItems.bind(this)}, "Confirm");
    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of "+ this._look+"],[name=name]"),
                                                            this._m("input[type=text],[placeholder=Value of "+ this._look+"], [name=value]"),
                                                            this._m("select[name=frequency]", [m("option", "Year"),
                                                                               m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier], [name=modifier]"),
                                                            this._button_next]);
  }

  get Valid()
  {
    return this._valid;
  }

  /**
   * Process operation back to default view
   *
   * @param  {Object} e event object
   */
  back(e)
  {
      if (confirm("Do you really want go back to default view? All your unconfirmed data will be lost."))
      {
          e.target.name = "main";
          this._parent.changeView(e);
      }
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
    let regular_row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Name of "+ this._look+"],[name=name]"),
                                                                  this._m("input[type=text],[placeholder=Value of "+ this._look+"], [name=value]"),
                                                                  this._m("select[name=frequency]", [this._m("option", "Year"),
                                                                                                     this._m("option", "Month")]),
                                                                  this._m("input[type=text],[placeholder=Modifier], [name=modifier]"),
                                                                  this._m("p",{class: "removal1", onclick: this.remoweRow.bind(this)}, "X"),
                                                                  this._button_next]);
    this._m.render(par.nextSibling, regular_row);
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
              e.target.parentNode.parentNode.previousSibling.firstChild.appendChild(btn[0]);
          }
          e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
      }
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
   * Method responsiblo for marking user input with invalid data
   *
   * @param {Element} element element from group with invalid data
   */
  invalidDataMark(element)
  {
    alert("Please correct data provided at marked input");
    let parent = element.parentNode.parentNode;
    if (!parent.classList.contains("invalid"))
      parent.classList.add("invalid");
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
    let FinanceItem = require("../../js/FinanceItem.js");

    let len = names.length;
    this.removeInvalid(names, len);
    for (let i = 0; i < len; i++)
    {
      request.push(new FinanceItem(names[i].value, values[i].value, frequency[i].value, modifiers[i].value));
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
   * Method responsible for removing invalid mark after confirm button
   *
   * @param {Array} divs array of input elements
   * @param {Number} len div array length
   */
   removeInvalid(names, len)
   {
     for (let i = 0; i < len; i++)
     {
       if (names[i].parentNode.parentNode.classList.contains("invalid"))
         names[i].parentNode.parentNode.classList.remove("invalid");
     }
   }

  /**
   * Function representing the component. Addview layout
   *
   * @return {Array} addview layout array elements
   */
  view()
  {
    let m = this._m;
    let main = [m("main", {class: "begin container"}, [this._back,
                                                       this._title,
                                                       m("div", this._row),
                                                       this._button_confirm]),
                                                       this._parent._footer];
    return main;
  }
}

module.exports = AddView;
