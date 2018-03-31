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
     * @param {Number} size size of main container
     */
    constructor(parent, m, income, size)
    {
        this._parent = parent;
        this._m = m;
        this._title = m("h3", {class: "text-center"},"Noise settings");

        let month_income = 0;
        let len = income.length;
        for (let i = 0; i < len; i++)
        {
          if (income[i].Frequency == "Month")
              month_income += income[i].Value;
        }

        this._lower = parseInt(-month_income / 50, 10);
        this._higher = parseInt(month_income / 20, 10);

        if (month_income <=  0)
        {
            alert("Your month income is "+ month_income+" which is inappropriate");
            this._valid = false;
            return;
        }
        else if (size < 1200)
        {
            alert("No resolution, no graph!");
            this._valid = false;
            return;
        }
        else if (!this.spreadCheck())
        {
            alert("Spread between low and high border value based on your monthly income is low! Please find a better job!");
            this._valid = false;
            return;
        }

        this._valid = true;
        this._svg = m("svg");
        this._samples = 6000000;
        this._row = m("div", {class: "row text-center"}, [m("input[placeholder=Low border],[value="+parseInt(this._lower)+"]"),
                                                            m("input[placeholder=High border],[value="+parseInt(this._higher)+"]"),
                                                            m("button", {class: "btn btn-outline-success btn-custom-green", onclick: this.recalculate.bind(this)}, "Calculate")]);
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
     * Method responsible for creating histogram from range low to high
     *
     * @return {Array} created dataset
     */
    createDataset()
    {
        let d3 = require("d3");
        let size = (this._higher - this._lower);
        let mean = Math.round((size / 2)) - (-1 * this._lower);
        let normal = d3.randomNormal(Math.round(mean), Math.round((size / 100) * 20));
        let dataset = [];

        for (let i = this._lower; i <= this._higher; i++)
        {
          let index = i + (-1 * this._lower);
          dataset[index] = [];
          dataset[index][0] = i;
          dataset[index][1] = 0;
        }

        for (let i = 0; i < this._samples; i++)
        {
          let index = Math.round(normal());
          if (index >= this._lower && index < (this._higher + 1))
          {
            index += (-1 * this._lower);
            dataset[index][1] += 1;
          }
        }

        return [dataset, Math.round((size / 2))];
    }

    /**
     * Manipulating with svg, creating grid, axis and painting dataset
     *
     * @param {Object} vnode virtual node
     */
    oncreate(vnode)
    {
      let d3 = require("d3");
      let mi = document.getElementsByTagName("main")[0];
      let [dat, max] = this.createDataset();

      let width = 800;
      let height = 420;
      let x = d3.scaleLinear()
                .range([25, width - 15])
                .domain([this._lower, this._higher]);
      let y = d3.scaleLinear()
                .range([height - 20, 20])
                .domain([0, dat[max][1]/this._samples]);

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
         .attr("transform", "translate(25, 0)")
         .call(d3.axisLeft(y));

      let pos = height - 20;
      svg.append("g")
         .attr("transform", "translate(0," + pos + ")")
         .call(d3.axisBottom(x));

      let line = d3.line()
                       .x((d)=>{return x(d[0]);})
                       .y((d)=>{return y(d[1] / this._samples);});

      svg.append("path")
         .data([dat])
         .attr("class", "line")
         .attr("d", line);
    }

    spreadCheck()
    {
      if (this._higher - this._lower > 20)
          return true;

      return false;
    }

    recalculate()
    {
      let data = document.getElementsByTagName("input");
      this._lower = parseFloat(data[0].value);
      this._higher = parseFloat(data[1].value);

      if (this._higher - this._lower > 20)
      {
          let d3 = require("d3");
          d3.select("svg").selectAll("*").remove();
          this.oncreate();
      }
      else
        alert("Spread of numbers provided by your border values selection is too low!");

    }

    view()
    {

      let main = [this._m("main", {class: "container begin"}, [this._title,
                                                              this._svg,
                                                              this._row]),
                                                              this._m("footer", {class: "container-fluid text-center"}, [this._m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                                         this._m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
      return main;
    }
}

module.exports = NoiseView;
