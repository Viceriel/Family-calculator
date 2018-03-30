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
        this._value = parseFloat(value);
        this._frequency = frequency;
        this._modifier = parseInt(modifier);
        this._valid = true;
        return;
      }

      this._valid = false;
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
