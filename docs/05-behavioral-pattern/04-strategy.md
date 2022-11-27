---
title: 策略模式
description: 定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换
last_update:
  date: 11/09/2022
  author: 高红翔
---

## 1. 定义

策略模式 （Strategy Pattern）又称政策模式，其定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。封装的策略算法一般是独立的，策略模式根据输入来调整采用哪个算法。

+ 关键是策略的实现和使用分离
+ 避免大量的if else 或 swith case


## 2. 生活中的例子

### 例子

1. 现在电子产品种类繁多，尺寸多种多样，有时候你会忍不住想拆开看看里面啥样（想想小时候拆的玩具车还有遥控器），但是螺丝规格很多，螺丝刀尺寸也不少，如果每碰到一种规格就买一个螺丝刀，家里就得堆满螺丝刀了。所以现在人们都用多功能的螺丝刀套装，螺丝刀把只需要一个，碰到不同规格的螺丝只要换螺丝刀头就行了，很方便，体积也变小很多。

2. 一辆车的轮胎有很多规格，在泥泞路段开的多的时候可以用泥地胎，在雪地开得多可以用雪地胎，高速公路上开的多的时候使用高性能轮胎，针对不同使用场景更换不同的轮胎即可，不需更换整个车。

3. 例如电商网站在双十一举办活动，有的商品满 100 减 30，有的商品满 200 减 80，有的商品直接 8 折出售，不同商品的优惠策略不一样。

### 特点

- 螺丝刀头/轮胎（策略）之间相互独立，但又可以相互替换；
- 螺丝刀/车（封装上下文）可以根据需要的不同选用不同的策略；

## 3. 通用实现

使用策略模式来写的话，上面提到的折扣计算方式作为策略，具体折扣的计算过程作为封装上下文，主要有下面几个概念：

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/27/09-03-07-6fc6c7acb5cdc02c35e590df4ab84f20-20221127090307-8278c6.png)

+ Context：封装上下文，根据需要调用需要的策略，屏蔽外界对策略的直接调用，只对外提供一个接口，根据需要调用对应的策略。
+ Strategy：策略，含有具体的算法，其方法的外观相同，因此可以互相代替。
+ StrategyMap：所有策略的合集，供封装上下文调用。

代码如下：

```js
// 存储所有策略
const StrategyMap = {}

// 封装上下文
function context(type, ...rest) {
  return StrategyMap[type] && StrategyMap[type](...rest)
}

// 增加策略
StrategyMap.minus100_30 = function(price) {
  return price - Math.floor(price / 100) * 30
}
// 调用策略
context('minus100_30', 270)	// 输出: 210
```


## 4. 案例

场景是这样的，某个电商网站希望举办一个活动，通过打折促销来销售库存物品，普通不打折，普通会员打9折，vip会员打8折

### 4.1 类图

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/10/27/09-54-25-e297aa4b1e21a484e2f66c6e8cf081c7-20221027095425-e080b2.png)

### 4.2 代码

#### 4.2.1 大多数人的写法

``` ts
type TCustomerType = 'normal' | 'member' | 'vip'
class Customer {
  constructor(private type: TCustomerType) {
    this.type = type
  }
  public pay(amount: number) {
    if (this.type == "member") {
      return amount * 0.9
    } else if (this.type == "vip") {
      return amount * 0.8
    } else {
      return amount
    }
  }
}
let c = new Customer("normal")
console.log(c.pay(100))
let c2 = new Customer("member")
console.log(c2.pay(100))
let c3 = new Customer("vip")
console.log(c2.pay(100))

```

缺点

+ pay 函数随着会员类型和折扣方式的增多，if-else 判断语句会变得越来越臃肿。
+ 如果增加了新的折扣类型或者折扣类型的算法有所改变，那么需要更改 pay 函数的实现，这是违反开放-封闭原则的。
+ 可复用性差，如果在其他的地方也有类似这样的算法，但规则不一样，上述代码不能复用。

#### 利用策略模式的优化

```ts
class Customer {
  constructor(public kind: Kind) {
  }
  public cost(amount: number) {
    return this.kind.discount(amount)
  }
}
abstract class Kind {
  abstract discount(amounr: number): number
}
class Normal extends Kind {
  discount(amount: number) {
    return amount
  }
}
class Member extends Kind {
  discount(amount: number) {
    return amount * 0.9
  }
}
class VIP extends Kind {
  discount(amount: number) {
    return amount * 0.8
  }
}
let c1 = new Customer(new Normal())
console.log(c1.cost(100))
c1.kind = new Member()
console.log(c1.cost(100))
c1.kind = new VIP()
console.log(c1.cost(100))

```

在前端也把算法封装在策略对象中，指定算法调用即可

```ts
class Customer {
  constructor() {
    this.kinds = {
      normal: function (price) {
        return price
      },
      member: function (price) {
        return price * 0.9
      },
      vip: function (price) {
        return price * 0.8
      },
    }
  }
  cost(kind, amount) {
    return this.kinds[kind](amount)
  }
}
let c = new Customer()
console.log(c.cost("normal", 100))
console.log(c.cost("member", 100))
console.log(c.cost("vip", 100))
```

## 5. 应用场景

那么应该在什么场景下使用策略模式呢：

+ 多个算法只在**行为上稍有不同**的场景，这时可以使用策略模式来动态选择算法。
+ 算法需要**自由切换**的场景。
+ 有时需要**多重条件判断**，那么可以使用策略模式来规避多重条件判断的情况。


### 5.1 表单校验 

#### 5.1.1 原生表单验证

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <form id="userForm">
    用户名 <input type="text" name="username"><br />
    密码 <input type="text" name="password"><br />
    手机号 <input type="text" name="mobile"><br />
    邮箱 <input type="text" name="email"><br />
    <input type="submit" value="提交">
  </form>
  <script>
    let form = document.getElementById('userForm');
    let validator = (function () {
      //这是一个规则的数组
      let rules = {
        notEmpty(val, msg) {
          if (val === '') {
            return msg;
          }
        },
        minLength(val, min, msg) {
          if (val === '' || val.length < min) {
            return msg;
          }
        },
        maxLength(val, max, msg) {
          if (val === '' || val.length > max) {
            return msg;
          }
        },
        isMobile(val, msg) {
          if (!/1\d{10}/.test(val)) {
            return msg;
          }
        }
      }
      function addRule(name, rule) {
        rules[name] = rule;
      }
      let checks = [];
      //增加校验的项目
      function add(element, rule) {
        checks.push(function () {
          let val = element.value;
          let name = rule.shift();
          rule.unshift(val);//['value','用户名不能为空']
          return rules[name] && rules[name].apply(element, rule);
        });
      }
      function start() {
        for (let i = 0; i < checks.length; i++) {
          let check = checks[i];
          let msg = check();
          if (msg) {
            return msg;
          }
        }
      }
      return {
        addRule,
        add,
        start
      }
    })();
    
    validator.addRule('isEmail', function (val, msg) {
      if (!/.*@.*/.test(val)) {
        return msg;
      }
    });
    form.onsubmit = function () {
      validator.add(form.username, ['notEmpty', '用户名不能为空']);
      validator.add(form.password, ['minLength', 6, '密码长度不能少于6位']);
      validator.add(form.password, ['maxLength', 8, '密码长度不能大于8位']);
      validator.add(form.mobile, ['isMobile', '必须输入合法的手机号']);
      validator.add(form.email, ['isEmail', '必须输入合法邮箱']);
      let msg = validator.start();
      if (msg) {
        alert(msg);
        return false;
      }
      return true;
    }
  </script>

</body>

</html>

```

#### 5.1.2 基于ElementUI的Form表单验证

ElementUI 的 Form 表单 具有表单验证功能，用来校验用户输入的表单内容。实际需求中表单验证项一般会比较复杂，所以需要给每个表单项增加 validator 自定义校验方法。

我们可以像官网示例一样把表单验证都写在组件的状态 data 函数中，但是这样就不好复用使用频率比较高的表单验证方法了，这时我们可以结合策略模式和函数柯里化的知识来重构一下。首先我们在项目的工具模块（一般是 utils 文件夹）实现通用的表单验证方法：

```js
// src/utils/validates.js

/* 姓名校验 由2-10位汉字组成 */
export function validateUsername(str) {
  const reg = /^[\u4e00-\u9fa5]{2,10}$/
  return reg.test(str)
}

/* 手机号校验 由以1开头的11位数字组成  */
export function validateMobile(str) {
  const reg = /^1\d{10}$/
  return reg.test(str)
}

/* 邮箱校验 */
export function validateEmail(str) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}
```

然后在 utils/index.js 中增加一个柯里化方法，用来生成表单验证函数：

```js
// src/utils/index.js

import * as Validates from './validates.js'

/* 生成表格自定义校验函数 */
export const formValidateGene = (key, msg) => (rule, value, cb) => {
  if (Validates[key](value)) {
    cb()
  } else {
    cb(new Error(msg))
  }
}
```

上面的 formValidateGene 函数接受两个参数，第一个是验证规则，也就是 src/utils/validates.js 文件中提取出来的通用验证规则的方法名，第二个参数是报错的话表单验证的提示信息。


```js
<template>
  <el-form ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm"
           :rules="rules"
           :model="ruleForm">
        
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
        
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="ruleForm.mobile"></el-input>
    </el-form-item>
        
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
  </el-form>
</template>

<script type='text/javascript'>
import * as Utils from '../utils'
    
export default {
  name: 'ElTableDemo',
  data() {
    return {
      ruleForm: { pass: '', checkPass: '', age: '' },
      rules: {
        username: [{
          validator: Utils.formValidateGene('validateUsername', '姓名由2-10位汉字组成'),
          trigger: 'blur'
        }],
        mobile: [{
          validator: Utils.formValidateGene('validateMobile', '手机号由以1开头的11位数字组成'),
          trigger: 'blur'
        }],
        email: [{
          validator: Utils.formValidateGene('validateEmail', '不是正确的邮箱格式'),
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>
```

可以看见在使用的时候非常方便，把表单验证方法提取出来作为策略，使用柯里化方法动态选择表单验证方法，从而对策略灵活运用，大大加快开发效率。

### 5.2 表格 formatter

这里举一个 Vue + ElementUI 项目中用到的例子。

Element 的表格控件的 Column 接受一个 formatter 参数，用来格式化内容，其类型为函数，并且还可以接受几个特定参数，像这样：Function(row, column, cellValue, index)。

以文件的大小转化为例，后端经常会直接传 bit 单位的文件大小，那么前端需要根据后端的数据，根据需求转化为自己需要的单位的文件大小，比如 KB/MB。

首先实现文件大小的计算算法：

```js
export const StrategyMap = {
  /* Strategy 1: 将文件大小（bit）转化为 KB */
  bitToKB: val => {
    const num = Number(val)
    return isNaN(num) ? val : (num / 1024).toFixed(0) + 'KB'
  },
  /* Strategy 2: 将文件大小（bit）转化为 MB */
  bitToMB: val => {
    const num = Number(val)
    return isNaN(num) ? val : (num / 1024 / 1024).toFixed(1) + 'MB'
  }
}

/* Context: 生成el表单 formatter */
const strategyContext = function(type, rowKey){
  return function(row, column, cellValue, index){
    return StrategyMap[type](row[rowKey])
  }
}

export default strategyContext
```

那么在组件中我们可以直接：

```js
<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期"></el-table-column>
    <el-table-column prop="name" label="文件名"></el-table-column>
    <!-- 直接调用 strategyContext -->
    <el-table-column prop="sizeKb" label="文件大小(KB)"
                     :formatter='strategyContext("bitToKB", "sizeKb")'>
    </el-table-column>
    <el-table-column prop="sizeMb" label="附件大小(MB)"
                     :formatter='strategyContext("bitToMB", "sizeMb")'>
    </el-table-column>
  </el-table>
</template>

<script type='text/javascript'>
import strategyContext from './strategyContext.js'
    
export default {
  name: 'ElTableDemo',
  data() {
    return {
      strategyContext,
      tableData: [
        { date: '2022-03-27', name: '文件1', sizeKb: 1234, sizeMb: 1234426 },
        { date: '2022-03-29', name: '文件2', sizeKb: 4213, sizeMb: 8636152 }
      ]
    }
  }
}
</script>

<style scoped></style>
```

## 6. 设计原则验证

+ 不同策略，分开处理，而不是混合在一起
+ 符合开放封闭原则
## 7. 优缺点

策略模式将算法的实现和使用拆分，这个特点带来了很多优点：

- 策略之间相互独立，但策略可以自由切换，这个策略模式的特点给策略模式带来很多灵活性，也提高了策略的复用率；
- 如果不采用策略模式，那么在选策略时一般会采用多重的条件判断，采用策略模式可以避免多重条件判断，增加可维护性；
- 可扩展性好，策略可以很方便的进行扩展；

策略模式的缺点：

- 策略相互独立，因此一些复杂的算法逻辑无法共享，造成一些资源浪费；
- 如果用户想采用什么策略，必须了解策略的实现，因此所有策略都需向外暴露，这是违背迪米特法则/最少知识原则的，也增加了用户对策略对象的使用成本。

## 8. 其他相关模式的对比

### 8.1 状态模式和策略模式异同

#### 相同点

- 策略模式和状态模式都有上下文，有策略或者状态类，上下文把这些请求委托给这些类来执行

#### 不同点

- 状态模式： 重在强调对象内部状态的变化改变对象的行为，状态类之间是平行的，无法相互替换；
- 策略模式： 策略的选择由外部条件决定，策略可以动态的切换，策略之间是平等的，可以相互替换；
- 状态模式的状态类是平行的，意思是各个状态类封装的状态和对应的行为是相互独立、没有关联的，封装的业务逻辑可能差别很大毫无关联，相互之间不可替换。但是策略模式中的策略是平等的，是同一行为的不同描述或者实现，在同一个行为发生的时候，可以根据外部条件挑选任意一个实现来进行处理。

### 8.2 策略模式和模板方法模式

策略模式和模板方法模式的作用比较类似，但是结构和实现方式有点不一样。

- 策略模式 让我们在程序运行的时候动态地指定要使用的算法。
- 模板方法模式 是在子类定义的时候就已经确定了使用的算法。