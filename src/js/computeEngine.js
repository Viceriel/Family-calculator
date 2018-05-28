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
       range = parseInt(range);
       if (isNaN(range))
       {
           this._valid = false;
           this._error = "Wrong range.";
           return;
       }
       this._range = range;

       if (!data)
       {
         this._valid = false;
         this._error = "No items provided!";
         return;
       }
       this._data = data;

       savings = parseInt(savings);
       if (isNaN(savings))
       {
         this._valid = false;
         this._error = "Wrong savings provided!";
         return;
       }
       this._savings = savings;
       this._noise = noise;
       this._year_ratio = 0;
       this._month_ratio = 0;
       this._integrated_incomes = [];
       this._integrated_investments = [];
       this._integrated_wealth = {};
       this._integrated_wealth.data = [];
       this._integrated_wealth.min;
       this._integrated_wealth.max;
       this._valid = true;

       let len = this._data.investment.length;
       for (let i = 0; i < len; i++)
            this._integrated_investments[i] = [];

   }

   get Valid()
   {
     return this._valid;
   }

   get IntegratedIncomes()
   {
       return this._integrated_incomes;
   }

   get IntegratedInvestments()
   {
       return this._integrated_investments;
   }

   get IntegratedWhealth()
   {
      return this._integrated_wealth;
   }

   /**
    * Integrate all income based on spends, incomes and investments
    */
   integrate()
   {
       let size = this._range * 12;
       this.integrations(size);
   }

   /**
    * Control finance integration
    *
    * @param  {Number} size time scale for finance data integration
    */
   integrations(size)
   {
       let batch = this._savings;
       let invest_year = 0;
       for(let i = 1; i <= size; i++)
       {
           let index = i - 1;
           let increment = this.computeBatch("income", "Month") - this.computeBatch("spend", "Month") - this.computeMonthInvest(i) - this._noise.Normal();
           if( i % 12 == 0)
           {
             increment += this.computeBatch("income", "Year") - this.computeBatch("spend", "Year") - this.computeYearInvest(i);
             invest_year = this.integrateInvest("Year", (i/12)-1);
           }
           batch += increment;
           this._integrated_incomes[index] = batch;
           this._integrated_wealth.data[index] = batch + this.integrateInvest("Month", index) + invest_year;
           if (i == 1)
           {
             this._integrated_wealth.min = this._integrated_wealth.data[index];
             this._integrated_wealth.max = this._integrated_wealth.data[index];
           }
           else
           {
               if (this._integrated_wealth.data[index] > this._integrated_wealth.max)
                   this._integrated_wealth.max = this._integrated_wealth.data[index];
               if (this._integrated_wealth.data[index] < this._integrated_wealth.min)
                   this._integrated_wealth.min = this._integrated_wealth.data[index];
           }
       }
   }

   /**
    * integrate invest value based on scale
    *
    * @param  {string} scale time scale
    * @param  {Number} index
    * @return {Num}       value of integrated investment
    */
   integrateInvest(scale, index)
   {
       let len = this._data.investment.length;
       let sum = 0;
       for (let i = 0; i < len; i++)
       {
           if (this._data.investment[i].Frequency == scale)
               sum += this._integrated_investments[i][index];
       }

       return sum;
   }

   /**
    * Compute year invest spences
    *
    * @return {Number} sum of year investition
    */
   computeYearInvest(index)
   {
     let len = this._data.investment.length;
     let sum = 0;
     let ind = 0;
     for(let i = 0; i < len; i++)
     {
         if(this._data.investment[i].Frequency == "Year")
         {
           ind = (index/12) - 1;
           if (index == 12)
           {
              this._integrated_investments[i][ind] = this._data.investment[i].Capital;
              let increment = this._data.investment[i].Value*this._data.investment[i].Modifier;
              this._integrated_investments[i][ind] += increment;
              sum += increment;
              this._integrated_investments[i][ind] += this.computeInterest(this._integrated_investments[i][ind], this._data.investment[i].Increase);
           }
           else
           {
              let increment = this._data.investment[i].Value*this._data.investment[i].Modifier;
              this._integrated_investments[i][ind] = this._integrated_investments[i][ind-1] + increment;
              sum += increment;
              this._integrated_investments[i][ind] += this.computeInterest(this._integrated_investments[i][ind], this._data.investment[i].Increase);
           }
         }
     }

     return sum;
   }
   /**
    * Compute monthly value of incomes and spends
    *
    * @param  {String} type type of batch
    * @param  {String} scale time scale of batch
    * @return {Number}      summation of all monthly items
    */
   computeBatch(type, scale)
   {
       let len = this._data[type].length;
       let sum = 0;
       for(let i = 0; i < len; i++)
       {
           if(this._data[type][i].Frequency == scale)
              sum += this._data[type][i].Value*this._data[type][i].Modifier;
       }

      return sum;
   }

   /**
    * Compute monthly invest spends
    *
    * @param  {Number} index index of current month
    * @return {Number}       sum of monthly investition
    */
   computeMonthInvest(index)
   {
     let len = this._data.investment.length;
     let sum = 0;
     for(let i = 0; i < len; i++)
     {
         if(this._data.investment[i].Frequency == "Month")
         {
           let ind = index-1;
           if (index == 1)
           {
              this._integrated_investments[i][ind] = this._data.investment[i].Capital;
              let increment = this._data.investment[i].Value*this._data.investment[i].Modifier;
              this._integrated_investments[i][ind] += increment;
              sum += increment;
           }
           else
           {
              let increment = this._data.investment[i].Value*this._data.investment[i].Modifier;
              this._integrated_investments[i][ind] = this._integrated_investments[i][ind-1] + increment;
              sum += increment;
              if (index % 12 == 0)
                  this._integrated_investments[i][ind] += this.computeInterest(this._integrated_investments[i][ind], this._data.investment[i].Increase);
           }
         }
     }

     return sum;
   }

   /**
    * Compute interest base on interest rate
    *
    * @param  {Number} value
    * @param  {Number} interest interest rate
    * @return {Number}          computed interest
    */
   computeInterest(value, interest)
   {
       return (value / 100)*interest;
   }
}

module.exports = ComputeEngine;
