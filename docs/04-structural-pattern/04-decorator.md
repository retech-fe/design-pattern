---
title: 装饰者模式
description: 在不改变原对象的基础上，通过对其添加属性或方法来进行包装拓展，使得原有对象可以动态具有更多功能
last_update:
  date: 12/05/2022
  author: pengfei.zuo
---
## 1. 介绍

### 1.1 定义

- 装饰者模式 （Decorator Pattern）又称装饰器模式，在不改变原对象的基础上，通过对其添加属性或方法来进行包装拓展，使得原有对象可以动态具有更多功能。

- 本质是功能动态组合，即动态地给一个对象添加额外的职责，就增加功能角度来看，使用装饰者模式比用继承更为灵活。好处是有效地把对象的核心职责和装饰功能区分开，并且通过动态增删装饰去除目标对象中重复的装饰逻辑。

### 1.2 特点
+ 装饰不影响原有的功能，原有功能可以照常使用
+ 装饰比继承更加灵活,可以实现装饰者和被装饰者之间松耦合
+ 被装饰者可以使用装饰者动态地增加和撤销功能
+ 装饰可以增加多个，共同给目标对象添加额外功能

## 2. 生活中的示例

就像给手机套上手机壳，在不影响手机本来功能的同时，套上壳子可以起到保护手机、美观装饰等作用。

## 3. 案例

### 3.1 类图

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/10/27/13-13-31-a07539061767393a23e0d6106a63f973-20221027131331-a29373.png)

### 3.2 代码

```ts
// 形状抽象类
abstract class Shape {
    abstract draw(): void;
}

// 圆形
class Circle extends Shape {
    draw() {
        console.log('绘制圆形');
    }
}
//矩形
class Rectangle extends Shape {
    draw() {
        console.log('绘制矩形');
    }
}

// 颜色抽象类
abstract class ColorfulShape extends Shape {
    public constructor(public shape: Shape) {
        super();
    }
    abstract draw(): void;
}

// 红色
class RedColorfulShape extends ColorfulShape {
    draw() {
        this.shape.draw();
        console.log('把边框涂成红色');
    }
}

// 红色
class GreenColorfulShape extends ColorfulShape {
    draw() {
        this.shape.draw();
        console.log('把边框涂成绿色');
    }
}

// 通过装饰器设计模式可以避免类的爆炸；对形状进行颜色的装饰就可以得到有颜色的形状，而不用去实现颜色+形状的具体形状类
// 圆形
let circle = new Circle();
// 红色圆形
let redColorfulShape = new RedColorfulShape(circle);
redColorfulShape.draw();

// 矩形
let rectangle = new Rectangle();
// 蓝色矩形
let greenColorfulShape = new GreenColorfulShape(rectangle);
greenColorfulShape.draw();
```

## 4. 包装器

包装器是指将一个对象嵌入另一个对象之中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链。请求随着这条链条依次传递到所有的对象，每个对象有处理这个请求的机会。

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/05/18-37-54-d61d8a2046c0dd541171775a905556a3-20221205183753-2d22af.png)

以下代码模拟实现了装修房子的例子，目标对象是个毛坯房，用两个装饰器（墙壁刷漆，搬入家具）去装饰它。

```ts
/* 毛坯房 - 目标对象 */
class OriginHouse {
  getDesc() {
    console.log('毛坯房');
  }
}

/* 墙壁刷漆 - 装饰者 */
class Painting {
  constructor(house) {
    this.house = house;
  }
    
  getDesc() {
    this.house.getDesc();
    console.log('墙壁刷漆');
  }
}

/* 搬入家具 - 装饰者 */
class Furniture {
  constructor(house) {
    this.house = house;
  }
    
  getDesc() {
    this.house.getDesc();
    console.log('搬入家具');
  }
}

// 测试
let house = new OriginHouse();
house = new Furniture(house);
house = new Painting(house);

house.getDesc()
// 输出：毛坯房  墙壁刷漆  搬入家具
```

在装饰器模式中，一个对象被另一个对象包装起来，形成一条包装链，并增加了原先对象的功能。

和适配器模式的区别在于，适配器模式是原有的接口不能用了，所以需要一个新的；而装饰器模式是原有的还要继续用，新增的是来完善和强化的。

## 5. 装饰器

+ 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
+ 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
+ 装饰器的写法分为普通装饰器和装饰器工厂

### 5.1 类装饰器

+ 类装饰器在类声明之前声明，用来监控、修改或替换类定义
+ 参数是类的定义或者说构造函数
+ [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

decorator

```ts
export { }
namespace decorator {
    interface Animal {
        swings: string;
        fly: any
    }
    function flyable(target: any) {
        console.log(target);

        target.prototype.swings = 2;
        target.prototype.fly = function () {
            console.log('I can fly');
        }
    }
    @flyable
    class Animal {
        constructor() { }
    }
    let animal: Animal = new Animal();
    console.log(animal.swings);
    animal.fly();
}

```

decorator_factory

```ts
namespace decorator_factory {
    interface Animal {
        swings: string;
        fly: any
    }
    // 装饰器工厂 - 帮助用户传递可供装饰器使用的参数的工厂
    function flyable(swings: number) {
        // 返回装饰器函数
        return function flyable(target: any) {
            console.log(target);

            target.prototype.swings = swings;
            target.prototype.fly = function () {
                console.log('I can fly');
            }
        }
    }

    @flyable(2)
    class Animal {
        constructor() { }
    }
    let animal: Animal = new Animal();
    console.log(animal.swings);
    animal.fly();
}
```

### 5.2 属性装饰器

+ 属性装饰器表达式会在运行时当作函数被调用
+ 属性分为实例属性和类属性
+ 方法分为实例方法和类方法

```ts
namespace property_namespace {
    //实例属性target是类的原型对象,key是属性名称
    function instancePropertyDecorator(target: any, key: string) {
    }
    //类属性target是的构造函数
    function classPropertyDecorator(target: any, key: string) {
    }
    //实例方法装饰器target是原型对象,key方法名,descriptor是方法描述符
    function instanceMethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    }
    //类方法装饰器target是类的构造函数
    function classMethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    }
    class Person {
        @instancePropertyDecorator
        instanceProperty: string;
        @classPropertyDecorator
        public static classProperty: string;
        @instanceMethodDecorator
        instanceMethod() {
            console.log('instanceMethod');
        }
        @classMethodDecorator
        classMethod() {
            console.log('classMethod');
        }
    }
}
```
### 5.3 core-decorator

[core-decorator](https://github.com/jayphelps/core-decorators)
[deprecate-alias-deprecated](https://github.com/jayphelps/core-decorators#deprecate-alias-deprecated)


```ts
let { readonly } = require('core-decorators');
function deprecate(msg: string, options: any) {
    return function (target: any, attr: any, descriptor: any) {
        //DEPRECATION Calculator#add: This function will be removed in future versions.
        let oldVal = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let message = msg ? msg : `DEPRECATION ${target.constructor.name}#${attr}: This function will be removed in future versions.`;
            let see = options && options.url ? `see ${options.url}` : ``;
            console.warn(message + '\r\n' + see);
            return oldVal(...args);
        }
    }
}
class Calculator {
    @deprecate('stop using this', { url: 'http://www.baidu.com' })
    add(a: number, b: number) {
        return a + b;
    }
}
let calculator = new Calculator();
calculator.add(1, 2);
```

:::caution
值得注意的是 EcmaScript 标准（ES7）中的 Decorator 提案仍然在 stage-2 且极其不稳定。过去一年内已经经历了两次彻底大改，且和 TS 现有的实现已经完全脱节。— 尤雨溪 2019.6.12 
:::


## 6. AOP面向切面编程

+ 在软件业，AOP为Aspect Oriented Programming的缩写,意为面向切面编程
+ 可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/10/27/13-33-47-85a0b8dd02520d2ad34bbe6de00e1e57-20221027133346-1e0e99.png)

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/05/19-01-15-cac85e08419ac3aabcfe260cc784a980-20221205190115-0b1f00.png)


```js
Function.prototype.before = function(beforeFn){
    let _this = this;
    return function(){
        beforeFn.apply(this,arguments);
        return _this.apply(this,arguments);
    }
}
Function.prototype.after = function(afterFn){
    let _this = this;
    return function(){
         _this.apply(this,arguments);
        afterFn.apply(this,arguments);
    }
}
function buy(money,goods){
  console.log(`花${money}买${goods}`);
}
buy = buy.before(function(){
    console.log(`向媳妇申请1块钱.`);
});
buy = buy.after(function(){
    console.log(`把剩下的2毛钱还给媳妇.`);
});
buy(.8,'盐');
```

## 7 应用场景

+ 如果不希望系统中增加很多子类，那么可以考虑使用装饰者模式。
+ 需要通过对现有的一组基本功能进行排列组合而产生非常多的功能时，采用继承关系很难实现，这时采用装饰者模式可以很好实现。
+ 当对象的功能要求可以动态地添加，也可以动态地撤销，可以考虑使用装饰者模式。
  
### 7.1 埋点

+ 埋点分析: 是网站分析的一种常用的数据采集方法
+ 无痕埋点: 通过技术手段，完成对用户行为数据无差别的统计上传的工作,后期数据分析处理的时候通过技术手段筛选出合适的数据进行统计分析

项目配置

1. 创建项目

```shell
create-react-app tract-demo
yarn add customize-cra react-app-rewired --dev
```

2. config-overrides.js

```ts
const {
 override,
 addDecoratorsLegacy,
} = require("customize-cra");
module.exports = override(
 addDecoratorsLegacy(),
);
```

3. jsconfig.json

```json
{
 "compilerOptions": {
     "experimentalDecorators": true
 }
}
```

#### ndex.js

```js
import React from 'react';
import { render } from 'react-dom';
import { before, after } from './track';

class App extends React.Component {
    @before(() => console.log('点击方法执行前'))
    onClickBeforeButton() {
        console.log('beforeClick');
    }

    @after(() => console.log('点击方法执行后'))
    onClickAfterButton() {
        console.log('afterClick');
    }

    @after(() => fetch('/api/report'))
    onClickAjaxButton() {
        console.log('ajaxClick');
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickBeforeButton}>beforeClick</button>
                <button onClick={this.onClickAfterButton}>afterClick</button>
                <button onClick={this.onClickAjaxButton}>ajaxClick</button>
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));
```

#### track.js

```js
export const before = function (beforeFn) {
    return function (target, methodName, descriptor) {
        let oldMethod = descriptor.value;
        descriptor.value = function () {
            beforeFn.apply(this, arguments);
            return oldMethod.apply(this, arguments);
        }
    }
}

export const after = function (afterFn) {
    return function (target, methodName, descriptor) {
        let oldMethod = descriptor.value;
        descriptor.value = function () {
            oldMethod.apply(this, arguments);
            afterFn.apply(this, arguments);
        }
    }
}
```

### 7.2 表单校验

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>用户注册</title>
</head>

<body>
    <form action="">
        用户名<input type="text" name="username" id="username">
        密码<input type="text" name="password" id="password">
        <button id="submit-btn">注册</button>
    </form>
    <script>
        Function.prototype.before = function (beforeFn) {
            let _this = this;
            return function () {
                let ret = beforeFn.apply(this, arguments);
                if (ret)
                    _this.apply(this, arguments);
            }
        }
        function submit() {
            alert('提交表单');
        }
        submit = submit.before(function () {
            let username = document.getElementById('username').value;
            if (username.length < 6) {
                return alert('用户名不能少于6位');
            }
            return true;
        });
        submit = submit.before(function () {
            let username = document.getElementById('username').value;
            if (!username) {
                return alert('用户名不能为空');
            }
            return true;
        });
        document.getElementById('submit-btn').addEventListener('click', submit);
    </script>
</body>
</html>
```

### 7.3 给浏览器事件添加新功能

之前介绍的添加装饰器函数的方式，经常被用来给原有浏览器或 DOM 绑定事件上绑定新的功能，比如在 onload 上增加新的事件，或在原来的事件绑定函数上增加新的功能，或者在原本的操作上增加用户行为埋点：


```js
window.onload = function() {
  console.log('原先的 onload 事件');
}

/* 发送埋点信息 */
function sendUserOperation() {
  console.log('埋点：用户当前行为路径为 ...');
}

/* 将新的功能添加到 onload 事件上 */
window.onload = function() {
  let originOnload = window.onload;
  return function() {
    originOnload && originOnload();
    sendUserOperation();
  }
}()

// 输出：原先的 onload 事件
// 输出：埋点：用户当前行为路径为 ...
```

可以看到通过添加装饰函数，为 onload 事件回调增加新的方法，且并不影响原本的功能，我们可以把上面的方法提取出来作为一个工具方法：


```js
window.onload = function() {
  console.log('原先的 onload 事件');
}

/* 发送埋点信息 */
function sendUserOperation() {
  console.log('埋点：用户当前行为路径为 ...');
}

/* 给原生事件添加新的装饰方法 */
function originDecorateFn(originObj, originKey, fn) {
  originObj[originKey] = function() {
    let originFn = originObj[originKey];
    return function() {
      originFn && originFn();
      fn();
    }
  }()
}

// 添加装饰功能
originDecorateFn(window, 'onload', sendUserOperation);

// 输出：原先的 onload 事件
// 输出：埋点：用户当前行为路径为 ...
```

### 7.4 react-redux connect

```tsx
import React from 'react'
import {connect} from 'react-redux'

@connect()
export default class Demo extends Components{
  //...
}
```

@connect就是装饰器(Decorator)，如果熟悉react-redux就一定会知道 @connect的另一种写法。

```jsx
import React from 'react'
import {connect} from 'react-redux'
class Demo extends Components{
  //...
}
export default connect()(Demo)
```

所以显而易见装饰器的本质是函数,一个被柯里化的高阶组件(HOC)。

```js
function connect (){
  //...
  return function (WrappedComponent){
    //...
    return <WrappedComponent/>
  }
}
```

## 8. 设计原则验证

+ 将现有对象和装饰器进行分离，两者独立存在
+ 符合开放封闭原则

## 9. 装饰器模式优缺点

### 9.1 优点

+ 装饰器是继承的有力补充，比继承灵活，不改变原有对象的情况下动态地给一个对象扩展功能，即插即用
+ 通过使用不同装饰类以及这些装饰类的排列组合，可以实现不同效果
+ 装饰器完全遵守开闭原则

### 9.2 缺点
+ 从代码层面来看，使用装饰器模式会出现更多的代码，更多的类，增加程序复杂性
+ 动态装饰时，多层装饰时会更复杂

## 10. 其他相关模式

### 10.1 装饰器模式与适配器模式

装饰者模式和适配器模式都是属于包装模式，然而他们的意图有些不一样：

+ 装饰器模式：扩展功能，原有功能还可以直接使用，一般可以给目标对象多次叠加使用多个装饰者。
+ 适配器模式：功能不变，但是转换了原有接口的访问格式，一般只给目标对象使用一次。

### 10.2 装饰器模式与组合模式

这两个模式有相似之处，都涉及到对象的递归调用，从某个角度来说，可以把装饰器模式看做是只有一个组件的组合模式。

+ 装饰器模式：动态地给对象增加功能。
+ 组合模式：管理组合对象和叶子对象，为它们提供一致的操作接口给客户端，方便客户端的使用。


### 10.3 装饰器模式与策略模式

装饰器模式和策略模式都包含有许多细粒度的功能模块，但是他们的使用思路不同：

+ 装饰者模式：可以递归调用，使用多个功能模式，功能之间可以叠加组合使用。
+ 策略模式：只有一层选择，选择某一个功能。