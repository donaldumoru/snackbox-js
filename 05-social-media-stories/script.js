"use strict";

const storiesContainer = document.querySelector(".stories-container");
const storyViewContainer = document.querySelector(".story-view-container");
const progressBarContainer = document.querySelector(".progress-bar-container");
const viewStoryImg = document.querySelector(".story-image");
const storyControls = document.querySelector(".story-controls");

const accounts = [
  {
    username: "dangkhoa",
    avatar: "img/dangkhoa.jpg",
    stories: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"],
    userAccount: true,
    posts: [
      { image: "", caption: "", likes: 30, time: "2025-11-10" },
      { image: "", caption: "", likes: 30, time: "2025-11-09" },
      { image: "", caption: "", likes: 30, time: "2025-11-05" },
    ],
  },

  {
    username: "johndoe",
    avatar: "img/johndoe.jpg",
    stories: ["img/5.jpg", "img/6.jpg", "img/7.jpg"],
    userAccount: false,
  },

  {
    username: "janedoe",
    avatar: "img/janedoe.jpg",
    stories: [
      "img/8.jpg",
      "img/9.jpg",
      "img/10.jpg",
      "img/11.jpg",
      "img/12.jpg",
    ],
    userAccount: false,
  },
  {
    username: "whoami",
    avatar: "img/whoami.jpg",
    stories: ["img/13.jpg"],
    userAccount: false,
  },
];

const renderUsers = function (accts) {
  accts.forEach((acc) => {
    const storyContainer = document.createElement("div");
    storyContainer.classList.add("story-container");

    const storyWrapper = document.createElement("div");
    storyWrapper.classList.add("story-wrapper");

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.setAttribute("username", acc.username);
    avatar.src = acc.avatar;

    storyWrapper.append(avatar);

    if (acc.userAccount) {
      const addStoryIcon = document.createElement("img");
      addStoryIcon.classList.add("add-story-icon");
      addStoryIcon.src = "img/add.svg";
      storyWrapper.append(addStoryIcon);
    }

    const username = document.createElement("span");
    username.classList.add("username");
    username.textContent = acc.username;

    storyContainer.append(storyWrapper, username);
    storiesContainer.append(storyContainer);
  });
};

renderUsers(accounts);

/// USER STORY VIEW

let timer;

const makeStoryBar = function (barWidth) {
  const storyBarWrapper = document.createElement("div");
  storyBarWrapper.classList.add("story-bar-wrapper");
  storyBarWrapper.style.width = `${barWidth}%`;
  const storyBar = document.createElement("div");
  storyBar.classList.add("story-bar");
  storyBarWrapper.append(storyBar);
  progressBarContainer.append(storyBarWrapper);
};

const createStoriesAmount = function (arr) {
  if (!arr.length) {
    return;
  }

  const FULL_WIDTH = 100;

  const WIDTH_OF_BAR = FULL_WIDTH / arr.length;

  if (arr.length === 1) {
    makeStoryBar(WIDTH_OF_BAR);
  } else {
    const numberOfStories = arr.length;
    for (let i = 0; i < numberOfStories; i++) {
      makeStoryBar(WIDTH_OF_BAR);
    }
  }
};

const createModalElements = function () {
  const topContainer = document.createElement("div");
  topContainer.classList.add("view-story-top-container");

  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("avatar-wrapper");
  const avatar = document.createElement("img");
  avatar.classList.add("story-avatar");
  const username = document.createElement("span");
  username.classList.add("story-username");
  avatarWrapper.append(avatar, username);
  const closeBtn = document.createElement("img");
  closeBtn.classList.add("close-btn");
  const btnControls = document.createElement("div");
  btnControls.classList.add("btn-controls");
  btnControls.append(closeBtn);
  topContainer.append(avatarWrapper, btnControls);
  storyControls.append(topContainer);
};

createModalElements();

const renderStoryModal = function (account) {
  const avatar = document.querySelector(".story-avatar");
  avatar.src = account.avatar;
  const username = document.querySelector(".story-username");
  username.textContent = account.username;

  const closeBtn = document.querySelector(".close-btn");
  closeBtn.src = "img/close.svg";

  createStoriesAmount(account.stories);
  updateProgressBar(accounts, account);
};

const updateProgressBar = function (accounts, account) {
  const allStoryBarsEl = document.querySelectorAll(".story-bar");
  const allStoryBars = [...allStoryBarsEl];

  const NUM_OF_ACCOUNTS = accounts.length - 1;
  let currentAccountIndex = accounts.findIndex((acc) => account === acc);

  const userStories = accounts[currentAccountIndex].stories;

  const MAX_WIDTH = 100;
  const MAX_STORIES = userStories.length - 1;
  let currentBarIndex = 0;
  let storyWidth = 0;
  let currentBar = allStoryBars[currentBarIndex];

  viewStoryImg.src = userStories[currentBarIndex];

  timer = setInterval(() => {
    if (currentBarIndex > MAX_STORIES) {
      return;
    }

    if (storyWidth < MAX_WIDTH) {
      storyWidth++;
      currentBar.style.width = `${storyWidth}%`;
      currentBar.style.backgroundColor = "var(--offwhite)";
    } else {
      if (currentBarIndex >= MAX_STORIES) {
        storyViewContainer.classList.add("hide");
        storiesContainer.classList.remove("hide");
        currentBarIndex = 0;
        storyWidth = 0;
        clearInterval(timer);
        return;
      }

      currentBarIndex++;
      viewStoryImg.src = userStories[currentBarIndex];
      storyWidth = 0;

      currentBar = allStoryBars[currentBarIndex];
    }
  }, 50);
};

const updateViewedStatus = function (e) {
  const currentAccountImage = e.target;

  if (!currentAccountImage.classList.contains("viewed")) {
    currentAccountImage.classList.add("viewed");
  }
};

const displayStories = function (account) {
  storiesContainer.classList.add("hide");
  storyViewContainer.classList.remove("hide");

  progressBarContainer.innerHTML = "";
  renderStoryModal(account);
};

const allStories = document.querySelectorAll(".avatar");

const updateStory = function (e) {
  updateViewedStatus(e);
  const account = accounts.find(
    (acc) => acc.username === this.getAttribute("username")
  );

  displayStories(account);

  navigateStories();

  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", function () {
    storyViewContainer.classList.add("hide");
    storiesContainer.classList.remove("hide");

    clearInterval(timer);
  });
};

allStories.forEach((story) => {
  story.addEventListener("click", updateStory);
});

const navigateStories = function () {
  viewStoryImg.addEventListener("click", function (e) {
    const image = e.target;
    const imageWidth = image.getBoundingClientRect().width;

    const leftMax = imageWidth / 2;

    if (e.offsetX < leftMax) {
      console.log("to previous");
    } else {
      console.log("to next");
    }
  });
};
