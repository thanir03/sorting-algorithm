const bubbleSort = async function () {
  const barArray = [...document.querySelectorAll(`.bar`)];
  const changeColor = function (idx, color) {
    return new Promise(function (resolve) {
      barArray[idx].style.setProperty("background-color", color);
      barArray[idx + 1].style.setProperty("background-color", color);
      resolve();
    });
  };
  const compareBar = function (index) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        let isSwapped = false;
        let value1 = +barArray[index].textContent;
        let value2 = +barArray[index + 1].textContent;
        if (value1 > value2) {
          isSwapped = true;
          barChartEl.insertBefore(barArray[index + 1], barArray[index]);
          [barArray[index], barArray[index + 1]] = [
            barArray[index + 1],
            barArray[index],
          ];
        }
        resolve(isSwapped);
      }, time * 1000);
    });
  };

  let isSwapped = true;
  for (let j = 0; j <= barArray.length - 1; j++) {
    isSwapped = false;
    for (let i = 0; i < barArray.length - 1 - j; i++) {
      await changeColor(i, "#ffd60a");
      let isBarSwapped = await compareBar(i);
      if (isBarSwapped) {
        isSwapped = true;
      }
      await changeColor(i, "rgba(66, 134, 244, 0.8)");
    }
    barArray[barArray.length - 1 - j].style.setProperty(
      "background-color",
      "#70e000"
    );
    if (!isSwapped) {
      barArray.forEach((bar) =>
        bar.style.setProperty("background-color", "#70e000")
      );
      addEventListeners()
      changeColorBackToNormal()
      break;
    }
  }
};
