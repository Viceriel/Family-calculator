"use strict";

class FinanceItem
{
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
