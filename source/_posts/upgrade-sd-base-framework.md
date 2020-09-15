---
layout: upgrade-base-framework
title: 项目基础框架升级小记
date: 2020-08-27 09:16:21
tags: [dva, umi, 项目升级]
category: [思考总结]
---

## 缘起

由于本项目由`umi2`搭建完成，出于后期配置方便、可维护性，提高代码编译速度的考虑，特此升级`umi`框架。

## 过程

### 升级步骤

#### 1. 明确升级范围

项目依赖应是**自下向上**升级，先升级底层运行框架，再升级业务中需要用到的依赖；修改范围由小到大，优先修改配置文件、然后再改view层代码，这样容易排查bug。

#### 2. 检查本地环境

框架对node、npm等会有最低版本要求，如umi需要node`>= 10.13.0`

#### 3. 执行升级步骤

1. 备份代码，如切新分支
2. 准备一份最新版本的空项目
3. 按照框架迁移指南步骤操作
4. 检查代码运行情况
5. 遇到报错时
   1. 优先看看空项目里是如何配置的，因为框架会把一些配置“透明化”。如`umi@3`把babel配置透明化
   2. Google一下遇到的报错
6. 完成

### 核心代码diff

#### 1. package.json

```diff
  {
    "private": true,
    "scripts": {
      "start": "umi dev",
      "build": "umi build",
-     "test": "umi test",
+     "test": "umi-test",
-     "lint": "eslint --ext .js src",
      "precommit": "lint-staged",
+     "prettier": "prettier --write '**/*.{js,jsx,tsx,ts,less,md,json}'",
+     "test:coverage": "umi-test --coverage"
      "analyz": "set NODE_ENV=production npm_config_report=true npm run start"
    },
    "dependencies": {
      "@ant-design/icons": "^4.0.2",
      "@ant-design/pro-layout": "^4.6.1",
      "@antv/data-set": "^0.10.2",
-     "@babel/core": "^7.6.4",
-     "@babel/preset-env": "^7.6.3",
-     "@sunflower-antd/form-table": "0.0.0-alpha.6",
-     "@testing-library/jest-dom": "^4.1.2",
-     "@testing-library/react-hooks": "^3.1.1",
      "@types/lodash.debounce": "^4.0.6",
      "@types/lodash.isequal": "^4.5.5",
-     "@uform/antd": "^0.3.11",
-     "@umijs/hooks": "^1.5.1-beta.0",
+     "@umijs/preset-react": "^1.6.2",
+     "@umijs/test": "^3.2.16",
      "ant-design-pro": "^2.3.2",
      "antd": "^3.19.3",
      "bizcharts": "^3.5.3-beta.0",
      "bizcharts-plugin-slider": "^2.1.1-beta.1",
      "classnames": "^2.2.6",
      "compression-webpack-plugin": "^3.1.0",
      "copy-to-clipboard": "^3.2.0",
-     "dva": "^2.5.0-beta.2",
+     "dva": "^2.6.0-beta.20",
      "echarts": "^4.7.0",
      "html2canvas": "^1.0.0-rc.5",
      "immer": "^3.2.0",
-     "lodash-decorators": "^6.0.1",
      "lodash.debounce": "^4.0.8",
      "lodash.isequal": "^4.5.0",
      "memoize-one": "^5.0.0",
-     "mockhs": "^1.1.9",
      "moment": "^2.24.0",
      "monaco-editor": "^0.19.2",
      "numeral": "^2.0.6",
      "particles.js": "^2.0.0",
      "path-to-regexp": "^3.0.0",
      "qrcode.react": "^1.0.0",
      "qs": "^6.6.0",
      "react": "^16.12.0",
      "react-custom-scrollbars": "^4.2.1",
      "react-document-title": "^2.0.3",
      "react-dom": "^16.12.0",
      "react-fittext": "^1.0.0",
      "react-if": "^3.4.3",
      "react-infinite-scroller": "^1.2.4",
      "react-monaco-editor": "^0.33.0",
      "react-particles-js": "^2.5.1",
-     "react-scripts": "^3.4.0",
-     "react-testing-library": "^8.0.1",
-     "reactparticles.js": "^1.1.6",
      "redux": "^4.0.1",
-     "redux-undo": "^0.6.1",
      "umi-request": "^1.0.0",
-     "webpack-bundle-analyzer": "^3.8.0"
    },
    "devDependencies": {
-     "@testing-library/react": "^9.3.0",
-     "@types/jest": "^24.0.21",
-     "@types/react": "^16.8.19",
-     "babel-eslint": "^9.0.0",
      "compression-webpack-plugin": "^3.1.0",
-     "enzyme": "^3.10.0",
-     "eslint": "^5.4.0",
-     "eslint-config-umi": "^1.4.0",
-     "eslint-plugin-flowtype": "^2.50.0",
-     "eslint-plugin-import": "^2.14.0",
-     "eslint-plugin-jsx-a11y": "^5.1.1",
-     "eslint-plugin-react": "^7.11.1",
-     "husky": "^0.14.3",
-     "jest": "^24.9.0",
-     "jest-puppeteer": "^4.2.0",
      "lint-staged": "^7.2.2",
      "monaco-editor-webpack-plugin": "^1.8.2",
+     "prettier": "^2.1.1",
-     "react-test-renderer": "^16.7.0",
-     "redux-saga-test-plan": "^4.0.0-beta.2",
-     "ts-loader": "^6.2.1",
-     "typescript": "^3.6.4",
-     "umi": "^2.4.2",
+     "umi": "^3.2.17",
-     "umi-plugin-react": "^1.8.4",
+     "webpack-bundle-analyzer": "^3.8.0",
+     "yorkie": "^2.0.0"  
    },
+   "gitHooks": {
+     "pre-commit": "lint-staged"
+   },
    "lint-staged": {
-     "*.{js,jsx}": [
-       "eslint",
-       "git add"
+     "*.{js,jsx,less,md,json}": [
+       "prettier --write"
+     ],
+     "*.ts?(x)": [
+       "prettier --parser=typescript --write"
      ]
    },
    "engines": {
-     "node": ">=8.0.0"
+     "node": ">=10.13.0"
    },
-    "jest": {
-        "transform": {
-          "^.+\\.tsx?$": "ts-jest",
-          "^.+\\.jsx?$": "babel-jest"
-        },
-        "transformIgnorePatterns": [
-          "<rootDir>/node_modules/(moment|core-js|babel-runtime|regenerator-runtime|lodash)/"
-     ],
-     "collectCoverage": false,
-     "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
-     "moduleFileExtensions": [
-       "ts",
-       "js"
-     ],
-     "globals": {
-       "ts-jest": {
-         "skipBabel": true
-       }
-     },
-     "testPathIgnorePatterns": [
-       "/(node_modules|lib|coverage|types)/"
-     ]
-   }
- }

```
#### 代码层
不再保留 umi/xxx 的接口，全部从 umi 中 import。由于调用router的地方太多，所以用ES6别名处理了。
```diff
- import Link from 'umi/link';
+ import { Link } from 'umi';

- import router from 'umi/router';
+ import { history as router } from 'umi';
```

## 结果

项目在有`src/.umi`缓存的情况下，构建速度由86秒减到53秒。

## 遇到的问题

1. 控制台waring ``devScripts.js:5836 Warning: Please use `require("history").createHashHistory` instead of `require("history/createHashHistory")`. Support for the latter will be removed in the next major release.`` 

   See：https://github.com/dvajs/dva/issues/2141

## 总结

由于umi相对成熟，升级的过程比较简单，碰到的问题也不多。

好多人问：其实编译也没有快多少，为什么要花这么大精力去升级呢？我是从以下角度考虑的：

1. [速度经济](https://baike.baidu.com/item/%E9%80%9F%E5%BA%A6%E7%BB%8F%E6%B5%8E)

   更快的构建速度意味着可以更快的发布。如果你的项目与电商挂钩，一旦遇到漏洞，更快发布意味着可以及时止损。

2. 升级框架的经验

   结果都是不值钱的，重要的是过程，是你解决问题所引发的思考。