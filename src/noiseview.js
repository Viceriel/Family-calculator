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
        month_income = 0;

        let len = income.length;
        for (let i = 0; i < len; i++)
        {
          if (income[i]._frequency == "Month")
              month_income += income[i].value;
        }

        this._lower = parseInt(month_income / 50, 10);
        this._higher = parseInt(month_income / 50, 10);
    }

    view()
    {
      
    }
}

module.exports = NoiseView;
