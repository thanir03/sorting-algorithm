const selectionSort = async function () {
  const barArray = [...document.querySelectorAll(`.bar`)];

  const changePosition = function (bar1Index, bar2Index) {
    if (bar1Index === bar2Index) {
      barArray[bar1Index].style.setProperty("background-color", "#70e000");
      return;
    }
    let bar1 = barArray[bar1Index];
    let bar1Clone = bar1.cloneNode(true);
    let bar2 = barArray[bar2Index];
    let bar2Clone = bar2.cloneNode(true);

    return new Promise(function (resolve) {
      setTimeout(() => {
        barChartEl.replaceChild(bar1Clone, bar2);
        barChartEl.replaceChild(bar2Clone, bar1);
        bar1Clone.style.setProperty("background-color", "#70e000");
        barArray[bar1Index] = bar2Clone;
        barArray[bar2Index] = bar1Clone;
        resolve();
      }, time * 1000);
    });
  };

  const changeColor = function (bar2, color) {
    return new Promise(function (resolve) {
      bar2.style.setProperty("background-color", color);
      resolve();
    });
  };

  const compareBar = function (bar1Index, bar2Index) {
    let bar1 = barArray[bar1Index];
    let bar2 = barArray[bar2Index];
    return new Promise(function (resolve) {
      setTimeout(() => {
        let lowestBar;
        if (+bar1.textContent < +bar2.textContent) {
          lowestBar = bar1Index;
          bar1.style.setProperty("background-color", "#a663cc");
          bar2.style.setProperty("background-color", "rgba(66, 134, 244, 0.8)");
        } else {
          lowestBar = bar2Index;
          bar2.style.setProperty("background-color", "#a663cc");
          bar1.style.setProperty("background-color", "rgba(66, 134, 244, 0.8)");
        }
        resolve(lowestBar);
      }, 0);
    });
  };

  for (let i = 0; i < barArray.length; i++) {
    let index = i;
    for (let j = i + 1; j < barArray.length; j++) {
      await changeColor(barArray[j], "#ffd60a");
      index = await compareBar(index, j);
    }
    await changePosition(index, i);
  }
  addEventListeners();
  changeColorBackToNormal();
};
