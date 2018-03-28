"use strict";

/**
 * Component represents noise view
 */
class NoiseView
{
    /**
     * Setting reference to parent and mithril
     *
     * @param {App} parent app class
     * @param {Mithril} m mmithril object
     * @param {Array} income array with income items
     */
    constructor(parent, m, income)
    {
        this._parent = parent;
        this._m = m;
        this._title = m("h3", {class: "text-center"},"Noise settings");

        let month_income = 0;
        let len = income.length;
        for (let i = 0; i < len; i++)
        {
          if (income[i]._frequency == "Month")
              month_income += income[i].value;
        }

        this._lower = parseInt(month_income / 50, 10);
        this._higher = parseInt(month_income / 20, 10);
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

    oncreate(vnode)
    {
      let d3 = require("d3");
      let mi = document.getElementsByTagName("main")[0];

      if (mi.offsetWidth < 1200)
      {
          alert("Sorry, no resolution, no graph.");
          return;
      }

      let width = 800;
      let height = 400;
      let x = d3.scaleLinear()
                .range([20, width])
                .domain([0, 50]);
      let y = d3.scaleLinear()
                .range([height - 20, 20]);

      d3.select("main")
        .append("svg");

      function make_x_gridlines()
      {
            return d3.axisBottom(x)
                     .ticks(5);
      }

      function make_y_gridlines()
      {
          return d3.axisLeft(y)
                   .ticks(5);
      }

      let svg = d3.select("svg");
      svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
                            .tickSize(-height));

      svg.append("g")
         .attr("class", "grid")
         .call(make_y_gridlines()
                               .tickSize(-width));

      svg.append("g")
         .attr("transform", "translate(60," + 0 + ")")
         .call(d3.axisLeft(y));

      let pos = height - 40;
      svg.append("g")
         .attr("transform", "translate(-10," + pos + ")")
         .call(d3.axisBottom(x));
    }

    view()
    {

      let main = [this._m("main", {class: "container begin"}, this._title),
                                                              this._m("footer", {class: "container-fluid text-center"}, [this._m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                                         this._m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
      return main;
    }
}

module.exports = NoiseView;
