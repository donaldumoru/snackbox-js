'use strict';

const container = document.querySelector('.container');

const box = document.querySelector('.box');

let number = 0;
let start = false;
let windowWidthMax = window.innerWidth - 200;
let windowWidthMin = 0;

let leftToRightId;
let leftRunning = true;
let rightToLeftId;
let rightRunning = false;

const moveBox = function (timestamp) {
  if (!start) {
    start = true;
    requestAnimationFrame(moveBox);
    return;
  }

  if (window.innerWidth - 200 > number) {
    leftRunning = true;
    rightRunning = false;
  } else {
    rightRunning = true;
    leftRunning = false;
  }

  if (leftRunning) {
    number++;
    box.style.transform = `translateX(${number}px)`;
    leftToRightId = requestAnimationFrame(moveBox);
  }

  if (rightRunning) {
    number--;
    box.style.transform = `translateX(${number}px)`;
    rightToLeftId = requestAnimationFrame(moveBox);
  }
};

requestAnimationFrame(moveBox);
