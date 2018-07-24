import {
  DataStore
} from "./base/DataStore.js";
import {
  UpPencil
} from "./runtime/UpPencil.js";
import {
  DownPencil
} from "./runtime/DownPencil.js";

// 导演类，控制游戏的逻辑
export class Director {

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
    this.landSpeed = 2;
  }
  createPencil() {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }
  birdsEvent() {
    // 点击起飞
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }

  // 判断小鸟是否和铅笔撞击
  static isStrike(bird, pencil) {
    let s = false;
    if (bird.top > pencil.bottom || bird.bottom < pencil.top || bird.right < pencil.left || bird.left > pencil.right) {
      s = true
    }
    return !s;

  }
  // 判断小鸟是否和地板撞击
  check() {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');

    // 地板撞击判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true;
      return;
    }

    // 小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    };

    // 铅笔的边框模型
    const length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }
      if (Director.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true;
        return;
      }
    }

    // 加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    } else {

    }

  }
  run() {
    // 一秒钟调用60次
    this.check();
    if (!this.isGameOver) {
      //绘制背景
      this.dataStore.get('background').draw();

      const pencils = this.dataStore.get('pencils');
      // 销毁越界铅笔
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        // shift() 把数组第一个元素推出数组，并且把数组长度减1 
        pencils.shift();
        pencils.shift();
        this.dataStore.get('score').isScore = true;
      }
      //创建铅笔
      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil();
      }
      //绘制铅笔
      this.dataStore.get('pencils').forEach(function (value) {
        value.draw();
      })
      //创建地面
      this.dataStore.get('land').draw();
      this.dataStore.get('score').draw();
      this.dataStore.get('birds').draw();


      //无线绘制循环
      let timer = requestAnimationFrame(() => {
        this.run();
      })
      this.dataStore.put('timer', timer);
    } else {
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
    }
  }


}