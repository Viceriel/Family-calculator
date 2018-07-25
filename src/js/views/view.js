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
                                                                               m("button[name=spend]", {class: "btn btn-outline-success btn-custom-green", onclick: this.saveSavings.bind(this)},"Add spend")]);
        this._income = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Income"),
                                                                               m("button[name=income]", {class: "btn btn-outline-success btn-custom-green", onclick: this.saveSavings.bind(this)}, "Add income")]);
        this._investment = m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Investments"),
                                                                                   m("button[name=investment]", {class: "btn btn-outline-success btn-custom-green", onclick: this.saveSavings.bind(this)}, "Add investment")]);
        this._noise = m("div", {class: "row text-right lead"}, m("div", {class: "col-11"}, m("label", ["Noise:",
                                                                                                       m("span[id=noise]", {class: "fa fa-cog", onclick: this.noiseProcess.bind(this)})])));
        this._final = m("div", {class: "row text-right"}, m("div", {class: "col-11"}, [m("label",["Years:", m("select", [m("option", "1"),
                                                                                                                 m("option", "2"),
                                                                                                                 m("option", "3")])]),
                                                                                       m("button[name=report]", {class: "btn btn-outline-success btn-custom-yellow", onclick: this.saveSavings.bind(this)}, "Compute")]));

        if (request && request.length != 0)
        {
            let types = ["_spents", "_income", "_investment"];
            let types1 = ["spend", "income", "investment"];
            let len1 = types.length;
            for (let j = 0; j < len1; j++)
            {
                 let len = request[types1[j]].length;
                 for (let i = 0; i < len; i++)
                 {
                      this[types[j]].children.push(m("p", {class: "lead items", onclick: this.processChange.bind(this)}, [request[types1[j]][i]._name,
                                                                                                                          m("p", {class: "removal"} ,"x")]));
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
          if (e.target.previousSibling.nodeName == "#text")
          {
            let index = this.findIndex(e.target.parentNode);
            this.remove(e, index,  this._parent._map.get(e.target.parentNode.parentNode.childNodes[0].innerHTML));
          }
          else
          {
              let index = this.findIndex(e.target);

              e.target.name = "change";
              e.target.itemLocation = index;
              e.target.itemName = this._parent._map.get(e.target.parentNode.childNodes[0].innerHTML);
              if (e.target.itemName == "investment")
                  e.target.name += "invest";

              let save = document.getElementsByTagName("input")[0].value;
              if (!isNaN(save))
                  this._parent._savings = save;

              this._parent.changeView(e);
        }
      }

      saveSavings(e)
      {
        let save = document.getElementsByTagName("input")[0].value;
        if (!isNaN(save))
            this._parent._savings = save;

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
          let save = document.getElementsByTagName("input")[0].value;
          if (!isNaN(save))
              this._parent._savings = save;

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
                                                                                               m("input[type=text][value="+this._parent._savings+"]")]),
                                                      m("div", {class: "row text-center"}, [this._income,
                                                                                            this._spents,
                                                                                            this._investment]),
                                                      this._noise,
                                                      this._final]),
                                                      this._parent._footer];
          return main;
      }

      /**
       * Remove targeted item
       *
       * @param  {Object} e event object
       * @param  {Number} index index of item at data array
       * @param  {String} name name of data array division
       */
      remove(e, index, name)
      {
          if (confirm("Do you really want to remove selected data?"))
          {
              e.target.parentNode.parentNode.removeChild(e.target.parentNode);
              this._parent._items[name].splice(index, 1);
          }
      }

      /**
       * Find appropriate data to UI item
       *
       * @param  {Object} elem DOM element
       * @return {Number} element index at data array
       */
      findIndex(elem)
      {
          let children = elem.parentNode.childNodes;
          let index = 0;

          let len = children.length;
          for (let i = 2; i < len; i++)
          {
              if (elem == children[i])
              {
                  index = i - 2;
                  break;
              }
          }

          return index;
      }
}

module.exports = Main;
