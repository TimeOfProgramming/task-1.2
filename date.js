#!/usr/bin/env node;

const yargs = require('yargs/yargs');

const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    type: 'boolean',
    description: 'get current year',
  })
  .option('month', {
    alias: 'm',
    type: 'boolean',
    description: 'get current month',
  })
  .option('date', {
    alias: 'd',
    type: 'boolean',
    description: 'get current date',
  })
  .argv;

const MILLISECONDS_IN_ONE_MINUTE = 60000;

const currentDate = new Date();
const tzOffset = currentDate.getTimezoneOffset() * MILLISECONDS_IN_ONE_MINUTE;
const currentDateISO = (new Date(Date.now() - tzOffset)).toISOString();
const year = new Date().getFullYear(); 
const month = new Date().getMonth() + 1; 
const date = new Date().getDate();
const [direction, num] = argv._;
let dateFlag = null;
  
const dateStr = {
  year,
  month,
  date,
}
const currentMethods = {
  year: ['setFullYear', 'getFullYear'],
  month: ['setMonth', 'getMonth'],
  date: ['setDate', 'getDate'],
};

if (argv.year) {
  dateFlag = 'year';
}

if (argv.month) {
  dateFlag = 'month';
}

if (argv.date) {
  dateFlag = 'date';
}

if (dateFlag && !direction) {
  console.log(dateStr[dateFlag]);
}

if (!dateFlag) {
  console.log(currentDateISO);
}

const calcDate = (direction, dateFlag) => {
  if (!direction || !dateFlag) return;
  const moduleNum = Math.abs(num) ;
  const currentNum = direction === 'add' ? moduleNum : -moduleNum;
  const [setDate, getDate] = currentMethods[dateFlag];
  currentDate[setDate](currentDate[getDate]() + currentNum);
  const dateTimeStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
  const localISOTime = (new Date(dateTimeStamp - tzOffset)).toISOString();
  console.log(localISOTime)    
}

calcDate(direction, dateFlag)
