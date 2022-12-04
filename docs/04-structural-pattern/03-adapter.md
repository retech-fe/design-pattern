---
title: 适配器模式
description: 将一个类（对象）的接口（方法、属性）转化为用户需要的另一个接口，解决类（对象）之间接口不兼容的问题
last_update:
  date: 12/04/2022
  author: pengfei.zuo
---

## 1. 介绍

### 1.1 定义

适配器模式（Adapter Pattern）又称包装器模式，将一个类（对象）的接口（方法、属性）转化为用户需要的另一个接口，解决类（对象）之间接口不兼容的问题。

+ 旧的接口和使用者不兼容
+ 中间加一个适配器转换接口

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/04/19-09-15-0b4ed536394c5a94ae26e90f7ffec4a4-20221204190915-53af5a.png)

### 1.2 主要功能

主要功能是进行**转换**匹配，目的是复用已有的功能，而不是来实现新的接口。也就是说，访问者需要的功能应该是已经实现好了的，不需要适配器模式来实现，适配器模式主要是负责把不兼容的接口转换成访问者期望的格式而已。

## 2. 生活中的例子

+ 电源接口的转接头、Type-C 转 HDMI 等视频转接头。
+ 同声传译，充当两国友人互相交流的中间人

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/04/19-27-35-c6ffbdb3f5feb077e72f771dec87bf95-20221204192735-11968c.png)

在类似场景中，这些例子有以下特点：

+ 旧有接口格式已经不满足现在的需要。
+ 通过增加适配器来更好地使用旧有接口。
  
## 3. 通用实现

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/12/04/19-28-29-a615944b2641737dde4de786de2acf0d-20221204192829-f7c969.png)

### 3.1 角色

+ Target：目标抽象类
+ Adapter：适配器类
+ Adaptee：适配者类
+ Client：客户类


### 3.2 代码

```ts
class Socket {
    output() {
        return '输出220V';
    }
}

abstract class Power {
    abstract charge(): string;
}
class PowerAdapter extends Power {
    constructor(public socket: Socket) {
        super();
    }
    //转换后的接口和转换前不一样
    charge() {
        return this.socket.output() + ' 经过转换 输出24V';
    }
}
let powerAdapter = new PowerAdapter(new Socket());
console.log(powerAdapter.charge());
```

## 4. 场景

当你想用已有对象的功能，却想修改它的接口时，一般可以考虑一下是不是可以应用适配器模式。

+ 如果你想要使用一个已经存在的对象，但是它的接口不满足需求，那么可以使用适配器模式，把已有的实现转换成你需要的接口。
+ 如果你想创建一个可以复用的对象，而且确定需要和一些不兼容的对象一起工作，这种情况可以使用适配器模式，然后需要什么就适配什么。

### 4.1 axios

+ [Axios](https://github.com/axios/axios/blob/main/lib/core/Axios.js#L6)
+ [dispatchRequest](https://github.com/axios/axios/blob/main/lib/core/dispatchRequest.js#L50-L79)

axios源码中采用了`process`和`XMLHttpRequest`。 通过宿主环境的特有对象识别当前环境,适配出不同环境下如：客户端浏览器和nodejs的请求方式。

+ [defaults](https://github.com/axios/axios/blob/main/lib/defaults/index.js#L22)

/adapters 目录中包含如下这些文件

``` shell
├─adapters
│   http.js
│   README.md
│   xhr.js
```

+ [xhr](https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/xhr.js)
+ [http](https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/http.js)


适配器的入参都是config,返回的都是promise

```js
//let axios = require('axios');
let url = require('url');

function axios(config: any): any {
    let adaptor = getDefaultAdapter();
    return adaptor(config);
}

axios({
    method: 'GET',
    url: 'http://localhost:8080/api/user?id=1'
}).then(function (response: any) {
    console.log(response);
}, function (error: any) {
    console.log(error);
})

function xhr(config: any) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(config.method, config.url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    resolve(request.response);
                } else {
                    reject('请求失败');
                }
            }
        }
    })
}

function http(config: any) {
    let http = require('http');
    let urlObject = url.parse(config.url);
    return new Promise(function (resolve, reject) {
        const options = {
            hostname: urlObject.hostname,
            port: urlObject.port,
            path: urlObject.pathname,
            method: config.method
        };
        var req = http.request(options, function (res: any) {
            let chunks: any[] = [];
            res.on('data', (chunk: any) => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                resolve(Buffer.concat(chunks).toString());
            });
        });
        req.on('error', (err: any) => {
            reject(err);
        });
        req.end();
    })
}
function getDefaultAdapter(): any {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        adapter = xhr;
    } else if (typeof process !== 'undefined') {
        adapter = http;
    }
    return adapter;
}
```

server.js

```js
let express = require('express');
let app = express();
app.get('/api/user', (req, res) => {
    res.json({ id: req.query.id, name: 'zhufeng' });
});
app.listen(8080);
```

### 4.2 jQuery.ajax 适配 Axios

有的使用 jQuery 的老项目使用 $.ajax 来发送请求，现在的新项目一般使用 Axios，那么现在有个老项目的代码中全是 $.ajax，如果逐个修改，无疑工作量巨大而且很容易引发各种乱七八糟 bug，这时可以采用适配器模式来将老的使用形式适配到新的技术栈上：

```js
/* 适配器 */
function ajax2AxiosAdapter(ajaxOptions) {
  return axios({
    url: ajaxOptions.url,
    method: ajaxOptions.type,
    responseType: ajaxOptions.dataType,
    data: ajaxOptions.data
  })
    .then(ajaxOptions.success)
    .catch(ajaxOptions.error)
}

/* 经过适配器包装 */
$.ajax = function(options) {
  return ajax2AxiosAdapter(options);
}

// 测试：用 jQuery 的方式发送一个 Ajax 请求
$.ajax({
  url: '/demo-url',
  type: 'POST',
  dataType: 'json',
  data: {
    name: '张三',
    id: '13'
  },
  success: function(data) {
    console.log('请求成功！')
  },
  error: function(err) {
    console.error('请求失败！')
  }
})
```

可以看到老的代码表现形式依然不变，但是真正发送请求是通过新的发送方式来进行的。当然你也可以把 Axios 的请求适配到 $.ajax 上，就看你如何使用适配器了。


### 4.3 promisify

+ 作用：将callback形式转换为Promise对象
+ Node中异步回调中有个约定：Error first,回调函数中的第一个参数一定是Error对象，其余参数才是正确的数据。

```js
let fs = require('fs');
var Bluebird = require("bluebird");
let readFile = Bluebird.promisify(fs.readFile);

(async function () {
    let content = await readFile('./1.txt', 'utf8');
    console.log(content);
})()
```

```js
function promisify(readFile: any) {
    return function (filename: any, encoding: any) {
        return new Promise(function (resolve, reject) {
            readFile(filename, encoding, function (err: any, data: any) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            })
        });
    }
}
```
### 4.4 业务数据适配

在实际项目中，我们经常会遇到树形数据结构和表形数据结构的转换，比如全国省市区结构、公司组织结构、军队编制结构等等。以公司组织结构为例，在历史代码中，后端给了公司组织结构的树形数据，在以后的业务迭代中，会增加一些要求非树形结构的场景。比如增加了将组织维护起来的功能，因此就需要在新增组织的时候选择上级组织，在某个下拉菜单中选择这个新增组织的上级菜单。或者增加了将人员归属到某一级组织的需求，需要在某个下拉菜单中选择任一级组织。

在这些业务场景中，都需要将树形结构平铺开，但是我们又不能直接将旧有的树形结构状态进行修改，因为在项目别的地方已经使用了老的树形结构状态，这时我们可以引入适配器来将老的数据结构进行适配：

```js
/* 原来的树形结构 */
const oldTreeData = [
  {
    name: '总部',
    place: '一楼',
    children: [
      { name: '财务部', place: '二楼' },
      { name: '生产部', place: '三楼' },
      {
        name: '开发部', place: '三楼', children: [
          {
            name: '软件部', place: '四楼', children: [
              { name: '后端部', place: '五楼' },
              { name: '前端部', place: '七楼' },
              { name: '技术支持部', place: '六楼' }]
          }, {
            name: '硬件部', place: '四楼', children: [
              { name: 'DSP部', place: '八楼' },
              { name: 'ARM部', place: '二楼' },
              { name: '调试部', place: '三楼' }]
          }]
      }
    ]
  }
]

/* 树形结构平铺 */
function treeDataAdapter(treeData, lastArrayData = []) {
  treeData.forEach(item => {
    if (item.children) {
      treeDataAdapter(item.children, lastArrayData)
    }
    const { name, place } = item
    lastArrayData.push({ name, place })
  })
  return lastArrayData
}

// 测试：返回平铺的组织结构
treeDataAdapter(oldTreeData)
```
增加适配器后，就可以将原先状态的树形结构转化为所需的结构，而并不改动原先的数据，也不对原来使用旧数据结构的代码有所影响。

### 4.5 Vue 计算属性

Vue 中的计算属性也是一个适配器模式的实例，以官网的例子为例，我们可以一起来理解一下：

```vue
<template>
  <div id="example">
    <p>Original message: "{{ message }}"</p>  <!-- Hello -->
    <p>Computed reversed message: "{{ reversedMessage }}"</p>  <!-- olleH -->
  </div>
</template>

<script type='text/javascript'>
  export default {
    name: 'demo',
    data() {
      return {
        message: 'Hello'
      }
    },
    computed: {
      reversedMessage: function() {
        return this.message.split('').reverse().join('')
      }
    }
  }
</script>
```

旧有 data 中的数据不满足当前的要求，通过计算属性的规则来适配成我们需要的格式，对原有数据并没有改变，只改变了原有数据的表现形式。

### 4.6 Sequelize 

基于`promise`的`Node.js ORM`工具

[Sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master)

`Sequelize`支持MySQL、MariaDB、SQLite等数据库方言的适配

[方言](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/other-topics/dialect-specific-things.md)

```js
//cnpm i sequelize sqlite3 -S
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model { }
User.init({
    username: DataTypes.STRING
}, { sequelize, modelName: 'user' });

sequelize.sync()
    .then(() => User.create({
        username: 'zhufeng'
    }))
    .then(result => {
        console.log(result.toJSON());
    });
```

## 5. 设计原则验证

+ 将旧接口和使用者进行分离
+ 符合开放封闭原则


## 6. 优缺点

### 6.1 优点

+ 已有的功能如果只是接口不兼容，使用适配器适配已有功能，可以使原有逻辑得到更好的复用，有助于避免大规模改写现有代码。
+ 可扩展性良好，在实现适配器功能的时候，可以调用自己开发的功能，从而方便地扩展系统的功能。
+ 灵活性好，因为适配器并没有对原有对象的功能有所影响，如果不想使用适配器了，那么直接删掉即可，不会对使用原有对象的代码有影响。

### 6.2 缺点

会让系统变得零乱，明明调用 A，却被适配到了 B，如果系统中这样的情况很多，那么对可阅读性不太友好。如果没必要使用适配器模式的话，可以考虑重构，如果使用的话，可以考虑尽量把文档完善。


## 7. 其他相关模式

### 7.1 适配器模式与代理模式

+ 适配器模式：提供一个不一样的接口，由于原来的接口格式不能用了，提供新的接口以满足新场景下的需求。
+ 代理模式：提供一模一样的接口，由于不能直接访问目标对象，找个代理来帮忙访问，使用者可以就像访问目标对象一样来访问代理对象。

### 7.2 适配器模式、装饰者模式与代理模式

+ 适配器模式：功能不变，只转换了原有接口访问格式。
+ 装饰者模式：扩展功能，原有功能不变且可直接使用。
+ 代理模式：原有功能不变，但一般是经过限制访问的。