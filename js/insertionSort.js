const insertionSort = async function () {
  const barArray = [...document.querySelectorAll(".bar")];
  const changeColor = function (idx, color) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        let bar1 = barArray[idx];
        let bar2 = barArray[idx - 1];
        bar1.style.setProperty("background-color", color);
        bar2.style.setProperty("background-color", color);
        resolve();
      }, 0);
    });
  };

  const compareBar = function (idx) {
    return new Promise(function (resolve) {
      let isCurrentElementSorted = true;
      setTimeout(() => {
        let bar1 = barArray[idx];
        let bar2 = barArray[idx - 1];
        if (+bar1.textContent < +bar2.textContent) {
          isCurrentElementSorted = false;
        }
        resolve(isCurrentElementSorted);
      }, 0);
    });
  };

  const swapBar = function (idx) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        let bar1 = barArray[idx];
        let bar2 = barArray[idx - 1];
        let bar2Clone = barArray[idx - 1].cloneNode(true);
        let bar1Clone = bar1.cloneNode(true);
        barChartEl.replaceChild(bar1Clone, bar2);
        barChartEl.replaceChild(bar2Clone, bar1);
        bar1Clone.style.setProperty("background-color", "#a663cc");
        bar2Clone.style.setProperty("background-color", "#a663cc");
        barArray[idx] = bar2Clone;
        barArray[idx - 1] = bar1Clone;
        resolve();
      }, time * 1000);
    });
  };

  for (let i = 0; i < barArray.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      await changeColor(j, "#ffd60a");
      let isCurrentElementSorted = await compareBar(j);
      if (isCurrentElementSorted) break;
      await swapBar(j);
    }
    barArray
      .slice(0, i + 1)
      .forEach((bar) => bar.style.setProperty("background-color", "#a663cc"));
  }
  barArray.forEach((bar) =>
    bar.style.setProperty("background-color", "#70e000")
  );

  addEventListeners();
  changeColorBackToNormal();
};
