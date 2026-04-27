async function quickSort(array, visualizer) {
  await quickSortHelper(array, 0, array.length - 1, visualizer);
  for (let i = 0; i < array.length; i++) visualizer.markSorted(i);
}

async function quickSortHelper(array, low, high, visualizer) {
  if (low < high) {
    if (visualizer.stopped) return;
    const pi = await partition(array, low, high, visualizer);
    await quickSortHelper(array, low, pi - 1, visualizer);
    await quickSortHelper(array, pi + 1, high, visualizer);
  }
}

async function partition(array, low, high, visualizer) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (visualizer.paused) await visualizer.waitForResume();
    if (visualizer.stopped) return i + 1;

    await visualizer.compare(j, high);

    if (array[j] < pivot) {
      i++;
      await visualizer.swap(array, i, j);
    }
  }
  await visualizer.swap(array, i + 1, high);
  return i + 1;
}