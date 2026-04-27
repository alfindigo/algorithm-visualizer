async function insertionSort(array, visualizer) {
  const n = array.length;
  visualizer.markSorted(0);
  for (let i = 1; i < n; i++) {
    if (visualizer.paused) await visualizer.waitForResume();
    if (visualizer.stopped) return;

    let j = i;
    while (j > 0) {
      if (visualizer.paused) await visualizer.waitForResume();
      if (visualizer.stopped) return;

      await visualizer.compare(j, j - 1);
      if (array[j] < array[j - 1]) {
        await visualizer.swap(array, j, j - 1);
        j--;
      } else {
        break;
      }
    }
    visualizer.markSorted(i);
  }
}