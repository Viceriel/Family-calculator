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
        if (this._valid)
            this._compute_engine.integrate();
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
        e.target.name = "main";
        this._parent.changeView(e);
    }

    oncreate()
    {
      setTimeout(()=>
      {
          let main = document.getElementsByTagName("main")[0];
          const WIDTH = main.offsetWidth - 40;
          const HEIGHT = parseInt(WIDTH / 2, 10);

          let d3 = require("d3");
          let dataset = this._compute_engine.IntegratedWhealth;
          const LEN = dataset.data.length;

          let x = d3.scaleLinear()
                     .range([50, WIDTH - 25])
                     .domain([0, LEN-1]);
          let y = d3.scaleLinear()
                    .range([HEIGHT - 40, 20])
                    .domain([dataset.min, dataset.max]);

          d3.select("main")
               .append("svg")
              .attr("width", WIDTH)
              .attr("height", HEIGHT);

          let svg = d3.select("svg");
          let line = d3.line()
                        .x((d, i)=>{return x(i);})
                        .y((d)=>{return y(d);});

          svg.append("path")
                 .data([dataset.data])
                 .attr("class", "line1")
                 .attr("d", line);

          let pos = HEIGHT - 40;
          svg.append("g")
                .attr("transform", "translate(0," + pos + ")")
                .call(d3.axisBottom(x));

          svg.append("g")
             .attr("transform", "translate(50, 0)")
             .call(d3.axisLeft(y));

             function make_x_gridlines()
             {
                   return d3.axisBottom(x)
                            .ticks(8);
             }

             function make_y_gridlines()
             {
                 return d3.axisLeft(y)
                          .ticks(8);
             }

             svg.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + HEIGHT + ")")
                .call(make_x_gridlines()
                      .tickSize(-HEIGHT));

              svg.append("g")
                  .attr("class", "grid")
                  .call(make_y_gridlines()
                        .tickSize(-WIDTH));

              svg.append("text")
                   .attr("transform", "rotate(-90)")
                   .attr("y", "15")
                   .attr("x", -(HEIGHT/2))
                   .text("Wealth[-]");

              svg.append("text")
                     .attr("x", (WIDTH-75)/2)
                     .attr("y", (HEIGHT-10))
                     .text("Months");

              svg.selectAll("circle")
                   .data(dataset.data)
                   .enter().append("circle")
                   .attr("r", "3.5")
                   .attr("cx", (d, i)=>{return x(i);})
                   .attr("cy", (d)=>{return y(d);});

              svg = d3.select("main")
                       .append("svg")
                       .attr("width", WIDTH)
                       .attr("height", HEIGHT);

             let dat = this._compute_engine.IntegratedIncomes;
             let datas = [dataset.data, dat];

             let gs = svg.selectAll("path")
                .data(datas).enter()
                .append("g");

          let color = d3.scaleOrdinal()
                  .range(["#FF0000", "#009933" , "#0000FF"]);

            gs.append("path")
            .attr("class", "line1")
            .attr("d", line)
            .style("stroke", function(d) { return color(d);});
      }, 500);
    }

    /**
     * Layout of report view
     *
     * @return {Array} mithril components array
     */
    view()
    {
      let m = this._m;
      let main = [m("main", {class: "begin container"}, [this._back,
                                                         m("h3", {class: "text-center"}, "Report")]),
                                                         this._parent._footer];
      return main;
    }
}

module.exports = ReportView;
