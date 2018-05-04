"use strict";
 let financeItem = require("../js/FinanceItem.js");

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
    * @param {String} frequency financial operation frequency value
    * @param {Number} modifier modifier of finance operation frequency
    * @param {Number} capital capital invested
    * @param {Number} increase expected increase of investment
    */
   constructor(name, value, frequency, modifier, capital, increase)
   {
     super(name, value, frequency, modifier);

     if (capital && increase)
     {
       capital = parseFloat(capital);
       increase = parseFloat(increase);
     }

     if (this._valid && this.validation(capital, increase))
     {
         this._capital = capital;
         this._increase = increase;
         return;
     }

       this._valid = false;
   }

   validation(capital, increase)
   {
     if (typeof capital != "number" || capital < 0 || isNaN(capital))
         return false;
     else if (typeof increase != "number" || isNaN(increase))
         return false;

     return true;
   }

   get Capital()
   {
     return this._capital;
   }

   set Capital(val)
   {
     this._capital = val;
   }

   get Increase()
   {
     return this._increase;
   }

   set Increase(val)
   {
     this._increase = val;
   }
 }

 module.exports = InvestItem;
