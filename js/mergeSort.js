const mergeSort = async function () {
  const barArray = [...document.querySelectorAll(`.bar`)];

  function changeColor(array, color) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        for (let i of array) {
          barArray[i].style.setProperty("background-color", color);
        }
        resolve();
      }, 0);
    });
  }

  const changeBar = function (oldBar, newBar) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        barChartEl.replaceChild(newBar, oldBar);
        resolve();
      }, time * 1000);
    });
  };

  async function mergeSortRecursive(array, l = 0, r = array.length - 1) {
    if (l === r) return;
    let mid = Math.floor(l + (r - l) / 2);
    await mergeSortRecursive(array, l, mid);
    await mergeSortRecursive(array, mid + 1, r);
    await mergeArray(array, l, mid + 1, r);
  }

  async function mergeArray(array, start, mid, end) {
    let [l, m] = [start, mid];
    let startIdx = start;
    let arr = [];
    while (l < mid && m <= end) {
      await changeColor([l, m], "#ffd60a");
      if (+array[l].textContent < +array[m].textContent) {
        arr.push(barArray[l].cloneNode(true));
        l++;
      } else {
        arr.push(barArray[m].cloneNode(true));
        m++;
      }
    }

    while (l < mid) {
      arr.push(barArray[l].cloneNode(true));
      l++;
    }
    while (m <= end) {
      arr.push(barArray[m].cloneNode(true));
      m++;
    }

    for (let i = 0; i < arr.length; i++) {
      await changeBar(array[start], arr[i]);

      array[start] = arr[i];

      start++;
    }
    barArray
      .slice(startIdx, startIdx + arr.length)
      .forEach((el) => el.style.setProperty("background-color", "#a663cc"));
    return;
  }

  await mergeSortRecursive(barArray);
  barArray.forEach((el) => el.style.setProperty("background-color", "#70e000"));
  addEventListeners();
  changeColorBackToNormal();
};
