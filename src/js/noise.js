"use strict";

/**
 * Class responsible for handling noise data
 */
class Noise
{
    /**
     * Constructor of noise class
     */
    constructor()
    {
    }

    set Borders(val)
    {
      if (this.validate(val))
      {
          this._low = val[0];
          this._high = val[1];

          if (!this.calculate())
              this._valid = false;
          else
          {
              this._valid = true;
          }
      }
      else
          this._valid = false;
    }
    /**
     * Calculate mean and standard deviation from provided borders
     */
    calculate()
    {
      this._size = (this._high - this._low);
      if (this._size < 20)
      {
          this._error = "Spread between low and high border value based on your monthly income is low! Please find a better job!";
          return false;
      }

      this._mean = Math.round((this._size / 2)) - (-1 * this._low);
      this._std = Math.round(this._size / 100) * 20;
      let d3 = require("d3");
      this.Normal = d3.randomNormal(Math.round(this._mean), Math.round((this._size / 100) * 20));
      return true;
    }

    /**
     * Validate provided input values
     *
     * @param  {Array} val array with values
     * @return {Boolean}
     */
    validate(val)
    {
      if (!Array.isArray(val) || val.length != 2)
      {
          this._error = "Inappropriate length of array";
          return false;
      }

      val[0] = parseFloat(val[0]);
      val[1] = parseFloat(val[1]);

      if (isNaN(val[0]) || isNaN(val[1]))
      {
          this._error = "Some values are not a number";
          return false;
      }

      return true;
    }

}

module.exports = Noise;
