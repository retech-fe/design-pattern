---
title: 单例模式
description: 保证一个类只有一个实例
last_update:
  date: 11/09/2022
  author: your name
---

# 单例模式

- 单例模式可能是设计模式里面最简单的模式了，虽然简单，但在我们日常生活和编程中却经常接触到，本节我们一起来学习一下。
- 单例模式 （Singleton Pattern）又称为单体模式，保证一个类只有一个实例，并提供一个访问它的全局访问点。也就是说，第二次使用同一个类创建新对象的时候，应该得到与第一次创建的对象完全相同的对象。

## **1. 你曾经遇见过的单例模式**

- 当我们在电脑上玩经营类的游戏，经过一番眼花缭乱的骚操作好不容易走上正轨，夜深了我们去休息，第二天打开电脑，发现要从头玩，立马就把电脑扔窗外了，所以一般希望从前一天的进度接着打，这里就用到了存档。每次玩这游戏的时候，我们都希望拿到同一个存档接着玩，这就是属于单例模式的一个实例。
- 编程中也有很多对象我们只需要唯一一个，比如数据库连接、线程池、配置文件缓存、浏览器中的 window/document 等，如果创建多个实例，会带来资源耗费严重，或访问行为不一致等情况。
- 类似于数据库连接实例，我们可能频繁使用，但是创建它所需要的开销又比较大，这时只使用一个数据库连接就可以节约很多开销。一些文件的读取场景也类似，如果文件比较大，那么文件读取就是一个比较重的操作。比如这个文件是一个配置文件，那么完全可以将读取到的文件内容缓存一份，每次来读取的时候访问缓存即可，这样也可以达到节约开销的目的。

**在类似场景中，这些例子有以下特点：**

- 每次访问者来访问，返回的都是同一个实例；
- 如果一开始实例没有创建，那么这个特定类需要自行创建这个实例；

## **2. 实例的代码实现**

**类图**

![image-20221109181007228](./img/image-signle.png)

### **2.1 代码实现**

我们可以使用 JavaScript 来将浏览器的 Window 单例实现一下。

> 首先是 ES6 方式：

```ts
class Window {
  // 存储单例
  private static instance: Window

  public static getInstance() {
    // 判断是否已经有单例了
    if (!Window.instance) {
      Window.instance = new Window()
    }
    //返回实例
    return Window.instance
  }
}
//把Window做成单例
let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1 === w2) //true
```

> ES5 方式同理

```ts
function Window() {}
Window.prototype.hello = function () {
  console.log("hello")
}
Window.getInstance = (function () {
  let window: Window
  // 判断是否已经有单例了
  return function () {
    if (!window) {
      window = new (Window as any)()
    }
    return window
  }
})()
let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1 === w2) //true
```

### **2.2 初步优化——透明单例**

上面的实现没有问题，也可以正常运行，但是这种使用方式有缺点，就是说必须要告诉 使用者通过`getInstance`方法得到单例

**特点**

- 客户端或者说使用者并不需要知道要按单例使用

```ts
let Window = (function () {
  let window: Window
  let WindowInstance = function (this: Window) {
    if (window) {
      return window
    } else {
      //如果说构造函数返回一个对象的话。
      return (window = this)
    }
  }
  return WindowInstance
})()
let w1 = new (Window as any)()
let w2 = new (Window as any)()
console.log(w1 === w2) //ture
```

### **2.3 单例与构建过程的分离**

```ts
interface Window {
  hello: any
}
function Window() {}
Window.prototype.hello = function () {
  console.log("hello")
}
//专门用来创建Window单例
let createInstance = (function () {
  let instance: Window
  return function () {
    if (!instance) {
      instance = new (Window as any)()
    }
    return instance
  }
})()

let window1 = createInstance()
let window2 = createInstance()
window1.hello()
console.log(window1 === window2)
```

### **2.4 封装变化**

上述`2.3`的代码中的`createInstance`只是用能创建 Window 实例，我们希望这个`createInstance`可以创建任何类型的实例

```ts
interface Window {
  hello: any
}
function Window() {}
Window.prototype.hello = function () {
  console.log("hello")
}
//希望这个createInstance可以创建任何类型的实例
let createInstance = function (Constructor: any) {
  let instance: any
  return function AnyConstructor(this: any) {
    if (!instance) {
      //正常来说 this.__proto__=AnyConstructor.prototype
      Constructor.apply(this, arguments)
      //this.__proto__= Constructor.prototype
      Object.setPrototypeOf(this, Constructor.prototype)
      instance = this
    }
    return instance
  }
}
let createWindow = createInstance(Window)
let w1 = new (createWindow as any)()
let w2 = new (createWindow as any)()
console.log(w1 === w2) //true
```

### **2.5 惰性单例、懒汉式-饿汉式**

- 有时候一个实例化过程比较耗费性能的类，但是却一直用不到，如果一开始就对这个类进行实例化就显得有些浪费，那么这时我们就可以使用惰性创建，即延迟创建该类的单例。之前的例子都属于惰性单例，实例的创建都是 `new` 的时候才进行。

**惰性单例又被成为懒汉式，相对应的概念是饿汉式：**

- 懒汉式单例是在使用时才实例化
- 饿汉式是当程序启动时或单例模式类一加载的时候就被创建。
- 我们可以举一个简单的例子比较一下：

> 饿汉式

```ts
class Window {
  //直接进行创建
  private static instance: Window = new Window()
  public static getInstance() {
    return Window.instance
  }
}
//把Window做成单例
let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1 === w2)
```

> 懒汉式

```ts
class Window {
  // 存储单例
  private static instance: Window

  public static getInstance() {
    // 判断是否已经有单例了
    if (!Window.instance) {
      Window.instance = new Window()
    }
    //返回实例
    return Window.instance
  }
}
//把Window做成单例
let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1 === w2) //true
```

惰性创建在实际开发中使用很普遍，了解一下对以后的开发工作很有帮助。

## **3. 单例模式的优缺点**

单例模式主要解决的问题就是节约资源，保持访问一致性。

**简单分析一下它的优点：**

- 单例模式在创建后在内存中只存在一个实例，节约了内存开支和实例化时的性能开支，特别是需要重复使用一个创建开销比较大的类时，比起实例不断地销毁和重新实例化，单例能节约更多资源，比如数据库连接；
- 单例模式可以解决对资源的多重占用，比如写文件操作时，因为只有一个实例，可以避免对一个文件进行同时操作；
- 只使用一个实例，也可以减小垃圾回收机制 `GC（Garbage Collecation）` 的压力，表现在浏览器中就是系统卡顿减少，操作更流畅，CPU 资源占用更少；

**单例模式也是有缺点的**

- 单例模式对扩展不友好，一般不容易扩展，因为单例模式一般自行实例化，没有接口；
- 与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化；

## **4. 单例模式的使用场景**

那我们应该在什么场景下使用单例模式呢：

- 当一个类的实例化过程消耗的资源过多，可以使用单例模式来避免性能浪费；
- 当项目中需要一个公共的状态，那么需要使用单例模式来保证访问一致性；
