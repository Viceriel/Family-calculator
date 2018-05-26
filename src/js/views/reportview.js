"use strict";

class ReportView
{
    /**
     * Constructor of report view class
     *
     * @param {App} parent parent class object
     * @param {Mithril} m mithril class object
     * @param {ComputeEngine} compute_engine valid compute engine object
     */
    constructor(parent, m, compute_engine)
    {
        this._compute_engine = compute_engine;
        this._m = m;
        this._parent = parent;
        this._back = m("span[id=back]", {class: "fa fa-arrow-circle-o-left", onclick: this.back.bind(this)});
        this._valid = this._compute_engine.Valid;
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
     * Layout of report view
     *
     * @return {Array} mithril components array
     */
    view()
    {
      let m = this._m;
      let main = [m("main", {class: "begin container"}, [this._back]),
                  m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                       m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
      return main;
    }
}

module.exports = ReportView;
