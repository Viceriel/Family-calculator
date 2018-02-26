"use strict";

let m = require("mithril");
let mainview = require("../src/view.js");
let addview = require("../src/addview");

let a = new mainview();
let b = new addview("marcelka");

m.route(document.body, "/home",
                                {
                                  "/home": a,
                                  "/add": b,
                                });
