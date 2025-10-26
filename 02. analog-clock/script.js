const clockNumbers = document.querySelectorAll('.number');
const middleCircle = document.querySelector('.middle-circle');
const clockNumberSpans = document.querySelectorAll('.number span');
const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');
const hourDisplay = document.querySelector('.hour-display');
const minuteDisplay = document.querySelector('.minute-display');
const dayAndDateDisplay = document.querySelector('.day-and-date');
const infoText = document.querySelector('.info-text');

const days = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const makeTickMarks = function (element) {
  const NUM_TICK_MARKS = 60;

  for (let i = 0; i < NUM_TICK_MARKS; i++) {
    const tickMark = document.createElement('div');
    tickMark.classList.add('tick-mark');
    element.insertAdjacentElement('afterend', tickMark);
  }
};

makeTickMarks(middleCircle);

const initPositionNumbers = function () {
  let degree = 0;

  const placeItems = (d, op) => `rotate(${op ? op : ''}${d}deg)`;

  return function (numbers) {
    numbers.forEach((num, index) => {
      degree += 30;
      num.style.transform = placeItems(degree);
      clockNumberSpans[index].style.transform = placeItems(degree, '-');
    });
  };
};

const positionClockNumbers = initPositionNumbers();
positionClockNumbers(clockNumbers);

const positionTickMarks = function (degree) {
  const ticksMarks = document.querySelectorAll('.tick-mark');

  let currentPosition = 0;
  let updatePosition = 5;

  ticksMarks.forEach(mark => {
    degree += 6;

    mark.style.transform = `rotate(${degree}deg)`;

    currentPosition++;

    if (currentPosition === updatePosition) {
      mark.textContent = '❚';
      currentPosition = 0;
      return;
    }

    mark.textContent = '❘';
  });
};

positionTickMarks(0);

const updateDigitalDisplay = unit =>
  unit < 10 ? `${unit}`.padStart(2, '0') : unit;

const rotateTimeHand = degree => `translate(-50%) rotate(${degree}deg)`;

const setupClockUpdate = function () {
  const MAX_SECONDS = 60;
  const MAX_MINUTES = 60;
  const MAX_HOURS = 12;
  const FULL_ROTATION = 360;

  return function () {
    const dateObj = new Date();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const day = days[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();

    hourDisplay.textContent = updateDigitalDisplay(hour);
    minuteDisplay.textContent = updateDigitalDisplay(minutes);
    dayAndDateDisplay.textContent = `${day}, ${month} ${date}`;

    const secondsDegree = (seconds / MAX_SECONDS) * FULL_ROTATION;
    const minutesDegree = (minutes / MAX_MINUTES) * FULL_ROTATION;
    const hourDegree = (hour / MAX_HOURS) * FULL_ROTATION;

    secondHand.style.transform = rotateTimeHand(secondsDegree);
    minuteHand.style.transform = rotateTimeHand(minutesDegree);
    hourHand.style.transform = rotateTimeHand(hourDegree);
  };
};

const ONE_SECOND = 1000;
const updateClock = setupClockUpdate();
updateClock();
setInterval(updateClock, ONE_SECOND);

let isFullScreen = false;

document.querySelector('body').addEventListener('dblclick', () => {
  if (!isFullScreen) {
    document.querySelector('body').requestFullscreen();
    isFullScreen = true;
  } else {
    document.exitFullscreen();
    isFullScreen = false;
  }
});

const infoIcon = infoText.previousElementSibling;
infoIcon.addEventListener('pointerenter', () =>
  isFullScreen
    ? (infoText.textContent = 'Double click page to exit fullscreen mode')
    : (infoText.textContent = 'Double click page to enter fullscreen mode')
);
