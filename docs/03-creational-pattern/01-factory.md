---
title: 工厂模式
description: 根据不同的输入返回不同类的实例
last_update:
  date: 11/13/2022
  author: pengfei.zuo
---

# **工厂模式**
## **1. 介绍**

工厂模式（`Factory Pattern`），根据不同的名称输入返回不同类的实例，一般用来创建同一类对象。工厂模式的主要思想是将对象的创建与对象的实现分离。

## **2. 生活中的示例**

+ 我们去 `KFC` 购买汉堡，只需直接点餐、取餐，不用自己亲手做
+ `KFC` 要「封装」做汉堡的工作，做好直接给购买者

在类似场景中，这些例子有以下特点：

+ 访问者只需要知道产品名，就可以从工厂获得对应实例。
+ 访问者不关心实例创建过程。

## **3. 分类**

工厂模式分为简单工厂模式、工厂方法模式、抽象工厂模式。


## **4. 简单工厂模式**

简单工厂模式是由一个工厂对象决定创建出哪一种产品类的实例 

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/13/20-57-26-e16ee52c9621a450ca9152ccc36cf554-20221113205725-085429.png)

简单工厂模式包含如下角色：

+ Factory：工厂角色
工厂角色负责实现创建所有实例的内部逻辑

+ Product：抽象产品角色
抽象产品角色是所创建的所有对象的父类，负责描述所有实例所共有的公共接口 

+ ConcreteProduct：具体产品角色
具体产品角色是创建目标，所有创建的对象都充当这个角色的某个具体类的实例。

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/13/22-00-40-7c321468290ca3d25c036b806a58283b-SimpleFactory%20-1--df31cd.jpg)

### **4.1 实现**

类图： `AmericanoCoffee`、`LatteCoffee`和`CappuccinoCoffee`都是继承`Coffee`
 
 ![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/13/19-53-49-bd6d8e2db9250d58d5a5a5a7894ea1e3-20221113195348-cf8f84.png)
 
 代码
 
 ```js
 abstract class Coffee {
    constructor(public name: string) {

    }
}
class AmericanoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class LatteCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class CappuccinoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}

class Café {
    static order(name: string) {
        switch (name) {
            case 'Americano':
                return new AmericanoCoffee('美式咖啡');
            case 'Latte':
                return new LatteCoffee('拿铁咖啡');
            case 'Cappuccino':
                return new LatteCoffee('卡布奇诺');
            default:
                return null;
        }
    }
}
console.log(Café.order('Americano'));
console.log(Café.order('Latte'));
console.log(Café.order('Cappuccino'));
 ```


### **4.2 前端应用场景 **

#### ** 4.2.1 jQuery **

[jQuery](https://github.com/jquery/jquery/blob/c1ee33aded44051b8f1288b59d2efdc68d0413cc/src/core.js#L24-L29)

```js
class jQuery{
    constructor(selector){
        let elements = Array.from(document.querySelectorAll(selector));
        let length = elements?elements.length:0;
        for(let i=0;i<length;i++){
            this[i]=elements[i];
        }
        this.length = length;
    }
    html(html){
        if(html){
           this[0].innerHTML=html;
        }else{
          return this[0].innerHTML;
        }
    }
}
window.$ = function(selector){
   return new jQuery(selector);
}
```

#### **4.2.2 Vue/React 源码中的工厂模式**

和原生的 `document.createElement` 类似，`Vue `和 `React` 这种具有虚拟 `DOM `树（`Virtual Dom Tree`）机制的框架在生成虚拟 `DOM` 的时候，都提供了 `createElement` 方法用来生成 `VNode`，用来作为真实 `DOM` 节点的映射

```js
// Vue
createElement('h3', { class: 'main-title' }, [
  createElement('img', { class: 'avatar', attrs: { src: '../avatar.jpg' } }),
  createElement('p', { class: 'user-desc' }, '放弃不难，但坚持一定很酷')
])

// React
React.createElement('h3', { className: 'user-info' },
  React.createElement('img', { src: '../avatar.jpg', className: 'avatar' }),
  React.createElement('p', { className: 'user-desc' }, '放弃不难，但坚持一定很酷')
)

```
createElement 函数结构大概如下：

```js
class Vnode (tag, data, children) { ... }

function createElement(tag, data, children) {
  return new Vnode(tag, data, children)
}

```

可以看到 `createElement` 函数内会进行 `VNode` 的具体创建，创建的过程是很复杂的，而框架提供的 `createElement` 工厂方法封装了复杂的创建与验证过程，对于使用者来说就很方便了。

#### **4.2.3 vue-router 源码中的工厂模式**

工厂模式在源码中应用频繁，以 `vue-router` 中的源码为例，代码位置：[vue-router/src/index.js](https://github.com/vuejs/vue-router/blob/v3.0.6/src/index.js)

```js
// src/index.js
export default class VueRouter {
  constructor(options) {
    this.mode = mode	// 路由模式
        
    switch (mode) {     // 简单工厂
      case 'history':   // history 方式
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':      // hash 方式
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':  // abstract 方式
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        // ... 初始化失败报错
    }
  }
}
```

稍微解释一下这里的源码。`mode` 是路由创建的模式，这里有三种 `History`、`Hash`、`Abstract`，前两种我们已经很熟悉了，`History `是 `H5` 的路由方式，`Hash` 是路由中带 `#` 的路由方式，`Abstract` 代表非浏览器环境中路由方式，比如 `Node`、`weex` 等；`this.history` 用来保存路由实例，`vue-router` 中使用了工厂模式的思想来获得响应路由控制类的实例。

源码里没有把工厂方法的产品创建流程封装出来，而是直接将产品实例的创建流程暴露在 `VueRouter` 的构造函数中，在被 `new` 的时候创建对应产品实例，相当于` VueRouter`的构造函数就是一个工厂方法。

如果一个系统不是 `SPA` （`Single Page Application`，单页应用），而是是 `MPA`（`Multi Page Application`，多页应用），那么就需要创建多个 `VueRouter `的实例，此时 `VueRouter` 的构造函数也就是工厂方法将会被多次执行，以分别获得不同实例。


### **4.3 简单工厂模式的优缺点**

####  **4.3.1 优点**

+ 工厂类含有必要的判断逻辑，可以决定在什么时候创建哪一个产品类的实例，客户端可以免除直接创建产品对象的责任，而仅仅“消费”产品；简单工厂模式通过这种做法实现了对责任的分割，它提供了专门的工厂类用于创建对象。
+ 客户端无须知道所创建的具体产品类的类名，只需要知道具体产品类所对应的参数即可，对于一些复杂的类名，通过简单工厂模式可以减少使用者的记忆量。

####  **4.3.2 缺点**

+ 工厂负责所有产品的创建：如果产品的种类非常多switch case的判断会变得非常多
+ 耦合和依赖于具体的实现：不符合开放—封闭原则,如果要增加或删除一个产品种类，就要修改switch case的判断代码

## **5. 工厂方法模式**

简单工厂模式是根据输入的不同返回不同产品的实例；而工厂方式的主要思想是增加抽象工厂类，将不同产品的创建分离到不同的工厂中，工厂类的职责比较单一。

+ 工厂方法模式`Factory Method`，又称多态性工厂模式。
+ 在工厂方法模式中，核心的工厂类不再负责所有的产品的创建，而是将具体创建的工作交给工厂子类去做。

### **5.1 类图**

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/13/21-03-47-c20e9f449e38b496ba02f546ef9d967d-factorymethod-dc0b3e.png)

### **5.2 代码**

```ts
abstract class Coffee {
    constructor(public name: string) {

    }
}
abstract class Factory {
    abstract createCoffee(): Coffee;
}
class AmericanoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}

class AmericanoCoffeeFactory extends Factory {
    createCoffee() {
        return new AmericanoCoffee('美式咖啡')
    }
}

class LatteCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class LatteCoffeeFactory extends Factory {
    createCoffee() {
        return new LatteCoffee('拿铁咖啡')
    }
}
class CappuccinoCoffee extends Coffee {
    constructor(public name: string) {
        super(name);
    }
}
class CappuccinoFactory extends Factory {
    createCoffee() {
        return new CappuccinoCoffee('卡布奇诺')
    }
}
class Café {
    static order(name: string) {
        switch (name) {
            case 'Americano':
                return new AmericanoCoffeeFactory().createCoffee();
            case 'Latte':
                return new LatteCoffeeFactory().createCoffee();
            case 'Cappuccino':
                return new CappuccinoFactory().createCoffee();
            default:
                return null;
        }
    }
}
console.log(Café.order('Americano'));
console.log(Café.order('Latte'));
console.log(Café.order('Cappuccino'));
```

### **5.3 改进**

+ 上面的方案虽然具体创建的工作交给工厂子类去做，抽象工厂不在负责创建具体的产品；但是新增产品是还是需要添加`switch  case`。
+ 通过引入`Map`配置文件，可以在不修改任何客户端代码的情况下更换和增加新的具体产品类，在一定程度上提高了系统的灵活性。


```js
const settings={
    'Americano': AmericanoCoffeeFactory,
    'Latte': LatteCoffeeFactory,
    'Cappuccino': CappuccinoFactory
}

console.log(new settings('Americano').createCoffee());
console.log(new settings('Latte').createCoffee());
console.log(new settings('Cappuccino').createCoffee());
```


## 6. **设计原则验证**

+ 构造函数和创建者分离
+ 符合开放封闭原则

## 7. **工厂模式的优缺点**

### **7.1 优点**

+ 良好的封装，代码结构清晰，访问者无需知道对象的创建流程，特别是创建比较复杂的情况下。
+ 扩展性优良，通过工厂方法隔离了用户和创建流程隔离，符合开放封闭原则。
+ 解耦了高层逻辑和底层产品类，符合最少知识原则，不需要的就不要去交流。

### **7.2 缺点**

带来了额外的系统复杂度，增加了抽象性。

## 8. **工厂模式的适用场景**

那在什么时候使用工厂模式呢：

+ 工厂类负责创建的对象比较少：由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。
+ 客户端只知道传入工厂类的参数，对于如何创建对象不关心：客户端既不需要关心创建细节，甚至连类名都不需要记住，只需要知道类型所对应的参数。
+ 对象的创建比较复杂，而访问者无需知道创建的具体流程。

什么时候不该用工厂模式：

滥用只是增加了不必要的系统复杂度，过犹不及。