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
    constructor(parent, m, income, size, noise)
    {
        this._parent = parent;
        this._m = m;
        this._title = m("h3", {class: "text-center"},"Noise settings");
        this._noise = noise;

        let month_income = 0;
        let len = income.length;
        for (let i = 0; i < len; i++)
        {
          if (income[i].Frequency == "Month")
              month_income += income[i].Value * income[i].Modifier;
        }

        if (!this._noise.Active)
            noise.Borders = [parseInt(-month_income / 50, 10), parseInt(month_income / 20, 10)];

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
        else if (!noise._valid)
        {
            alert(noise._error);
            this._valid = false;
            return;
        }

        this._valid = true;
        this._svg = m("svg", {class: "svge"});
        this._samples = 6000000;

        let disable = "";
        if (!this._noise.Active)
            disable = "[disabled]";
        this._row = m("div", {class: "row text-center"}, [m("input[placeholder=Low border],[value="+parseInt(this._noise._low)+"],"+disable),
                                                            m("input[placeholder=High border],[value="+parseInt(this._noise._high)+"],"+disable),
                                                            m("button"+disable, {class: "btn btn-outline-success btn-custom-green", onclick: this.recalculate.bind(this)}, "Calculate")]);
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
            setTimeout(resolve, 250);
        });
    }

    /**
     * Manipulating with svg, creating grid, axis and painting dataset
     */
    oncreate()
    {
      let d3 = require("d3");
      let [dat, max] = this._noise.createDataset(this._samples);

      let width = 800;
      let height = 420;
      let x = d3.scaleLinear()
                .range([25, width - 15])
                .domain([this._noise._low, this._noise._high]);
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

    /**
     * Processing user provided high and low values
     */
    recalculate(e)
    {
      e.redraw = false;
      let data = document.getElementsByTagName("input");
      this._noise.Borders = [data[1].value, data[2].value];

      if (this._noise._valid)
      {
          let d3 = require("d3");
          d3.select("svg").selectAll("*").remove();
          this.oncreate();
      }
      else
        alert(this._noise._error);

    }

    /**
     * Layout of noiseview component
     *
     * @return {Array}
     */
    view()
    {
      let main_class = "container begin";
      let check_state = "[checked]";
      if (!this._noise.Active)
      {
          main_class = "container begini inactive";
          check_state = "";
      }

      let main = [this._m("main", {class: main_class}, [this._title,
                                                        this._m("div", {class: "col-12 text-right"}, this._m("label", {class: "switch"},[this._m("input[type=checkbox],"+check_state+""),
                                                                                                                                         this._m("span", {class: "slider round",  onclick: this.noiseService.bind(this)})])),
                                                               this._svg,
                                                               this._row,
                                                               this._m("button[name=main]", {class: "btn btn-outline-success btn-custom-yellow", onclick: this._parent.changeView.bind(this._parent), style: "opacity:1"}, "Accept")]),
                                                               this._m("footer", {class: "container-fluid text-center"}, [this._m("h3","Nič sa nezdá byť drahé na úver"),
                                                                                                                         this._m("div", {class: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 lead text-left"}, "Project serves for family financial planning. In case of problems, please contact me at viceriel@gmail.com.")])];
      return main;
    }

    /**
     * Noise switch click handler
     * @param {Object} e event object
     */
    noiseService(e)
    {
      e.redraw = false;
      this._noise.Active = !this._noise.Active;
      let main = document.getElementsByTagName("main")[0];
      let inputs = document.getElementsByTagName("input");
      let button = document.getElementsByTagName("button")[0];
      if (this._noise.Active)
      {
        main.style.opacity = 1;
        inputs[1].disabled = false;
        inputs[2].disabled = false;
        button.disabled = false;
      }
      else
      {
        main.style.opacity = 0.5;
        inputs[1].disabled = true;
        inputs[2].disabled = true;
        button.disabled = true;
      }
    }
}

module.exports = NoiseView;
