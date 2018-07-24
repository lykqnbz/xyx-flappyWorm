//上半部分的部分的铅笔柱子
import {
  Pencil
} from "./Pencil.js";
import {
  Sprite
} from "../base/Sprite.js";

export class UpPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilUp');
    super(image, top);
  }

  draw() {
    this.y = this.top - this.height;
    super.draw()
  };
}