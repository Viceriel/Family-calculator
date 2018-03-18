"use strict";

/**
 * Mithril components serves as add item window
 */
class AddView
{
  constructor(parent, m)
  {
    this._parent = parent;
    this._m = m;
    this._button = this._m("button", {class: "btn btn-outline-success", onclick: this.removeBtn.bind(this)}, "Confirm");
    this._row = this._m("div", {class: "row text-center"}, [this._m("input[type=text],[placeholder=Value of spents]"),
                                                            this._m("select", [m("option", "Year"),
                                                                               m("option", "Month")]),
                                                            this._m("input[type=text],[placeholder=Modifier]"),                   
                                                            this._button]);
  }

  removeBtn()
  {
    let btn = document.getElementsByTagName("button")[0];
    let par = btn.parentNode;
    par.removeChild(btn);
    par = par.parentNode;
    let div = document.createElement("div");
    par.parentNode.appendChild(div);
    this._m.render(par.nextSibling, this._row);
  }

  onbeforeremove(vnode)
  {
      vnode.dom.classList.add("exit");
      return new Promise((resolve)=>
      {
          setTimeout(resolve, 250);
      });
  }

  view()
  {
    let m = this._m;
    let main = [m("main", {class: "begin container"}, [m("h3","Add income:"),
                                                       m("div", this._row)]),
                                                       m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
    return main;
  }
}

module.exports = AddView;
