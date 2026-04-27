async function selectionSort(array, visualizer) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (visualizer.paused) await visualizer.waitForResume();
      if (visualizer.stopped) return;

      await visualizer.compare(minIdx, j);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      await visualizer.swap(array, i, minIdx);
    }
    visualizer.markSorted(i);
  }
  visualizer.markSorted(n - 1);
}