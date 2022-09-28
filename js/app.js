"use strict";

const algorithmBtnContainer = document.querySelector(`.algorithm`);

const generateArrayBtn = document.querySelector(`#generate-new-array`);

const arraySizeInput = document.querySelector(`#array-size`);

const sortingSpeedInput = document.querySelector(`#sorting-speed`);

const sortBtn = document.querySelector(`#sort`);
const allAlgorithmBtn = document.querySelectorAll(`.sorting`);
const barChartEl = document.querySelector(`.barchart`);
const titleEl = document.querySelector(`#title`);
let unsortedArray = [];
let arraySize = arraySizeInput.valueAsNumber;
let speed = sortingSpeedInput.valueAsNumber;
let time = 3 - speed;
let currentAlgorithm = "bubble";
const MAX_SIZE = 100;
const MIN_SIZE = 5;

const generateArray = function () {
  unsortedArray.length = 0;
  function randomNumber() {
    return Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
  }

  for (let i = 0; i < arraySize; i++) {
    unsortedArray.push(randomNumber());
  }
};

const renderArray = function () {
  barChartEl.innerHTML = "";
  let width = (window.innerWidth - arraySize * 3) / arraySize;
  let backgroundColor = `rgba(66, 134, 244, 0.8)`;
  let fontSize = 30;
  if (arraySize > 30) fontSize = 0;
  for (let [idx, value] of unsortedArray.entries()) {
    let bar = document.createElement("div");
    bar.textContent = value;
    bar.id = idx;
    bar.style.setProperty("color", "#fff");
    bar.style.setProperty("font-size", fontSize);
    bar.style.setProperty("background-color", backgroundColor);
    bar.style.setProperty("height", `${value * 4.5}px`);
    bar.style.setProperty("width", `${width}px`);
    bar.classList.add("bar");
    barChartEl.append(bar);
  }
  barChartEl.setAttribute("gap", "10px");
};

const getAlgorithm = function (event) {
  const clickedBtn = event.target;
  if (!clickedBtn.classList.contains("sorting")) return;
  currentAlgorithm = clickedBtn.id;
  sortBtn.classList.remove("hidden");
  allAlgorithmBtn.forEach((btn) => btn.classList.remove("current-algorithm"));
  clickedBtn.classList.add("current-algorithm");
};

const selectAlgorithm = function () {
  generateArrayBtn.classList.add("immutable");
  allAlgorithmBtn.forEach((btn) => {
    if (btn.id === currentAlgorithm) return;
    btn.classList.add("immutable");
  });
  titleEl.textContent = `${
    currentAlgorithm[0].toUpperCase() + currentAlgorithm.slice(1)
  } Sort`;
  sortBtn.classList.add("immutable");
  removeEventListeners();

  switch (currentAlgorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "insertion":
      insertionSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "merge":
      mergeSort();
      break;
    case "quick":
      quickSort();
      break;
  }
};

const removeEventListeners = function () {
  sortingSpeedInput.disabled = true;
  arraySizeInput.disabled = true;
  generateArrayBtn.removeEventListener("click", init);
  algorithmBtnContainer.removeEventListener("click", getAlgorithm);
  sortBtn.removeEventListener("click", selectAlgorithm);
};
const changeColorBackToNormal = function () {
  allAlgorithmBtn.forEach((btn) =>
    btn.classList.remove("immutable", "current-algorithm")
  );
  generateArrayBtn.classList.remove("immutable");
  sortBtn.classList.remove("immutable");
  sortBtn.classList.add("hidden");
};

const addEventListeners = function () {
  sortingSpeedInput.disabled = false;
  arraySizeInput.disabled = false;
  generateArrayBtn.addEventListener("click", init);

  arraySizeInput.addEventListener("input", function () {
    arraySize = this.valueAsNumber;
    init();
  });

  sortingSpeedInput.addEventListener("input", function () {
    speed = this.valueAsNumber;
    time = (3 - speed) / 2;
  });

  algorithmBtnContainer.addEventListener("click", getAlgorithm);
  sortBtn.addEventListener("click", selectAlgorithm);
};

function init() {
  generateArray();
  renderArray();
}
addEventListeners();
init();
