"use strict";

let m = require("mithril");
//let d3 = require("d3");

/*
 * Class represents main view of page
 */
class Main
{
    constructor()
    {

    }

    /**
     * Function for creating mithril vnode represents main view of page
     *
     * @return{Object} mithril vnode corresponding to primary view
     */
    view()
    {
        let main = m("main", {class: "container"},
                     [m("h1[id=title]", {class: "text-center"}, "Family calculator"),
                      m("button", {class: "btn btn-outline-success"}, "Calculate"),
                      m("div", {class: "row text-center"}, [m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Income")),
                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Spents")),
                                                            m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Investments"))])]);
        return main;
    }
}

module.exports = Main;
