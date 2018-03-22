"use strict";

/**
 * Class responsible for finance operation handling
 */
class FinanceItem
{
  /**
   * Constructor of class. Also responsible for validation of inputs
   *
   * @param {String} name name of financial operation
   * @param {Number} value value of financial operation
   * @param {String} frequency financial operation frequency value
   * @param {Number} modifier modifier of finance operation frequency
   */
  constructor(name, value, frequency, modifier)
  {
      if(name && value && frequency && modifier)
      {
        this._name = name;
        this._value = value;
        this._frequency = frequency;
        this._modifier = modifier;
        this._valid = true;
        return;
      }

      this._valid = false;
  }
}

module.exports = FinanceItem;
