"use strict";

let m = require("mithril");

/**
 * Class represents main view of page
 */
class Main
{
    constructor()
    {

    }

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
     * @return{Object} mithril vnode corresponding to primary view
     */
    view()
    {
        let main = [m("main", {class: "container begin"}, [m("h1[id=title]", {class: "text-center"}, "Family calculator"),
                                                    m("div", {class: "col-12 text-center"}, [m("h4[id=savings]", "Savings:"),
                                                                                             m("input[type=text]")]),
                                                    m("div", {class: "row text-center"}, [m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Income"),
                                                                                                                                                  m("button", {class: "btn btn-outline-success btn-custom-green"}, "Add income")]),
                                                                                          m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Spents"),
                                                                                                                                                  m("a[href=/add]", {oncreate: m.route.link}, m("button", {class: "btn btn-outline-success btn-custom-green"},"Add spent"))]),
                                                                                          m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, [m("h2", "Investments"),
                                                                                                                                                  m("button", {class: "btn btn-outline-success btn-custom-green"}, "Add investment")])])]),
                    m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                 m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
        return main;
    }
}

module.exports = Main;
