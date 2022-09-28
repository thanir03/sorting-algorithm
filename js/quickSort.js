const quickSort = async function () {
  const barArray = [...document.querySelectorAll(`.bar`)];

  const changeColor = function (array, color) {
    return new Promise(function (resolve) {
      setTimeout(() => {
        for (let i of array) {
          barArray[i].style.setProperty("background-color", color);
        }
        resolve();
      }, 0);
    });
  };
  const swapBar = function (idx1, idx2) {
    return new Promise(function (resolve) {
      if (idx1 === idx2) {
        resolve();
        return;
      }
      let bar1 = barArray[idx1];
      let bar2 = barArray[idx2];
      let bar1Clone = bar1.cloneNode(true);
      let bar2Clone = bar2.cloneNode(true);
      setTimeout(() => {
        barChartEl.replaceChild(bar1Clone, bar2);
        barChartEl.replaceChild(bar2Clone, bar1);
        barArray[idx1] = bar2Clone;
        barArray[idx2] = bar1Clone;
        resolve();
      }, time * 1000);
    });
  };

  const quickSortRecursive = async function (
    array,
    start = 0,
    end = array.length - 1
  ) {
    let [l, r] = [start, end];
    if (l >= r) return;
    let mid = Math.floor(l + (r - l) / 2);
    await swapBar(l, mid);
    pivot = l;
    await changeColor([pivot], "#a663cc");
    l++;
    while (l <= r) {
      if (
        +array[l].textContent > +array[pivot].textContent &&
        +array[r].textContent < +array[pivot].textContent
      ) {
        await swapBar(l, r);
      }
      if (+array[l].textContent <= +array[pivot].textContent) l++;
      if (+array[r].textContent >= +array[pivot].textContent) r--;
    }
    await swapBar(pivot, r);
    await quickSortRecursive(array, start, r);
    await quickSortRecursive(array, l, end);
  };
  await quickSortRecursive(barArray);
   barArray.forEach((bar) =>
    bar.style.setProperty("background-color", "#70e000")
  );

  addEventListeners()
  changeColorBackToNormal() 
};


