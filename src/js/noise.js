"use strict";

/**
 * Class responsible for handling noise data
 */
class Noise
{
    /**
     * Constructor of noise class
     *
     * @param {String} high high border of noise spread
     * @param {String} low low border of noise spread
     * @param {Boolean} activity state of noise
     */
    constructor(high, low, activity)
    {
        if (high && low)
        {
          high = parseFloat(high);
          low = parseFloat(low);
        }
        if (this.validation(high, low, activity))
        {
          this._high = high;
          this._low = low;
          this._activity = activity;
          this._valid = true;

          let size = (this._high - this._low);
          this._mean = Math.round((size / 2)) - (-1 * this._low);
          this._std = Math.round(size / 100) * 20;
          return;
        }

        this._valid = false;
    }

    validation(high, low, activity)
    {
      if(typeof high != "number" || isNaN(high))
          return false;
      if(typeof low != "number" || isNaN(low))
          return false;

      return true;
    }
}

module.exports = Noise;
