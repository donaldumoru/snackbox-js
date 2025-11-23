'use strict';

const body = document.querySelector('body');
const progressContainer = document.querySelector('.progress-container');

const renderElements = function (arr) {
  const colorsFrag = new DocumentFragment();
  const progressFrag = new DocumentFragment();

  for (let i = 0; i < arr.length; i++) {
    const container = document.createElement('div');
    container.classList.add('color-container');
    const colorEl = document.createElement('h2');
    colorEl.textContent = arr[i];
    container.append(colorEl);
    colorsFrag.append(container);

    const progressCircle = document.createElement('div');
    progressCircle.classList.add('circle', 'inactive');
    progressFrag.append(progressCircle);
  }

  body.append(colorsFrag);
  progressContainer.append(progressFrag);
};

const colorsObj = {
  red: 'rgb(199, 46, 46)',
  orange: 'rgb(255, 165, 0)',
  yellow: 'rgb(255, 235, 59)',
  green: 'rgb(0, 128, 0)',
  blue: 'rgb(5, 66, 152)',
  indigo: 'rgb(76, 0, 130)',
  violet: 'rgb(238, 130, 238)',
};

const colors = Object.keys(colorsObj);
renderElements(colors);

const colorELements = document.querySelectorAll('h2');
const allCircles = document.querySelectorAll('.circle');

const options = {
  root: null,
  threshold: 0.8,
};

const intersectionCallback = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    const currentColor = entry.target.textContent;
    const currentIndex = colors.findIndex(color => color === currentColor);

    allCircles.forEach((circle, index) => {
      if (index !== currentIndex) {
        circle.classList.add('inactive');
        circle.classList.remove('active');
        return;
      }

      circle.classList.remove('inactive');
      circle.classList.add('active');
    });

    body.style.backgroundColor = colorsObj[currentColor];
  });
};

const observer = new IntersectionObserver(intersectionCallback, options);
colorELements.forEach(el => observer.observe(el));
