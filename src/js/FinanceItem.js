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
      if (value && modifier)
      {
          value = parseFloat(value);
          modifier = parseFloat(modifier);
      }
      if(this.validator(name, value, frequency, modifier))
      {
        this._name = name;
        this._value = parseFloat(value);
        this._frequency = frequency;
        this._modifier = parseInt(modifier);
        this._valid = true;
        return;
      }

      this._valid = false;
  }

  validator(name, value, frequency, modifier)
  {
    if(typeof name != "string" || name == "")
       return false;
    else if (typeof value != "number" || value <= 0 || isNaN(value))
       return false;
    else if (typeof frequency != "string" || (frequency != "Month" && frequency != "Year"))
       return false;
    else if (typeof modifier != "number" || modifier <= 0 || isNaN(modifier))
       return false;

    return true;
  }

  get Name()
  {
    return this._name;
  }

  set Name(val)
  {
    this._name = val;
  }

  get Value()
  {
    return this._value;
  }

  set Value(val)
  {
    this._value = val;
  }

  get Frequency()
  {
    return this._frequency;
  }

  set Frequency(val)
  {
    this._frequency = val;
  }

  get Modifier()
  {
    return this._modifier;
  }

  set Modifier(val)
  {
    this._modifier = val;
  }
}

module.exports = FinanceItem;
