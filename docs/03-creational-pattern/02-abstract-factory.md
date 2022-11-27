---
title: 抽象工厂模式
description: 通过对类的工厂抽象使其业务用于对产品类簇的创建
last_update:
  date: 11/09/2022
  author: your name
---

## 1. 介绍

+ 抽象工厂模式可以向客户端提供一个接口，使客户端在不必指定产品的具体的情况下，创建多个**产品族**中的产品对象
+ 工厂方法模式针对的是**同一类或同等级产品**,而抽象工厂模式针对的是**多种类的产品**设计
+ 系统中有多个产品族，每个具体工厂负责创建同一族但属于不同产品等级(产品种类)的产品
+ 产品族是一组相关或相互依赖的对象
+ 系统一次只能消费某一族产品，即相同产品族的产品是一起被使用的
+ 当系统需要新增一个产品族时，只需要增加新的工厂类即可，无需修改源代码；但是如果需要产品族中增加一个新种类的产品时，则所有的工厂类都需要修改

## 2. 通俗的示例

还是以之前工厂模式中举的 KFC 的例子，之前我们说 KFC 是工厂，汉堡是产品，工厂封装做产品的工作，做好直接给购买者。

现在进行扩展，汉堡属于一种具体的产品，同样还有薯条、咖啡、牛奶等也都是产品。无论你点哪个产品，他们都具有同样的属性：油炸的都可以吃，冲调的都可以喝。对于工厂也一样，KFC 可以做汉堡、薯条、咖啡、牛奶，麦当劳和华莱士也可以，那么这些工厂就具有同样的功能结构。

顾客通过柜台获取想拿的产品。只要我们点的是冲调产品，即使还没有被做出来，我们就知道是可以喝的。

## 3. 结构图和具体角色

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/27/18-59-59-5e4538ebf62b1019224cbda99bf6d459-20221127185958-6d38c3.png)

通过工厂可以获得实现了不同抽象类的产品，这些产品可以根据实现的抽象类被区分为**类簇**。

主要有下面几个概念：

+ 抽象工厂: 提供了创建产品的接口,包含多个创建产品的方法,即包含多个类似创建产品的方法
+ 具体工厂: 实现抽象工厂定义的接口,完成某个具体产品的创建
+ 抽象产品: 抽象产品定义,一般有多少抽象产品,抽象工厂中就包含多少个创建产品的方法
+ 具体产品: 抽象产品的实现类

## 4. 实现

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/27/19-06-43-2ff4819ce5dee50bcb555b3a698f1256-20221127190642-671a7a.png)

![](https://raw.githubusercontent.com/retech-fe/image-hosting/main/img/2022/11/27/19-07-29-265648087d9a579f611e1f7d08ae1f2c-20221127190728-b001fe.png)

```js
export { };
abstract class AmericanoCoffee { }
abstract class LatteCoffee { }
abstract class CappuccinoCoffee { }

class StarbucksAmericanoCoffee extends AmericanoCoffee { }
class StarbucksLatteCoffee extends LatteCoffee { }
class StarbucksCappuccinoCoffee extends CappuccinoCoffee { }

class LuckinAmericanoCoffee extends AmericanoCoffee { }
class LuckinLatteCoffee extends LatteCoffee { }
class LuckinCappuccinoCoffee extends CappuccinoCoffee { }

// 抽象咖啡工程
abstract class CafeFactory {
    // 产品簇：美式、拿铁、卡布奇诺
    abstract createAmericanoCoffee(): AmericanoCoffee;
    abstract createLatteCoffee(): LatteCoffee;
    abstract createCappuccinoCoffee(): CappuccinoCoffee;
}

// 星巴克咖啡店
class StarbucksCafeFactory extends CafeFactory {
    createAmericanoCoffee() {
        return new StarbucksAmericanoCoffee();
    }
    createLatteCoffee() {
        return new StarbucksLatteCoffee();
    }
    createCappuccinoCoffee() {
        return new StarbucksCappuccinoCoffee();
    }
}
// 瑞幸咖啡店
class LuckinCafeFactory extends CafeFactory {
    createAmericanoCoffee() {
        return new LuckinAmericanoCoffee();
    }
    createLatteCoffee() {
        return new LuckinLatteCoffee();
    }
    createCappuccinoCoffee() {
        return new LuckinCappuccinoCoffee();
    }
}

let starbucksCafeFactory = new StarbucksCafeFactory();
console.log(starbucksCafeFactory.createAmericanoCoffee());
console.log(starbucksCafeFactory.createCappuccinoCoffee());
console.log(starbucksCafeFactory.createLatteCoffee());

let luckinCafeFactory = new LuckinCafeFactory();
console.log(luckinCafeFactory.createAmericanoCoffee());
console.log(luckinCafeFactory.createCappuccinoCoffee());
console.log(luckinCafeFactory.createLatteCoffee());
```

如果希望增加第三个类簇的产品，除了需要改一下对应工厂类之外，还需要增加一个抽象产品类，并在抽象产品类基础上扩展新的产品。

我们在实际使用的时候不一定需要每个工厂都继承抽象工厂类，比如只有一个工厂的话我们可以直接使用工厂模式，在实战中灵活使用。

## 5. 设计原则验证

不符合开放封闭原则，因为扩展新类簇时需要同时创建新的抽象类。


## 6. 优缺点

### 优点

抽象产品类将产品的结构抽象出来，访问者不需要知道产品的具体实现，只需要面向产品的结构编程即可，从产品的具体实现中解耦。

### 缺点

扩展新类簇的产品类比较困难，因为需要创建新的抽象产品类，并且还要修改工厂类，违反开闭原则。
带来了系统复杂度，增加了新的类，和新的继承关系。

## 7. 其他相关模式

工厂模式和抽象工厂模式的区别：

+ 工厂模式主要关注单独的产品实例的创建。
+ 抽象工厂模式主要关注产品类簇实例的创建，如果产品类簇只有一个产品，那么这时的抽象工厂模式就可以退化为工厂模式。