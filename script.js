let values = [];
let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(width / 8);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  insertionSort();
}

async function insertionSort() {
  for (let i = 1; i < values.length; i++) {
    let current = values[i];
    let j = i - 1;
    states[i] = 0; // Current element being inserted

    while (j >= 0 && values[j] > current) {
      states[j] = 1; // Element being compared
      await swap(j, j + 1);
      j--;
    }

    values[j + 1] = current;
    states[i] = -1;
    for (let k = 0; k <= i; k++) {
      states[k] = -1;
    }
  }
}

async function swap(a, b) {
  await sleep(50);
  let temp = values[a];
  values[a] = values[b];
  values[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function draw() {
  background(220);

  for (let i = 0; i < values.length; i++) {
    if (states[i] == 0) {
      fill(255, 0, 0); // current element being inserted
    } else if (states[i] == 1) {
      fill(0, 255, 0); // element being compared
    } else {
      fill(255); //s unsorted or sorted elements
    }
    rect(i * 8, height - values[i], 8, values[i]);
  }
}
