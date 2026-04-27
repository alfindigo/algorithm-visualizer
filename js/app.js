const visualizer = new Visualizer();
let array = [];
let running = false;

const algorithmMap = {
  bubble: { fn: bubbleSort, name: 'Bubble Sort', complexity: 'O(n²)' },
  selection: { fn: selectionSort, name: 'Selection Sort', complexity: 'O(n²)' },
  insertion: { fn: insertionSort, name: 'Insertion Sort', complexity: 'O(n²)' },
  merge: { fn: mergeSort, name: 'Merge Sort', complexity: 'O(n log n)' },
  quick: { fn: quickSort, name: 'Quick Sort', complexity: 'O(n log n) avg' },
};

function generateArray() {
  if (running) return;
  const size = parseInt(document.getElementById('size-slider').value);
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 98) + 2);
  visualizer.render(array);
  updateStats();
}

function updateStats() {
  const algo = document.getElementById('algo-select').value;
  const info = algorithmMap[algo];
  document.getElementById('algo-name').textContent = info.name;
  document.getElementById('algo-complexity').textContent = info.complexity;
}

function updateSizeLabel() {
  document.getElementById('size-label').textContent = document.getElementById('size-slider').value;
}

function updateSpeedLabel() {
  const val = parseInt(document.getElementById('speed-slider').value);
  visualizer.setSpeed(val);
  const label = val < 30 ? 'Slow' : val < 70 ? 'Medium' : 'Fast';
  document.getElementById('speed-label').textContent = label;
}

async function startSort() {
  if (running) return;
  running = true;
  visualizer.stopped = false;
  visualizer.paused = false;

  document.getElementById('btn-start').disabled = true;
  document.getElementById('btn-pause').disabled = false;
  document.getElementById('btn-reset').disabled = false;
  document.getElementById('algo-select').disabled = true;
  document.getElementById('size-slider').disabled = true;

  const algo = document.getElementById('algo-select').value;
  const arrCopy = [...array];

  try {
    await algorithmMap[algo].fn(arrCopy, visualizer);
  } catch (e) {}

  running = false;
  document.getElementById('btn-start').disabled = false;
  document.getElementById('btn-pause').disabled = true;
  document.getElementById('btn-pause').textContent = 'Pause';
  document.getElementById('algo-select').disabled = false;
  document.getElementById('size-slider').disabled = false;
}

function togglePause() {
  if (!running) return;
  visualizer.paused = !visualizer.paused;
  document.getElementById('btn-pause').textContent = visualizer.paused ? 'Resume' : 'Pause';
}

function resetSort() {
  visualizer.reset();
  running = false;
  document.getElementById('btn-start').disabled = false;
  document.getElementById('btn-pause').disabled = true;
  document.getElementById('btn-pause').textContent = 'Pause';
  document.getElementById('algo-select').disabled = false;
  document.getElementById('size-slider').disabled = false;
  generateArray();
}

// event listeners
document.getElementById('btn-generate').addEventListener('click', generateArray);
document.getElementById('btn-start').addEventListener('click', startSort);
document.getElementById('btn-pause').addEventListener('click', togglePause);
document.getElementById('btn-reset').addEventListener('click', resetSort);
document.getElementById('algo-select').addEventListener('change', updateStats);
document.getElementById('size-slider').addEventListener('input', () => { updateSizeLabel(); generateArray(); });
document.getElementById('speed-slider').addEventListener('input', updateSpeedLabel);

// init
generateArray();
updateSpeedLabel();