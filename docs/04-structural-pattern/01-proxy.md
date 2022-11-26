---
title: 代理模式
description: 为目标对象创造了一个代理对象，以控制对目标对象的访问
last_update:
  date: 11/19/2022
  author: 骆金荣
---

## **1. 定义 **

+ 代理模式 （Proxy Pattern）又称委托模式，它为目标对象创造了一个代理对象，以控制对目标对象的访问，也可以理解为对外暴露的接口并不是原对象。
+ 代理模式把代理对象插入到访问者和目标对象之间，从而为访问者对目标对象的访问引入一定的间接性。正是这种间接性，给了代理对象很多操作空间，比如在调用目标对象前和调用后进行一些预操作和后操作，从而实现新的功能或者扩展目标的功能。
+ 通俗地讲，生活中也有比较常见的代理模式：中介、寄卖、经纪人等等。而这种模式存在的意义在于当访问者与被访问者不方便直接访问/接触的情况下，提供一个替身来处理事务流程，实际访问的是替身，替身将事务做了一些处理/过滤之后，再转交给本体对象以减轻本体对象的负担。
+ 前端实际开发中经常会遇到如：中间跨域代理server、nginx反向代理、事件委托、对象拦截器(defineProperty和proxy)等都可以看做是代理模式的思想。

## **2. 生活中的示例**

明星一般都有个经纪人，如果某个品牌来找明星做广告，需要经纪人帮明星做接洽工作，而且经纪人也起到过滤的作用。

在类似场景中，这些例子有以下特点：
+ 广告商（访问者）对明星（目标）的访问都是通过经纪人（代理）来完成。
+ 访问者不关心实例创建过程。

## **3. 模式结构和时序图**

代理模式包含如下角色：

+ Subject: 抽象主题角色
+ Proxy: 代理主题角色
+ RealSubject: 真实主题角色

### **3.1 类图**
![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/26/10-16-12-085146d660b04905e212d60966b0707f-Proxy-480769.jpeg)

### **3.2 时序图**

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/26/10-17-46-26bac0d8ce8abb6774e45d682a15e509-seq_Proxy-aaadfa.jpeg)

### **3.3 常规模式VS代理模式**

![proxy](../../static/img/proxy.drawio.png)

## **4. 通用实现**

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/26/10-22-29-04edcd6ed32db9e1d88fa0885f836c22-192758_e26dc7bc_1720749-44af59.jpeg)


```ts
class Goole{
    constructor() {    }
    get() {
        return 'google';
    }
}

class Proxy {
    constructor() {
        this.google=new Goole();
    }
    get() {
        return this.google.get();
    }
}
let proxy = new Proxy();
let ret = proxy.get();
console.log(ret);
```

## **5. 场景**

### **5.1 保护代理**

+ 当一个对象可能会收到大量请求时，可以设置保护代理，通过一些条件判断对请求进行过滤。
+ 保护代理其实就是对访问的过滤，之前的经纪人例子就属于这种类型。

**改进前**

```js
  const server = {
    handleRequest: (request) => {
      console.log('receive request: ', request);
    },
  };
  ​
  const Request = function () {};
  ​
  const client = {
   requestTo: (server) => {
     const req = new Request();
     server.receiveRequest(req);
    },
  };
  ​
  client.requestTo(server);
```

**改进后**

```js
/**
  * 保护代理简单实现
  * client向服务端发送一个请求
  * proxy代理请求转发给服务端
  * 服务端处理请求
  */

const proxy = {
  receiveRequest: (request) => {
     // 校验身份
     const pass = validatePassport(request);
     if (pass) {
       // 监听服务端 ready 后代理请求
       server.listenReady(() => {
         console.log('proxy request: ', request);
         server.handleRequest(request);
       });
     }
  },
};

client.requestTo(proxy);
```

### **5.2 虚拟代理**

在程序中可以能有一些代价昂贵的操作，此时可以设置虚拟代理，虚拟代理会在适合的时候才执行操作

虚拟代理是为一个开销很大的操作先占位，之后再执行，比如：

+ 一个很大的图片加载前，一般使用菊花图、低质量图片等提前占位，优化图片加载导致白屏的情况。
+ 现在很流行的页面加载前使用骨架屏来提前占位，很多 WebApp 和 NativeApp 都采用这种方式来优化用户白屏体验。


```js
// 图片懒加载
const img = (() => {
  const imgNode = document.createElement('img');
  imgNode.style.width = '200px'
  document.body.appendChild(imgNode);
  return {
    setSrc: (src) => {
      imgNode.src = src;
    },
    setLoading: () => {
      imgNode.src = './img/loading.gif'
    }
  };
})();

const proxyImg = ((source) => {
  // 替身图片对象
  const tempImg = new Image();
  // 监听资源加载完成，将资源替换给实体图片对象
  tempImg.onload = function () {
    source.setSrc(this.src);
  };
  return {
    // 代理开始将实体对象设置为loading状态，使用替身对象开始加载图片资源
    setSrc:(src)=>{
      source.setLoading()
      tempImg.src = src;
    }
  }
})(img);

proxyImg.setSrc('https://static-prod.retech.us/onder-cender/DoorDash.svg')
```

### **5.3 缓存代理**

+ 缓存代理可以作为一些开销大的运算结果提供暂时的存储，下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果

+ 缓存代理就是使用高阶函数和缓存的设计思想，将复杂计算的结果缓存起来，下次传参一致时直接返回之前缓存的计算结果。

#### **5.3.1 fibonacci**

```js
/**
* 对于一些比较消耗性能的操作
* 可以将结果缓存起来
* 在获取结果时优先从缓存中取，缓存中没有再计算
*/

let fibonacci = function(n){
  if(n === 1 || n === 0 ) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

//缓存代理
let proxy = (function(fn){
  let cache = {};
  return function(){
    let args = Array.prototype.join.call(arguments,',');
    if(args in cache){
      return cache[args];
    }
    return cache[args] = fn.apply(this,arguments);
  }
})(fibonacci);

proxy(3)
```

#### **5.3.2 合并http请求**

```js
//上传请求
let upload = function(ids){
    $.ajax({
        data: {
            id:ids
        }
    })
}

//代理合并请求
let proxy = (function(){
  let cache = [],
      timer = null;
  return function(id){
    cache[cache.length] = id;
    if(timer) return false;
    timer = setTimeout(function(){
      upload(cache.join(','));
      clearTimeout(timer);
      timer = null;
      cache = [];
    },2000);
  }    
})();

// 绑定点击事件
let checkbox = document.getElementsByTagName( "input" );
for(var i= 0, c; c = checkbox[i++];){
  c.onclick = function(){
    if(this.checked === true){
      proxy(this.id);
    }
  }
}
```
### **5.4 节流防抖代理**

+ 通过防抖代理优化可以把多次请求合并为一次，提高性能
+ 节流与防抖都是为了减少频繁触发事件回调
+ 节流(Throttle)是在某段时间内不管触发了多少次回调都只认第一个，并在第一次结束后执行回调
+ 防抖(Debounce)就是在某段时间不管触发了多少回调都只看最后一个

#### 5.4.1 节流
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #container {
            width: 200px;
            height: 400px;
            border: 1px solid red;
            overflow: auto;
        }

        #container .content {
            height: 4000px;
        }
    </style>
</head>

<body>
    <div id="container">
        <div class="content"></div>
    </div>
    <script>
        function throttle(callback, interval) {
            let last;
            return function () {
                let context = this;
                let args = arguments;
                let now = Date.now();
                if (last) {
                    if (now - last >= interval) {
                        last = now;
                        callback.apply(context, args);
                    }
                } else {
                    callback.apply(context, args);
                    last = now;
                }

            }
        }
        let lastTime = Date.now();
        const throttle_scroll = throttle(() => {
            console.log('触发了滚动事件', (Date.now() - lastTime) / 1000);
        }, 1000);
        document.getElementById('container').addEventListener('scroll', throttle_scroll);
    </script>
</body>

</html>
```

#### 5.4.2 防抖

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #container {
            width: 200px;
            height: 400px;
            border: 1px solid red;
            overflow: auto;
        }

        #container .content {
            height: 4000px;
        }
    </style>
</head>

<body>
    <div id="container">
        <div class="content"></div>
    </div>
    <script>
        function throttle(callback, delay) {
            let timer;
            return function () {
                let context = this;
                let args = arguments;
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(() => {
                    callback.apply(context, args);
                }, delay);
            }
        }
        let lastTime = Date.now();
        const throttle_scroll = throttle(() => {
            console.log('触发了滚动事件', (Date.now() - lastTime) / 1000);
        }, 1000);
        document.getElementById('container').addEventListener('scroll', throttle_scroll);
    </script>
</body>

</html>
```

### **5.5 正向代理与反向代理**

还有个经常用的例子是反向代理（Reverse Proxy），反向代理对应的是正向代理（Forward Proxy），他们的区别是：

+ 正向代理：一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得的内容，再返回给客户端。正向代理隐藏了真实的客户端，为客户端收发请求，使真实客户端对服务器不可见。
+ 反向代理：与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见。
反向代理一般在处理跨域请求的时候比较常用，属于服务端开发人员的日常操作了，另外在缓存服务器、负载均衡服务器等等场景也是使用到代理模式的思想。

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/26/11-53-27-61c42bd9e3dca494c803d492e99c8476-20221126115326-27b275.png)

### **5.6 代理跨域**

+ nginx代理跨域
+ `webpack-dev-server`代理跨域
+ 客户端代理跨域
    + 当前的服务启动在origin(3000端口)上，但是调用的接口在target(4000端口)上
    + postMessage方法可以安全地实现跨源通信
    + otherWindow:其他窗口的一个引用 message:将要发送到其他window的数据
    + message 将要发送到其他window的数据
    + targetOrigin通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

data 从其他window中传递过来的对象
origin 调用postMessage时消息发送方窗口的origin
source 对发送消息的窗口对象的引用

```js
window.addEventListener("message", receiveMessage, false);
```

## 6. **前端语言特性**

### **6.1 $.proxy**

+ 接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境。
+ jQuery.proxy( function, context ) function为执行的函数，content为函数的上下文this值会被设置成这个object对象

```js
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script>
   let btn = document.getElementById('btn');
   btn.addEventListener('click',function(){
       setTimeout($.proxy((function(){
           $(this).css('color','red');
       }),this),1000);
   });    
</script>    
```

### **6.2 proxy**

+ Proxy 用于修改某些操作的默认行为
+ Proxy 可以理解成，在目标对象之前架设一层`拦截`,外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
+ Proxy 这个词的原意是代理，用在这里表示由它来`代理`某些操作，可以译为`代理器`
+ [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
+ [defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)


```
var proxy = new Proxy(target, handler);
```

参数数中 target 是被代理对象，handler 用来设置代理行为。

使用 Proxy 来实现一下经纪人例子

```js
/* 明星 */
const SuperStar = {
  name: '当红小鲜肉',
  scheduleFlag: false, // 档期标识位，false-没空（默认值），true-有空
  playAdvertisement(ad) {
    console.log(ad)
  }
}

/* 经纪人 */
const ProxyAssistant = {
  name: '经纪人刘姐',
  scheduleTime(ad) {
    const schedule = new Proxy(SuperStar, { // 在这里监听 scheduleFlag 值的变化
      set(obj, prop, val) {
        if (prop !== 'scheduleFlag') return
        if (obj.scheduleFlag === false && val === true) { // 小鲜肉现在有空了
          obj.scheduleFlag = true
          obj.playAdvertisement(ad) // 安排上了
        }
      }
    })

    setTimeout(() => {
      console.log('小鲜肉有空了')
      schedule.scheduleFlag = true // 明星有空了
    }, 2000)
  },
  playAdvertisement(reward, ad) {
    if (reward > 1000000) { // 如果报酬超过 100w
      console.log('没问题，我们小鲜肉最喜欢拍广告了！')
      ProxyAssistant.scheduleTime(ad)
    } else
      console.log('最近档期排满了，没空！')
  }
}

ProxyAssistant.playAdvertisement(10000, '纯蒸酸牛奶，味道纯纯，尽享纯蒸')
// 输出： 没空，滚

ProxyAssistant.playAdvertisement(1000001, '纯蒸酸牛奶，味道纯纯，尽享纯蒸')
// 输出： 没问题，我们小鲜肉最喜欢拍广告了！
// 2秒后
// 输出： 小鲜肉有空了
// 输出： 纯蒸酸牛奶，味道纯纯，尽享纯蒸
```

## **7. 实际案例**

### **7.1 Vue2中data数据代理**

初始化时候放在data上面的变量通过this都能访问到

```js
  // 将数据、方法、计算属性等代理到组件实例上
  let vm = new Vue({
   data: {
     msg: 'hello',
     vue: 'vue'
    },
   computed:{
     helloVue(){
       return this.msg + ' ' + this.vue
     }
    },
   mounted(){
     console.log(this.helloVue)
    }
  })
```

源码分析：
```js
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  } 
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data
  // 初始化 _data，组件中 data 是函数，调用函数返回结果
  // 否则直接返回 data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  // 获取 data 中的所有属性
  const keys = Object.keys(data)
  // 获取 props / methods
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  // 判断 data 上的成员是否和  props/methods 重名
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  // 响应式处理
  observe(data, true /* asRootData */)
}
```

### **7.2 vue2和vue3数据响应式化**

现在的很多前端框架或者状态管理框架都使用 `Object.defineProperty` 和 `Proxy` 来实现数据的响应式化，比如 Vue、Mobx、AvalonJS 等，Vue 2.x 与 AvalonJS 使用前者，而 Vue 3.x 与 Mobx 5.x 使用后者。

Vue 2.x 中通过 `Object.defineProperty` 来劫持各个属性的 `setter/getter`，在数据变动时，通过发布-订阅模式发布消息给订阅者，触发相应的监听回调，从而实现数据的响应式化，也就是数据到视图的双向绑定。

为什么 Vue 2.x 到 3.x 要从 `Object.defineProperty` 改用 `Proxy` 呢，是因为前者的一些局限性，导致的以下缺陷：

+ 无法监听利用索引直接设置数组的一个项，例如：vm.items[indexOfItem] = newValue。
+ 无法监听数组的长度的修改，例如：vm.items.length = newLength。
+ 无法监听 ES6 的 Set、WeakSet、Map、WeakMap 的变化。
+ 无法监听 Class 类型的数据。
+ 无法监听对象属性的新加或者删除。

除此之外还有性能上的差异，基于这些原因，Vue 3.x 改用 Proxy 来实现数据监听了。当然缺点就是对 IE 用户的不友好，兼容性敏感的场景需要做一些取舍。

### **7.3 拦截器**

使用代理模式代理对象的访问的方式，一般又被称为拦截器。

拦截器的思想在实战中应用非常多，比如我们在项目中经常使用 Axios 的实例来进行 HTTP 的请求，使用拦截器 `interceptor` 可以提前对 request 请求和 response 返回进行一些预处理，比如：

+ request 请求头的设置，和 Cookie 信息的设置。
+ 权限信息的预处理，常见的比如验权操作或者 Token 验证。
+ 数据格式的格式化，比如对组件绑定的 Date 类型的数据在请求前进行一些格式约定好的序列化操作。
+ 空字段的格式预处理，根据后端进行一些过滤操作。
+ response 的一些通用报错处理，比如使用 Message 控件抛出错误。

除了 HTTP 相关的拦截器之外，还有 vue-router、react-router 路由跳转的拦截器，可以进行一些路由跳转的预处理等操作。以 vue-router 的路由全局前置守卫为例：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  console.log(' beforeRouteEnter ! ')
  next()
})
```

拦截器看起来似乎和装饰器模式很像，但是要注意装饰器模式和代理模式的区别，代理模式控制访问者对目标对象的访问，而装饰器模式只给目标对象添加功能，原有功能不变且可直接使用。Axios 拦截器是可以取消请求的，vue-router 路由拦截器也可以进行路由截停和重定向等等复杂操作，这些场景下，无疑是代理模式，因为这里的拦截器控制了对目标对象的访问，如果没有进行访问控制而只进行消息预处理和后处理，那么则可以当作是装饰器模式。

### **7.4 事件委托**

+ 事件捕获指的是从document到触发事件的那个节点，即自上而下的去触发事件
+ 事件冒泡是自下而上的去触发事件
+ 绑定事件方法的第三个参数，就是控制事件触发顺序是否为事件捕获。true为事件捕获；false为事件冒泡,默认false。

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/26/12-34-50-2a284781fde02e528b6ed05b0f817ae0-20221126123450-1207dd.png)

```html
<body>
    <ul id="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
<script>
  let list = document.querySelector('#list');
  list.addEventListener('click',event=>{
       alert(event.target.innerHTML);
  });     
</script>    
</body>
```

## **8. 设计原则验证**

在面向对象的编程中，代理模式的合理使用能够很好的体现下面两条设计原则:
  1. 单一职责原则: 面向对象设计中鼓励将不同的职责分布到细粒度的对象中，Proxy 在原对象的基础上进行了功能的衍生而又不影响原对象，符合松耦合高内聚的设计理念。
  2. 开放-封闭原则：代理可以随时从程序中去掉，而不用对其他部分的代码进行修改，在实际场景中，随着版本的迭代可能会有多种原因不再需要代理，那么就可以容易的将代理对象换成原对象的调用

## **9. 代理模式的优缺点**

### **优点**

+ 代理对象在访问者与目标对象之间可以起到中介和保护目标对象的作用。
+ 代理对象可以扩展目标对象的功能。
+ 代理模式能将访问者与目标对象分离，在一定程度上降低了系统的耦合度，如果我们希望适度扩展目标对象的一些功能，通过修改代理对象就可以了，符合开闭原则。

### **缺点**

+ 增加了系统的复杂度，要斟酌当前场景是不是真的需要引入代理模式（三十六线明星就别请经纪人了）。

## **10. 其他相关模式**

很多其他的模式，比如状态模式、策略模式、访问者模式其实也是使用了代理模式，包括在之前高阶函数处介绍的备忘模式，本质上也是一种缓存代理。

### **10.1 代理模式与适配器模式**

代理模式和适配器模式都为另一个对象提供间接性的访问，他们的区别：

适配器模式：主要用来解决接口之间不匹配的问题，通常是为所适配的对象提供一个不同的接口。
代理模式：提供访问目标对象的间接访问，以及对目标对象功能的扩展，一般提供和目标对象一样的接口。

### **10.2 代理模式与装饰器模式**

装饰器模式实现上和代理模式类似，都是在访问目标对象之前或者之后执行一些逻辑，但是目的和功能不同：

装饰器模式：目的是为了方便地给目标对象添加功能，也就是动态地添加功能。
代理模式：主要目的是控制其他访问者对目标对象的访问。

## **11. 总结**

对于代理模式 Proxy 的作用主要体现在三个方面:
  1. 拦截和监视外部对对象的访问
  2. 降低对象的复杂度
  3. 在复杂操作前对操作进行校验或对所需资源进行管理
