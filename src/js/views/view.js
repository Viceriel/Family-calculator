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
      this._valid = true;
      this._spents = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Spends"),
                                                                             m("button[name=spend]", {class: "btn btn-outline-success btn-custom-green", onclick: this._parent.changeView.bind(this._parent)},"Add spend")]);
      this._income = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Income"),
                                                                             m("button[name=income]", {class: "btn btn-outline-success btn-custom-green", onclick: this._parent.changeView.bind(this._parent)}, "Add income")]);
      this._investment = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Investments"),
                                                                                 m("button[name=investment]", {class: "btn btn-outline-success btn-custom-green", onclick: this._parent.changeView.bind(this._parent)}, "Add investment")]);
      this._noise = m("div", {class: "row text-right lead"}, m("div", {class: "col-11"}, m("label", ["Noise:",
                                                                                                m("span[id=noise]", {class: "fa fa-cog", onclick: this.noiseProcess.bind(this)})])));

      if (request && request.length !=0)
      {
       let types = ["_spents", "_income", "_investment"];
       let types1 = ["spend", "income", "investment"];
       let len1 = types.length;
       for (let j = 0; j < len1; j++)
       {
         let len = request[types1[j]].length;
         for (let i = 0; i < len; i++)
         {
           this[types[j]].children.push(m("p", {class: "lead items", onclick: this.processChange.bind(this)}, request[types1[j]][i]._name));
         }
       }
      }
    }

    get Valid()
    {
      return this._valid;
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
            setTimeout(resolve, 300);
        });
    }

    /**
     * Method responsible for processing change item request
     *
     * @param {Object} e event object
     */
    processChange(e)
    {
       let children = e.target.parentNode.childNodes;
       let index = 0;

       let len = children.length;
       for (let i = 2; i < len; i++)
       {
         if (e.target == children[i])
         {
            index = i - 2;
            break;
         }
       }

       e.target.name = "change";
       e.target.itemLocation = index;
       e.target.itemName = this._parent._map.get(children[0].innerHTML);
       if (e.target.itemName == "investment")
           e.target.name += "invest";

       this._parent.changeView(e);
    }

    /**
     * Process the request from noise span
     *
     * @param {Object} e event object
     */
    noiseProcess(e)
    {
        e.target.name = e.target.id;
        let main = document.getElementsByTagName("main")[0];
        e.mainsize = main.offsetWidth;
        this._parent.changeView(e);
    }

    /**
     * Function for creating mithril vnode represents main view of page
     *
     * @return {Array} mithril vnodes corresponding to primary view
     */
    view()
    {
        let main = [m("main", {class: "container begin"}, [m("h1[id=title]", {class: "text-center"}, "Family calculator"),
                                                    m("div", {class: "col-12 text-center"}, [m("h4[id=savings]", "Savings:"),
                                                                                             m("input[type=text]")]),
                                                    m("div", {class: "row text-center"}, [this._income,
                                                                                          this._spents,
                                                                                          this._investment]),
                                                    this._noise]),
                    m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                 m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
        return main;
    }
}

module.exports = Main;
