# 贡献指南

本站点基于[docusaurus](https://docusaurus.io/)搭建

## 分支

下载`repo`后，切换到`main`分支，把相应的文章做好编号后放到相应的目录下；目录可以嵌套，只要做好序号即可，建议用01-xxx来进行目录的`position`排序

## 文档顶部元数据

```js
---
title: Docs Markdown Features
sidebar_label: Markdown
sidebar_position: 3
description: How do I find you when I cannot solve this problem
last_update:
  date: 11/11/2022
  author: custom author name
---

# Markdown Features

My Document Markdown content
```

[完整配置属性](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter)

## 自动构建

提交`main`分支后会自动触发[`github action`](https://github.com/retech-fe/design-pattern/actions)；如果构建失败请查看脚本中的错误信息进行修改