"use strict";

const container = document.querySelector(".container");
const wrapper = document.querySelector(".wrapper");
const slider = document.querySelector(".slider");
const grabCircle = document.querySelector(".circle");
const percentageDisplay = document.querySelector("h1");

const BODY_WIDTH = document.body.getBoundingClientRect().width;
const TEXT_INFO_POSITION = percentageDisplay.getBoundingClientRect().x;

let dragging = false;

grabCircle.addEventListener("mousedown", function (e) {
  dragging = true;

  const slider = e.target.parentElement;

  container.addEventListener("mousemove", function (e) {
    if (dragging) {
      const sliderRect = slider.getBoundingClientRect();
      const SLIDER_POSITION = sliderRect.x;

      if (SLIDER_POSITION > TEXT_INFO_POSITION) {
        percentageDisplay.classList.add("change-text-color");
      } else {
        percentageDisplay.classList.remove("change-text-color");
      }

      const WRAPPER_WIDTH = (SLIDER_POSITION / BODY_WIDTH) * 100;

      slider.style.left = `${e.clientX}px`;
      wrapper.style.width = `${WRAPPER_WIDTH}%`;
      percentageDisplay.textContent = `${WRAPPER_WIDTH.toFixed()}%`;
    }
  });
});

document.addEventListener("mouseup", function (e) {
  dragging = false;
});
