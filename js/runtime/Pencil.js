import {
  Sprite
} from "../base/Sprite.js";
import {
  Director
} from "../Director.js";
import {
  DataStore
} from "../base/DataStore.js";

// 铅笔的基类
export class Pencil extends Sprite {
  constructor(image, top) {
    super(image,
      0, 0,
      image.width, image.height,
      // 刚还在右侧最边缘且刚好看不到的位置
      DataStore.getInstance().canvas.height, 0,
      image.width, image.height);
    this.top = top;
  }

  draw() {
    this.x = this.x - Director.getInstance().landSpeed;
    super.draw(this.img,
      0, 0,
      this.img.width, this.img.height,
      this.x, this.y,
      this.img.width, this.img.height)
  }
}