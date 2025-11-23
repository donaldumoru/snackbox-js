'use strict';

const container = document.querySelector('.container');
const topWrapper = document.createElement('div');
topWrapper.className = 'top-wrapper';

const firstNumContainer = document.createElement('div');
firstNumContainer.className = 'num-container';
const x = document.createElement('p');
firstNumContainer.appendChild(x);
x.textContent = 'X';

topWrapper.appendChild(firstNumContainer);
container.appendChild(topWrapper);

/************************************/
let numOne;
let numTwo;

const getNumOne = function (num, container) {
  if (numOne && numTwo) {
    numOne = null;
    numTwo = null;

    const sides = document.querySelectorAll('.side');
    sides.forEach(side => {
      side.style.background = 'orange';
    });

    const tops = document.querySelectorAll('.top');
    tops.forEach(top => {
      top.style.background = 'orange';
    });
  }

  container.style.background = 'green';
  return num;
};

const getNumTwo = function (num, container) {
  container.style.background = 'green';
  return num;
};

const highlightNum = function (first, second) {
  const sides = document.querySelectorAll('.side');

  const result = first * second;

  console.log('first', first, 'second', second);

  for (let i = 0; i < sides.length; i++) {
    if (sides[i].style.background === 'green') {
      const wrapper = sides[i].parentElement.children;

      for (let i = 0; i < wrapper.length; i++) {
        if (Number(wrapper[i].textContent) === result) {
          wrapper[i].style.background = 'black';
          wrapper[i].style.color = 'white';
        }
      }
    }
  }
};
/*************************************/

const minNum = 0;
const maxNum = 12;

for (let i = minNum; i <= maxNum; i++) {
  const rowNum = i;

  const topNumContainer = document.createElement('div');
  topNumContainer.className = 'num-container top';

  const topNum = document.createElement('p');
  topNumContainer.appendChild(topNum);
  topNum.textContent = rowNum;

  topWrapper.appendChild(topNumContainer);

  const bottomWrapper = document.createElement('div');
  bottomWrapper.className = 'bottom-wrapper';

  const sideMultiplierContainer = document.createElement('div');
  sideMultiplierContainer.className = 'num-container side';
  const sideMultiplier = document.createElement('p');
  sideMultiplier.textContent = rowNum;
  sideMultiplierContainer.appendChild(sideMultiplier);
  bottomWrapper.appendChild(sideMultiplierContainer);

  topNumContainer.addEventListener('click', () => {
    if (!numOne && numOne !== 0) {
      numOne = getNumOne(rowNum, topNumContainer);

      return;
    }

    numTwo = getNumOne(rowNum, topNumContainer);

    highlightNum(numOne, numTwo);
  });

  sideMultiplierContainer.addEventListener('click', () => {
    if (!numOne && numOne !== 0) {
      numOne = getNumTwo(
        Number(sideMultiplierContainer.firstChild.textContent),
        sideMultiplierContainer
      );

      return;
    }

    numTwo = getNumTwo(
      Number(sideMultiplierContainer.firstChild.textContent),
      sideMultiplierContainer
    );

    highlightNum(numOne, numTwo);
  });

  for (let i = 0; i <= maxNum; i++) {
    const columnNum = i;
    const numContainer = document.createElement('div');
    numContainer.className = 'num-container bottom';
    const secondNum = document.createElement('p');
    numContainer.appendChild(secondNum);

    secondNum.textContent = columnNum * rowNum;
    bottomWrapper.appendChild(numContainer);

    container.appendChild(bottomWrapper);
  }
}
