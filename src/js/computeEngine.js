"use strict";

class ComputeEngine
{
   /**
    * Create instance of compute engine
    *
    * @param {Number} range time range for compuations
    * @param {Number} savings current amount of saings or debt
    * @param {Object} data    object with income, spends, investmens data
    * @param {Noise} noise    chosen noise distribution
    */
   constructor(range, savings, data, noise)
   {
       this._range = range;
       this._data = data;
       this._savings = savings;
       this._noise = noise;
       this._year_ratio = 0;
       this._month_ratio = 0;
       this._integrated_incomes = [];
       this._integrated_investments = [];
   }

   get IntegratedIncomes()
   {
       return this._integrated_incomes;
   }

   get IntegratedInvestments()
   {
       return this._integrated_investments;
   }
}

module.exports = ComputeEngine;
