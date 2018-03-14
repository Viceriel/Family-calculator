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
                                                       m("input[type=text],[placeholder=Size of income]", "Name"),
                                                       m("button",{class: "btn btn-outline-success"}, "Confirm")]),
                                                       m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
    return main;
  }
}

module.exports = AddView;
