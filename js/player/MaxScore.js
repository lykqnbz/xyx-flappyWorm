import {
  DataStore
} from "../base/DataStore.js";

// 最大分数类
export class MaxScore {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    if (wx.getStorageSync('maxScore')) {
      this.maxScoreNumber = wx.getStorageSync('maxScore');
    } else {
      this.maxScoreNumber = 0;
    }
  }

  draw() {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.fillText(
      "最高分:" + this.maxScoreNumber,
      DataStore.getInstance().canvas.width / 12,
      DataStore.getInstance().canvas.height / 12,
      1000
    )
  }
}