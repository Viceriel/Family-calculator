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
        let main = m("div", [m("main", {class: "container"}, [m("h1[id=title]", {class: "text-center"}, "Family calculator"),
                                                    m("div", {class: "row text-center"}, [m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Income")),
                                                                                          m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Spents")),
                                                                                          m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-12"}, m("h2", "Investments"))])]),
                            m("footer", {class: "container-fluid text-center"}, [m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                 m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. There is also effort for creating neural family finance predictor. In case of problems, please contact me at viceriel@gmail.com.")])]);                                                                
        return main;
    }
}

module.exports = Main;
