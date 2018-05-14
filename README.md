[![DeepScan grade](https://deepscan.io/api/projects/2342/branches/13940/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2342&bid=13940)

# Family calculator

Application for counting of family increase and spending and finance prediction

## Prerequisites

Node.js installed

## Installation

1. Clone github repository `git clone https://github.com/Viceriel/Family-calculator.git`
1. Run `npm install` from node command line
1. Run `npm install --only=dev`

## Start application

### For first time start of app

1. Go to `node_modules/mocha-jsdom/index.js`
1. At line 52 replace `require('jsdom')` with `require('jsdom/lib/old-api')`
1. Run from node command line `npm run build`
1. Go to build directory and use browser to run a app.html file
1. Enjoy

### For regular start of app

1. Run from node command line `npm run build`
1. Go to build directory and use browser to run a app.html file
1. Enjoy
