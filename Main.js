import {
  ResourceLoader
} from "./js/base/ResourceLoader.js";
import {
  Director
} from "./js/Director.js";
import {
  BackGround
} from "./js/runtime/BackGround.js";
import {
  DataStore
} from "./js/base/DataStore.js";
import {
  Land
} from "./js/runtime/Land.js";
import {
  Birds
} from "./js/player/Birds.js";
import {
  StartButton
} from "./js/player/StartButton.js";
import {
  Score
} from "./js/player/Score.js";
import {
  MaxScore
} from "./js/player/MaxScore.js";
import {
  ApiExamples
} from "./js/ApiExamples.js";

// 初始化整个游戏的精灵元素,作为游戏开始的入口
export class Main {
  constructor() {
    // this.canvas = document.getElementById("game_canvas");
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map))

  }
  // 创建背景音乐
  createBackgroundMusic() {
    var bgm = wx.createInnerAudioContext();
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.src = 'audios/bgm.mp3';
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;

    // 永远保存在内存里的数据，建议放在单例中类变量
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.createBackgroundMusic();
    const examples = new ApiExamples();
    examples.login();
    this.init();
  }

  // 初始化
  init() {
    // 重置游戏没有结束
    this.director.isGameOver = false;

    this.dataStore
      .put('pencils', [])
      .put('background', BackGround)
      .put('land', Land)
      .put('birds', Birds)
      .put('score', Score)
      .put('startButton', StartButton)
      .put('maxScore', MaxScore)
    // 创建铅笔要在游戏逻辑运行之前
    this.registerEvent();
    this.director.createPencil();
    this.director.run();
  }


  // 注册我们的事件
  registerEvent() {
    // this.canvas.addEventListener('touchstart', e => {
    //   // 屏蔽原来的事件冒泡
    //   e.preventDefault();
    //   if (this.director.isGameOver) {
    //     this.init();
    //   } else {
    //     this.director.birdsEvent();
    //   }
    // })

    // 微信点击事件
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        this.init();
      } else {
        this.director.birdsEvent();
      }
    })
  }
}