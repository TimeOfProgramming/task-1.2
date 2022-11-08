#!/usr/bin/env node

const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();

const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log('Загадано число в диапазоне от 0 до 100');

rl.on('line', (line) => {
  const inputNum = +line.trim();
  if (inputNum < randomNumber) {
    console.log('Меньше')
  }

  if (inputNum > randomNumber) {
    console.log('Больше')
  }

  if (inputNum === randomNumber) {
    console.log(`Отгадано число ${inputNum}`);
    process.exit(0);
  }
  
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
