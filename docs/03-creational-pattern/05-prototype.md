---
title: 原型模式
sidebar_label: 原型模式(前端不常用)
description: clone自己生成一个新对象
last_update:
  date: 11/09/2022
  author: your name
---

## 1. 介绍

原型模式（Prototype Pattern）不是指的 JS 的原型，它是 clone 自己，生成一个新对象的操作。因为 new 一个新对象的时候开销会比较大，或者由于其他原因不合适，所以采用这种方式创建一个一模一样的对象。

Java 默认有 clone 接口，不用自己实现。JS 中有一个比较像的实现就是 Object.create 方法。


## 2. 原型模式的通用实现

```js
// 一个对象（作为原型）
const prototype = {
  getName: function() {
    return this.first + '' + this.last;
  },
  say: function() {
    console.log('hello world');
  }
}

// 基于原型创建 x
let x = Object.create(prototype);
x.first = 'A';
x.last = 'B';
console.log(x.getName());
x.say();

// 基于原型创建 y
let y = Object.create(prototype);
y.first = 'C';
y.last = 'D';
console.log(y.getName());
y.say();
```

## 3. JavaScript中的原型

### 3.1 函数和对象

+ 函数是一种对象
+ 对象都是通过函数创建的

```js
//函数是一种对象
function Person() {}
console.log(Person instanceof Object);

//对象都是通过函数创建的
let p1=new Person();
let obj1={name: 'zfpx'}
let obj=new Object();
obj2.name='zfpx';
```

### 3.2 原型对象prototype

+ 每个函数都有一个属性叫做`prototype`，`prototype`的属性值是一个对象即原型对象
+ 原型对象默认的只有一个叫做`constructor`的属性，指向这个函数本身
+ 每个实例对象都有一个隐藏的属性`__proto__`,这个属性引用了创建这个对象的函数的`prototype`

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/06/19-20-31-9637f61dac252ddbc36d8d4cbbbdfd0e-20221206192031-647040.png)


+ 自定义函数的prototype是由Object创建，所以它的proto指向的就是Object.prototype
+ Object.prototype的proto指向的是null

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/06/19-23-40-4c95b06bce16ec8975b5bbe9e59f7bf7-20221206192340-1d9133.png)


+ 自定义函数`Foo.__proto__`指向Function.prototype
+ `Object.__proto__`指向Function.prototype
+ `Function.__proto__`指向Function.prototype

```ts
let sum = new Function('a','b','return a+b');
```

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/06/19-28-46-2f6a892bc3213934167403c2bcb8a73b-20221206192845-d195b0.png)


+ Function.prototype的proto也指向Object.prototype

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/06/19-32-41-ea5cf2de0a78c787bae5dce46082499a-20221206193241-97dc66.png)


+ JS 中的 prototype 可以理解为 ES6 class 的一种底层原理
+ 上面用到的 Object.create 方法也是基于原型 prototype 的
+ 而 class 是实现面向对象的基础，并不是服务于某个模式
+ 若干年后 ES6 全面普及，大家可能会忽略掉 prototype，但是 Object.create 却会长久存在

### 3.3 instanceof

+ Instanceof运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B
+ Instanceof的判断规则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

```js
console.log(Object instanceof Function);
console.log(Function instanceof Object);
console.log(Function instanceof Function);
```

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/06/19-34-45-b4f0f2affe11040f1851066f16a9fbda-20221206193445-a3c67d.png)


### 3.4 原型链

+ 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着proto这条链向上找，这就是原型链
+ hasOwnProperty可以区分一个属性到底是自己的还是从原型中找到

```js
function Foo(){
    this.a = 10;
}
Foo.prototype.b = 20;

let f1  = new Foo();
console.log(f1.a);
console.log(f1.b);
```

### 3.5 原型优势

+ 可以随意扩展
+ 可以重写继承的方法

```js
let obj = {};
console.log(obj.toString());


let arr = [1,2,3];
// Array继承Object
// Array原型上的的方法对Object原型上的方法进行了重写
console.log(arr.toString());
// Object原型上的方法
console.log(Object.prototype.toString.call(arr));
```

## 4. 场景

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin:0;
            padding:0;
        }
        canvas{
            border:1px solid #000;
        }
    </style>
</head>
<body>
    <canvas id="canvas" width="1000" height="600"></canvas>
    <script>
        //随机颜色，十六进制方法；
        function getRandomColor( ) {
          var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
          if(rand.length == 6){        
            return '#'+rand;
          }else{
            return getRandomColor();
          }
        }
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let circles = [];
        // 构造函数
        function Circle(x,y,radius){
            // 实例属性，每个对象都不一样的值
            this.x=x;
            this.y=y;
            this.radius= radius;
            circles.push(this);
        }

        // 方法放到prototype上，所有实例对象都能共享逻辑
        Circle.prototype.update = function() {
                this.radius--;
                if(this.radius>0){
                    return true;
                }
        }
        Circle.prototype.render = function(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
            ctx.fillStyle = getRandomColor();
            ctx.fill();
        }

        let circle = new Circle(0,0,30);
        canvas.onmousemove = function(event){
            circles.push(new Circle(event.clientX,event.clientY,30));
        }
        setInterval(function(){
            ctx.clearRect(0,0,1000,600);
            circles.forEach(item=>{
                item.update()&&item.render(); 
            });
            circles = circles.filter(item=>item.radius>0);
        },20);
    </script>
</body>
</html>
```
