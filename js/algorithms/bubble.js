async function bubbleSort(array, visualizer) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (visualizer.paused) await visualizer.waitForResume();
      if (visualizer.stopped) return;

      await visualizer.compare(j, j + 1);

      if (array[j] > array[j + 1]) {
        await visualizer.swap(array, j, j + 1);
      }
    }
    visualizer.markSorted(n - 1 - i);
  }
  visualizer.markSorted(0);
}