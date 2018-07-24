import {
  DataStore
} from "../base/DataStore.js";

// 积分器类
export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNumber = 0;
    // 需要一个变量控制加分一次
    this.isScore = true;
  }

  draw() {
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth / 2,
      window.innerHeight / 18,
      1000
    )
  }
}