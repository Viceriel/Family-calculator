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
    let main = m("main", {class: "begin container"}, [m("h3","Add income:"),
                                                       m("input[type=text]", "Name")]);
    return main;
  }
}

module.exports = AddView;
