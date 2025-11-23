"use strict";

const storiesContainer = document.querySelector(".stories-container");
const storyViewContainer = document.querySelector(".story-view-container");
const progressBarContainer = document.querySelector(".progress-bar-container");
const viewStoryImg = document.querySelector(".story-image");
const storyControls = document.querySelector(".story-controls");
const closeBtn = document.querySelector(".close-btn");
const storyAvatar = document.querySelector(".story-avatar");
const storyUsername = document.querySelector(".story-username");

const accountsData = "./accounts.json";

let timer;

const fetchAccountsData = async function (json) {
  const response = await fetch(json);
  if (!response.ok) {
    return;
  }
  const result = await response.json();
  return result;
};

const userAccounts = await fetchAccountsData(accountsData);

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

renderUsers(userAccounts);

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
  // reset the progress bar before rendering new story bars for the current user
  progressBarContainer.innerHTML = "";

  const FULL_WIDTH = 100;
  const NUMBER_OF_STORIES = arr.length;
  const WIDTH_OF_BAR = FULL_WIDTH / NUMBER_OF_STORIES;

  for (let i = 0; i < NUMBER_OF_STORIES; i++) {
    makeStoryBar(WIDTH_OF_BAR);
  }
};

const updateStoryProgress = function (
  accts,
  currAcc,
  currAccIndex,
  currStoryIndex = 0
) {
  clearInterval(timer);

  const NUM_ACCOUNTS = accts.length - 1;
  let storyWidth = 0;
  const MAX_STORY_WIDTH = 100;

  let imageSet = true;

  timer = setInterval(() => {
    if (currAccIndex > NUM_ACCOUNTS) {
      storiesContainer.classList.remove("hide");
      storyViewContainer.classList.add("hide");
      return;
    }

    const allStoryBars = document.querySelectorAll(".story-bar");
    let allStoriesLength = allStoryBars.length;

    if (currStoryIndex >= allStoriesLength) {
      currAccIndex++;
      storyWidth = 0;
      currStoryIndex = 0;

      if (currAccIndex <= NUM_ACCOUNTS) {
        currAcc = accts[currAccIndex];
        createStoriesAmount(currAcc.stories);
      }
    }

    if (storyWidth >= MAX_STORY_WIDTH) {
      imageSet = true;
      storyWidth = 0;
      currStoryIndex++;
    }

    if (currStoryIndex < allStoriesLength) {
      if (imageSet) {
        viewStoryImg.src = currAcc.stories[currStoryIndex];
        imageSet = false;
      }

      storyAvatar.src = currAcc.avatar;
      storyUsername.textContent = currAcc.username;

      storyWidth++;

      allStoryBars[currStoryIndex].style.width = `${storyWidth}%`;
      allStoryBars[currStoryIndex].style.backgroundColor = "var(--offwhite)";
    }
  }, 50);
};

const displayStories = function (e, accounts) {
  if (!e.target.classList.contains("avatar")) {
    return;
  }

  const clickedAccount = e.target.getAttribute("username");

  let currentAccount = accounts.find(
    (account) => account.username === clickedAccount
  );

  let currentAccountIndex = accounts.findIndex(
    (account) => account.username === currentAccount.username
  );

  createStoriesAmount(currentAccount.stories);
  updateStoryProgress(accounts, currentAccount, currentAccountIndex);

  storiesContainer.classList.add("hide");
  storyViewContainer.classList.remove("hide");
};

/// Handle click on each story
storiesContainer.addEventListener("click", (e) =>
  displayStories(e, userAccounts)
);

closeBtn.addEventListener("click", function () {
  viewStoryImg.src = "";
  storiesContainer.classList.remove("hide");
  storyViewContainer.classList.add("hide");
});
