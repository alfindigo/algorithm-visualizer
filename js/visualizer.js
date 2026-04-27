class Visualizer {
  constructor() {
    this.container = document.getElementById('bars-container');
    this.bars = [];
    this.paused = false;
    this.stopped = false;
    this.speed = 50;
    this.sortedIndices = new Set();
  }

  setSpeed(val) {
    // val: 1 (slow) to 100 (fast)
    this.speed = val;
  }

  getDelay() {
    // map speed 1-100 to delay 600ms-2ms
    return Math.max(2, 600 - (this.speed * 5.98));
  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, this.getDelay()));
  }

  waitForResume() {
    return new Promise(resolve => {
      const check = setInterval(() => {
        if (!this.paused || this.stopped) {
          clearInterval(check);
          resolve();
        }
      }, 100);
    });
  }

  render(array) {
    this.bars = [];
    this.sortedIndices = new Set();
    this.container.innerHTML = '';
    const max = Math.max(...array);

    array.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${(val / max) * 100}%`;
      bar.style.width = `${Math.max(2, Math.floor(this.container.clientWidth / array.length) - 1)}px`;
      this.container.appendChild(bar);
      this.bars.push(bar);
    });
  }

  updateBar(index, value) {
    const max = this.bars.length;
    if (this.bars[index]) {
      const allHeights = Array.from(this.bars).map(b => parseFloat(b.style.height));
      this.bars[index].style.height = `${value / 100 * 100}%`;
    }
  }

  async compare(i, j) {
    this.setColor(i, 'comparing');
    this.setColor(j, 'comparing');
    await this.sleep();
    this.resetColor(i);
    this.resetColor(j);
  }

  async swap(array, i, j) {
    this.setColor(i, 'swapping');
    this.setColor(j, 'swapping');
    await this.sleep();

    // swap values
    [array[i], array[j]] = [array[j], array[i]];

    // swap heights
    const tmpHeight = this.bars[i].style.height;
    this.bars[i].style.height = this.bars[j].style.height;
    this.bars[j].style.height = tmpHeight;

    await this.sleep();
    this.resetColor(i);
    this.resetColor(j);
  }

  markSorted(index) {
    this.sortedIndices.add(index);
    if (this.bars[index]) {
      this.bars[index].classList.add('sorted');
    }
  }

  setColor(index, state) {
    if (!this.bars[index]) return;
    this.bars[index].classList.remove('comparing', 'swapping', 'sorted');
    this.bars[index].classList.add(state);
  }

  resetColor(index) {
    if (!this.bars[index]) return;
    if (this.sortedIndices.has(index)) {
      this.bars[index].className = 'bar sorted';
    } else {
      this.bars[index].className = 'bar';
    }
  }

  reset() {
    this.paused = false;
    this.stopped = true;
    this.sortedIndices = new Set();
    this.bars.forEach(bar => {
      bar.className = 'bar';
    });
  }
}