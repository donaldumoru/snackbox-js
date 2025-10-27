'use strict';

const allNumbers = document.querySelectorAll('[data-number]');
const minuteString = document.querySelector(
  '[data-text="minutes"]'
).textContent;

const allItemNodelist = document.querySelectorAll('.word');

const words = [
  'half',
  'ten',
  'quarter',
  'twenty',
  'five',
  'twenty five',
  "o'clock",
];

const numbers = [
  'twelve',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
];

const findRightMinuteWord = function (arr, wordToFind) {
  return arr.find(word => word === wordToFind);
};

const createMinuteString = function (wordsArray, word) {
  const minuteWord = findRightMinuteWord(wordsArray, word);

  if (
    minuteWord !== 'quarter' &&
    minuteWord !== 'half' &&
    minuteWord !== "o'clock"
  ) {
    return `${minuteWord} ${minuteString}`;
  } else {
    return minuteWord;
  }
};

const determineMinuteWord = function (mins) {
  const ONE_HOUR = 60;
  let minuteWord = '';

  if (ONE_HOUR - mins < 3 || mins <= 3) {
    minuteWord = createMinuteString(words, "o'clock");
    return minuteWord;
  }

  if ((mins > 3 && mins <= 7) || ONE_HOUR - mins <= 7) {
    minuteWord = createMinuteString(words, 'five');
  } else if (mins <= 12 || ONE_HOUR - mins <= 12) {
    minuteWord = createMinuteString(words, 'ten');
  } else if (mins <= 17 || ONE_HOUR - mins <= 17) {
    minuteWord = createMinuteString(words, 'quarter');
  } else if (mins <= 23 || ONE_HOUR - mins <= 23) {
    minuteWord = createMinuteString(words, 'twenty');
  } else if (mins <= 27 || ONE_HOUR - mins <= 27) {
    minuteWord = createMinuteString(words, 'twenty five');
  } else {
    minuteWord = createMinuteString(words, 'half');
  }

  return minuteWord;
};

const determineToOrPast = function (minWord, mins) {
  let toOrPastStr = '';

  if (minWord !== "o'clock") {
    if (minWord === 'half') {
      toOrPastStr = 'past';
    } else {
      if (mins < 30) {
        toOrPastStr = 'past';
      } else if (mins > 30 && mins < 60) {
        toOrPastStr = 'to';
      }
    }
  }

  return toOrPastStr;
};

const determineHour = function (mins, hour) {
  // To keep it locked to 12hr format
  if (hour > 11) {
    hour = hour - 12;
  }

  if (mins >= 33) {
    if (hour === 11) {
      hour = 0;
    } else {
      hour = hour + 1;
    }
  }

  return hour;
};

const displayTime = function (arr) {
  const allItemElements = [...allItemNodelist];

  allItemElements.forEach(el => {
    if (el.classList.contains('enabled')) {
      el.classList.remove('enabled');
    }
  });

  allItemElements[0].classList.add('enabled');

  arr.forEach(item => {
    const itemToUpdate = allItemElements.find(
      el =>
        el.hasAttribute(`data-${item.attribute}`) &&
        Object.values(el.dataset).join('') === item.text
    );

    itemToUpdate.classList.add('enabled');
  });
};

const makeItemsToRender = function (mins, hour) {
  const minuteWord = determineMinuteWord(mins);
  const minuteWordArr = minuteWord.split(' ').reduce((acc, curr) => {
    if (curr === 'minutes') {
      acc.push({ text: curr, attribute: 'text' });
    } else {
      acc.push({ text: curr, attribute: 'min-word' });
    }

    return acc;
  }, []);

  const toOrPast = determineToOrPast(minuteWord, mins);
  const hourNum = determineHour(mins, hour);

  const toOrPastWordObj = { text: toOrPast, attribute: 'text' };
  const hourWordObj = {
    text: numbers[hourNum],
    attribute: 'number',
  };

  return [...minuteWordArr, toOrPastWordObj, hourWordObj].filter(
    item => item.text !== ''
  );
};

const updateClock = function () {
  const date = new Date();

  const minutes = date.getMinutes();
  const hour = date.getHours();

  displayTime(makeItemsToRender(minutes, hour));
};

updateClock();

const FIVE_MINUTES = 1000 * 60 * 5;

let timeoutId = null;
let intervalId = null;

const startTimer = function () {
  clearTimeout(timeoutId);
  clearInterval(intervalId);

  // get the number of milliseconds since the last five minutes
  // by getting the remainder of time since 1970 / five minutes
  let timeSinceFiveMinutes = Date.now() % FIVE_MINUTES;
  // get the time left until the next five minutes by subtracting the above time since five from five minutes
  let timeUntilFiveMinutes = FIVE_MINUTES - timeSinceFiveMinutes;
  let timeForFirstKickOff = timeUntilFiveMinutes;
  if (timeForFirstKickOff < 10) timeForFirstKickOff += FIVE_MINUTES;

  timeoutId = setTimeout(function () {
    updateClock();
    intervalId = setInterval(updateClock, FIVE_MINUTES);
  }, timeForFirstKickOff);
};

startTimer();

document.addEventListener('visibilitychange', function () {
  if (!document.hidden) {
    updateClock();
    startTimer();
  }
});

// test----->>> animationFrame
// const createFrames = function (timestamp) {
//   const div = document.createElement('div');
//   div.classList.add('anim-frame');
//   document.body.append(div);

//   requestAnimationFrame(createFrames);
// };

// requestAnimationFrame(createFrames);
