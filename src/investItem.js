"use strict";
 let financeItem = require("../src/FinanceItem.js");

 /**
  * Class responsible for invest item handle. Derived from FinanceItem
  */
 class InvestItem extends financeItem
 {
   /**
    * Constructor of class. Also responsible for validation of inputs
    *
    * @param {String} name name of financial operation
    * @param {Number} value value of financial operation
    * @param {Number} frequency financial operation frequency value
    * @param {Number} modifier modifier of finance operation frequency
    * @param {Number} capital capital invested
    * @param {Number} increase expected increase of investment
    */
   constructor(name, value, frequency, modifier, capital, increase)
   {
     super(name, value, frequency, modifier);

     if (this._valid)
     {
       if (capital && increase)
       {
         this._capital = capital;
         this._increase = increase;
         return;
       }

       this._valid = false;
     }
   }
 }

 module.exports = InvestItem;
