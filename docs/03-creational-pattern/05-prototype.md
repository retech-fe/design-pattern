---
title: 原型模式
sidebar_label: 原型模式(前端不常用)
description: clone自己生成一个新对象
last_update:
  date: 11/09/2022
  author: your name
---

# 原型模式

原型模式（Prototype Pattern）不是指的 JS 的原型，它是 clone 自己，生成一个新对象的操作。因为 new 一个新对象的时候开销会比较大，或者由于其他原因不合适，所以采用这种方式创建一个一模一样的对象。