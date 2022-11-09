import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/design-pattern/__docusaurus/debug',
    component: ComponentCreator('/design-pattern/__docusaurus/debug', '63f'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/config',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/config', '580'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/content',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/content', '530'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/globalData',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/globalData', '31d'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/metadata',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/metadata', '1c6'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/registry',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/registry', 'bf0'),
    exact: true
  },
  {
    path: '/design-pattern/__docusaurus/debug/routes',
    component: ComponentCreator('/design-pattern/__docusaurus/debug/routes', '0ad'),
    exact: true
  },
  {
    path: '/design-pattern/markdown-page',
    component: ComponentCreator('/design-pattern/markdown-page', 'd65'),
    exact: true
  },
  {
    path: '/design-pattern/docs',
    component: ComponentCreator('/design-pattern/docs', '606'),
    routes: [
      {
        path: '/design-pattern/docs/behavioral-pattern/zeren',
        component: ComponentCreator('/design-pattern/docs/behavioral-pattern/zeren', 'a8e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/创建型模式',
        component: ComponentCreator('/design-pattern/docs/category/创建型模式', 'a13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/结构型模式',
        component: ComponentCreator('/design-pattern/docs/category/结构型模式', '80d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/前置知识',
        component: ComponentCreator('/design-pattern/docs/category/前置知识', '5ec'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/前置知识1',
        component: ComponentCreator('/design-pattern/docs/category/前置知识1', 'cd1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/行为型模式',
        component: ComponentCreator('/design-pattern/docs/category/行为型模式', 'efa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/category/solid五大设计原则',
        component: ComponentCreator('/design-pattern/docs/category/solid五大设计原则', '716'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/creational-pattern/manage-docs-versions',
        component: ComponentCreator('/design-pattern/docs/creational-pattern/manage-docs-versions', '83a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/creational-pattern/translate-your-site',
        component: ComponentCreator('/design-pattern/docs/creational-pattern/translate-your-site', '3f1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/intro',
        component: ComponentCreator('/design-pattern/docs/intro', '97b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-dip',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-dip', '5e8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-isp',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-isp', 'e5f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-ocp',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-ocp', 'ec4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-srp',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/五大设计原则/design-rule-srp', '882'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/五大设计原则/disign-rule-liskov',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/五大设计原则/disign-rule-liskov', '9fc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/design-rule-lod',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/design-rule-lod', '153'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/pre-knowledge/test/',
        component: ComponentCreator('/design-pattern/docs/pre-knowledge/test/', '94c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/design-pattern/docs/structural-pattern/zeren',
        component: ComponentCreator('/design-pattern/docs/structural-pattern/zeren', '8fc'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/design-pattern/',
    component: ComponentCreator('/design-pattern/', 'aab'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
