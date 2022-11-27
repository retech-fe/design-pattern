---
sidebar_position: 1
---

# 序言

软件模式是将模式的一般概念应用于软件开发领域，即软件开发的 总体指导思路或参照样板。软件模式并非仅限于设计模式，还包括 架构模式、分析模式和过程模式等，实际上，在软件生存期的每一 个阶段都存在着一些被认同的模式。

本小册使用图形和代码结合的方式来解析设计模式；

每个模式都有相应的对象结构图，同时为了展示对象间的交互细节， 我会用到时序图来介绍其如何运行；（在状态模式中， 还会用到状态图，这种图的使用对于理解状态的转换非常直观）

为了让大家能读懂UML图，在最前面会有一篇文章来介绍UML图形符号；

在系统的学习设计模式之后，我们需要达到3个层次：

1. 能在白纸上画出所有的模式结构和时序图；
2. 能用代码实现；如果模式的代码都没有实现过，是用不出来的；即所谓，看得懂，不会用；
3. 灵活应用到工作中的项目中；
   
+ 前置知识
  + SOLID五大设计原则
    + 单一职责原则
    + [开放封闭原则](/docs/pre-knowledge/五大设计原则/design-rule-ocp)
    + [里式替换原则](/docs/pre-knowledge/五大设计原则/disign-rule-liskov)
    + 接口隔离原则
    + [依赖倒置原则](/docs/pre-knowledge/五大设计原则/design-rule-dip)
  + [迪米特法则](/docs/pre-knowledge/design-rule-lod)

+ 创建型模式
  + [简单工厂模式(Simple Factory Pattern)](/docs/creational-pattern/factory)
  + 工厂方法模式(Factory Method Pattern)
  + 抽象工厂模式(Abstract Factory)
  + 建造者模式
  + [单例模式](/docs/creational-pattern/singleton)
  + 原型模式
 
+ 结构型模式
  + [代理模式](/docs/structural-pattern/proxy)
  + 享元模式
  + 适配器模式
  + 装饰者模式
  + 外观模式
  + 组合模式
  + 桥接模式
  
+ 行为型模式
  + 观察者模式
  + 迭代器模式
  + [状态模式](/design-pattern/docs/behavioral-pattern/state)
  + [策略模式](/design-pattern/docs/behavioral-pattern/strategy)
  + 模板方法模式
  + 命令模式
  + 职责链模式
  + 中介者模式
  + 备忘录模式
  + 访问者模式
  + 解释器模式

