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
        let main = m("main", [m("h1[id=title]","Family calculator"),m("button", "Calculate"), m("p", "Marcelka")]);
        return main;
    }
}

module.exports = Main;
