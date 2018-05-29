"use strict";

class Factory
{
    constructor()
    {
      this._mainview = require("../js/views/view");
      this._addview =  require("../js/views/addview");
      this._investview = require("../js/views/investView");
      this._changeview = require("../js/views/changeView");
      this._changeinvestview = require("../js/views/changeInvestView");
      this._noiseview = require("../js/views/noiseview");
      this._reportview = require("../js/views/reportview");
      this._computeEngine = require("../js/computeEngine");
    }

    /**
     * Get desired class based on input string
     *
     * @param  {String} component desired component
     * @return {Object}           desired class
     */
    getComponent(component, parent, e)
    {
        switch(component)
        {
            case "mainview":
                return new this[`_${component}`](parent, parent._items);
            case "addview":
                return new this[`_${component}`](parent, parent._m, e.target.name);
            case "noiseview":
                return new this[`_${component}`](parent, parent._m, parent._items["income"], e.mainsize, parent._noise);
            case "investview":
                return new this[`_${component}`](parent, parent._m);
            case "changeview":
                return new this[`_${component}`](parent, parent._m, parent._items[e.target.itemName][e.target.itemLocation]);
            case "changeinvestview":
                return new this[`_${component}`](parent, parent._m, parent._items[e.target.itemName][e.target.itemLocation]);
            default:
                 return 0;
        }
    }
}

module.exports = Factory;
