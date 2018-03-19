"use strict";

let m = require("mithril");

/**
 * Class represents main view of page
 */
class Main
{
    /**
     * Mainview class constructor. Creating view based on arguments
     *
     * @param {App} parent main class of application
     * @param {Array} request array of FinanceItems
     */
    constructor(parent, request)
    {
      this._parent = parent;
      this._spents = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Spents"),
                                                                             m("button[name=spent]", {class: "btn btn-outline-success btn-custom-green", onclick: this._parent.changeView.bind(this._parent)},"Add spent")]);
      this._income = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Income"),
                                                                             m("button[name=income]", {class: "btn btn-outline-success btn-custom-green", onclick: this._parent.changeView.bind(this._parent)}, "Add income")]);
      this._investment = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Investments"),
                                                                                 m("button", {class: "btn btn-outline-success btn-custom-green"}, "Add investment")]);
      if (request && request.length !=0)
      {
       let types = ["_spents", "_income"];
       let types1 = ["spent", "income"];
       let len1 = types.length;
       for (let j = 0; j < len1; j++)
       {
         let len = request[types1[j]].length;
         for (let i = 0; i < len; i++)
         {
           this[types[j]].children.push(m("p", {class: "lead"}, request[types1[j]][i]._name));
         }
       }
      }
    }

    /**
     * Mithril method called before component removal
     *
     * @param {vnode} vnode Tree of component's virtual nodes
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
     * Function for creating mithril vnode represents main view of page
     *
     * @return {Object} mithril vnode corresponding to primary view
     */
    view()
    {
        let main = [m("main", {class: "container begin"}, [m("h1[id=title]", {class: "text-center"}, "Family calculator"),
                                                    m("div", {class: "col-12 text-center"}, [m("h4[id=savings]", "Savings:"),
                                                                                             m("input[type=text]")]),
                                                    m("div", {class: "row text-center"}, [this._income,
                                                                                          this._spents,
                                                                                          this._investment])]),
                    m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                 m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
        return main;
    }
}

module.exports = Main;
