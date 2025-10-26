const clockNumbers = document.querySelectorAll(".number");
const middleCircle = document.querySelector(".middle-circle");
const clockNumberSpans = document.querySelectorAll(".number span");
const secondHand = document.querySelector(".second");
const minuteHand = document.querySelector(".minute");
const hourHand = document.querySelector(".hour");
const hourDisplay = document.querySelector(".hour-display");
const minuteDisplay = document.querySelector(".minute-display");
const dayAndDateDisplay = document.querySelector(".day-and-date");

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const makeTickMarks = function (element) {
  const NUM_TICK_MARKS = 60;

  for (let i = 0; i < NUM_TICK_MARKS; i++) {
    const tickMark = document.createElement("div");
    tickMark.classList.add("tick-mark");

    element.insertAdjacentElement("afterend", tickMark);
  }
};

makeTickMarks(middleCircle);

let startDegree = 0;

const positionClockNumbers = function (numbers, degree) {
  numbers.forEach((num, index) => {
    degree += 30;
    num.style.transform = `rotate(${degree}deg)`;
    clockNumberSpans[index].style.transform = `rotate(-${degree}deg)`;
  });
};

positionClockNumbers(clockNumbers, startDegree);

const positionTickMarks = function (degree) {
  const ticksMarks = document.querySelectorAll(".tick-mark");

  let currentPosition = 0;
  let updatePosition = 5;

  ticksMarks.forEach((mark) => {
    degree += 6;

    mark.style.transform = `rotate(${degree}deg)`;

    currentPosition++;

    if (currentPosition === updatePosition) {
      mark.textContent = "❚";
      currentPosition = 0;
      return;
    }

    mark.textContent = "❘";
  });
};

positionTickMarks(0);

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

    hourDisplay.textContent = hour < 10 ? `${hour}`.padStart(2, "0") : hour;
    minuteDisplay.textContent =
      minutes < 10 ? `${minutes}`.padStart(2, "0") : minutes;
    dayAndDateDisplay.textContent = `${day}, ${month} ${date}`;

    const secondsDegree = (seconds / MAX_SECONDS) * FULL_ROTATION;
    const minutesDegree = (minutes / MAX_MINUTES) * FULL_ROTATION;
    const hourDegree = (hour / MAX_HOURS) * FULL_ROTATION;

    secondHand.style.transform = `translate(-50%) rotate(${secondsDegree}deg)`;
    minuteHand.style.transform = `translate(-50%) rotate(${minutesDegree}deg)`;
    hourHand.style.transform = `translate(-50%) rotate(${hourDegree}deg)`;
  };
};

const ONE_SECOND = 1000;
const updateClock = setupClockUpdate();
updateClock();
setInterval(updateClock, ONE_SECOND);
