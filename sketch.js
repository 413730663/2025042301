let fishPoints = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let fishes = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 載入音樂檔案
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立畫布寬度為視窗寬度，高度為視窗高度
  song.loop(); // 音樂循環播放
  amplitude = new p5.Amplitude(); // 創建振幅分析器

  for (let i = 0; i < 10; i++) {
    fishes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2)
    });
  }
}

function draw() {
  background("#ffcad4"); // 設定背景顏色為粉紅色

  let level = amplitude.getLevel(); // 獲取當前音樂的振幅
  let sizeFactor = map(level, 0, 1, 1, 1.5); // 將振幅映射到縮放因子

  // 繪製小魚
  for (let fish of fishes) {
    fish.x += fish.dx;
    fish.y += fish.dy;

    if (fish.x < 0 || fish.x > width) fish.dx *= -1;
    if (fish.y < 0 || fish.y > height) fish.dy *= -1;

    push();
    translate(fish.x, fish.y);
    scale(sizeFactor); // 根據音樂振幅縮放小魚
    fill("#caf0f8"); // 設定填滿顏色為淺藍色
    stroke(255); // 設定邊框顏色為白色
    strokeWeight(2.5); // 設定小魚邊框粗細為2.5
    beginShape();
    for (let point of fishPoints) {
      vertex(point[0] * 2, point[1] * 2);
    }
    endShape(CLOSE);
    pop();
  }

  // 繪製大魚
  push();
  translate(width / 2, height / 2); // 將原點移到畫布中心
  scale(sizeFactor); // 根據音樂振幅縮放大魚
  fill("#caf0f8"); // 設定填滿顏色為淺藍色
  stroke(255); // 設定邊框顏色為白色
  strokeWeight(5); // 設定大魚邊框粗細為5
  beginShape();
  for (let point of fishPoints) {
    vertex(point[0] * 20, point[1] * 20);
  }
  endShape(CLOSE);
  pop();
}
