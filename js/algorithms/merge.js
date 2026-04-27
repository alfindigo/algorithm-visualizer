async function mergeSort(array, visualizer) {
  await mergeSortHelper(array, 0, array.length - 1, visualizer);
  for (let i = 0; i < array.length; i++) visualizer.markSorted(i);
}

async function mergeSortHelper(array, left, right, visualizer) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(array, left, mid, visualizer);
  await mergeSortHelper(array, mid + 1, right, visualizer);
  await merge(array, left, mid, right, visualizer);
}

async function merge(array, left, mid, right, visualizer) {
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (visualizer.paused) await visualizer.waitForResume();
    if (visualizer.stopped) return;

    await visualizer.compare(left + i, mid + 1 + j);

    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i++];
    } else {
      array[k] = rightArr[j++];
    }
    visualizer.updateBar(k, array[k]);
    k++;
    await visualizer.sleep();
  }

  while (i < leftArr.length) {
    if (visualizer.stopped) return;
    array[k] = leftArr[i++];
    visualizer.updateBar(k, array[k]);
    k++;
    await visualizer.sleep();
  }

  while (j < rightArr.length) {
    if (visualizer.stopped) return;
    array[k] = rightArr[j++];
    visualizer.updateBar(k, array[k]);
    k++;
    await visualizer.sleep();
  }
}