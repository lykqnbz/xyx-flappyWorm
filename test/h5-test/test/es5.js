(function () {
  'use strict';

  var Animal = function (name, age) {
    this.name = name;
    this.age = age;
    //  写法1
    // this.say = function () {
    //   console.log(this.name + ' ' + this.age)
    // };
    //  写法2 原型链写法
    Animal.prototype.say = function () {
      console.log(this.name + ' ' + this.age)
    }
  };

  // var cat = new Animal('小猫111', 3)
  // cat.say();

  // // call() apply()
  // // 调用一个对象的一个方法，用另一个对象替换当前对象

  // Animal.prototype.say.call(cat);
  // var params = {
  //   name: '小时333',
  //   age: '55'
  // }
  // cat.say.call(params)
  
  // 寄生组合继承
  var Cat =function(name,age){
      // Animal.apply(this,arguments);
      // Animal.apply(this,[name,age]);
      // 等价上下
      Animal.call(this,name,age);
  };
  Cat.prototype=Object.create(Animal.prototype);
  //上下两种都是生成，上面带有浅克隆，更加合理
  // Cat.prototype=new Animal();
  Cat.prototype.say=function(){
    var p={
      name:'父类名字',
      age:'23'
    }
    Animal.prototype.say.apply(p);
    console.log("我来组成头部"+ this.name+"   "+this.age)
  }

  var cat1=new Cat("喵喵喵",5);
  cat1.say();
})();