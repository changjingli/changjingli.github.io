---
title: ES2021 新特性！
date: 2021-06-29 09:51:48
tags: [ES2021]
category: [技术研究]
---

## 逻辑赋值运算符（Logical Assignment Operators）

> TC39提案GitHub地址：[📖](https://github.com/tc39/proposal-logical-assignment)

### 示例

```javascript
// 逻辑或赋值
x ||= y;
x || (x = y);

// 逻辑与赋值
x &&= y;
x && (x = y);

// 逻辑空赋值
x ??= y;
x ?? (x = y);
```

```javascript
const updateID = user => {

  // 传统写法
  if (!user.id) user.id = 1

  // 或这样
  user.id = user.id || 1

  // 最新的逻辑或写法
  user.id ||= 1
}
```

```javascript
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```

### 浏览器兼容性

![image-20210702151020501](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210702151020501YZLBS0JKCHUz.png)

## 数字分隔符（Numeric Separators）

> 为了提高数字可读性，可以在数字间使用_(U+005F)作为分隔符[📖](https://github.com/tc39/proposal-numeric-separator)

### 示例

```javascript
10_0000_0000            // 十亿
1_0147_5938.38          // 一亿多

let fee = 123_00;       // ¥123 (12300分)
let fee = 1_2300;       // ¥12,300 (显然1_2300可读性更好)
```

```javascript
0.00_0001 // 百万分之一
1e10_000  // 10^10000
0xA0_B0_C0;
0o2_2_5_6;
```

### 使用限制

1. 不允许连续超过一个下划线

```javascript
let n = 123__00; // SyntaxError: Only one underscore is allowed as numeric separator
```

2. 不能出现在数字结尾

```javascript
let n = 12300_;  // SyntaxError: Numeric separators are not allowed at the end of numeric literals
```

3. 不能在前导0后使用

```javascript
let n = 0_12300; // SyntaxError: Numeric separator can not be used after leading 0.
```

### 浏览器兼容性

![image-20210702163756434](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210702163756434SLqfhm.png)

[最新兼容性 caniuse.com ➡️](https://caniuse.com/mdn-javascript_grammar_numeric_separators)

## Promise.any 与 AggregateError

> `Promise.any()`接收一个`Promise`可迭代对象，只要其中一个`Promise`被`resolve`，就返回那个*已成功*的`promise`。
>
> 不会像`Promise.all`等待其他`promise`全部完成，也不会像`Promise.race`那样总是返回第一个(resolve/reject)的`promise`。
>
> 如果没有 fulfilled (成功的) promise，Promise.any() 返回 [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) 错误。
>
> ---
>
> - [Promise.any MDN地址 📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
> - [Promise.any TC39地址 📖](https://github.com/tc39/proposal-promise-any)

### 示例

```javascript
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log(first);
  // → 'home'
}).catch((error) => {
  // All of the promises were rejected.
  console.log(error);
});

// ⬆️ 上述示例中，error为AggregateError
```

```javascript
const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
})
// 期望输出: "很快完成"
```

### 浏览器兼容性

![image-20210702164914515](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210702164914515G3NaE7.png)

[最新兼容性 caniuse.com ➡️](https://caniuse.com/mdn-javascript_builtins_aggregateerror)

## String.prototype.replaceAll

> **`replaceAll()`** 方法返回一个**新**字符串，新字符串所有满足 `pattern` 的部分都已被`replacement` 替换。`pattern`可以是一个字符串或一个 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)， `replacement`可以是一个字符串或一个在每次匹配被调用的函数。
>
> **此方法不会修改调用对象，只是返回一个新的字符串。** 
>
> ---
>
> -  [String.prototype.replaceAll MDN文档地址 📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
> - [String.prototype.replaceAll TC39提案地址 📖](https://github.com/tc39/proposal-string-replaceall)

### 示例

```javascript
// const newStr = str.replaceAll(regexp|substr, newSubstr|function)

'x'.replace('', '_');
// → '_x'

'xxx'.replace(/(?:)/g, '_');
// → '_x_x_x_'

'xxx'.replaceAll('', '_');
// → '_x_x_x_'

// 第一个参数为Regex时，必须加g标志，否则将会触发TypeError
'xxx'.replaceAll(/(?:)/, '_');
// → Uncaught TypeError: String.prototype.replaceAll called with a non-global RegExp argument
```

### 浏览器兼容性

![image-20210705141400937](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210705141400937EE4x70.png)

[最新兼容性 caniuse.com ➡️](https://caniuse.com/mdn-javascript_builtins_string_replaceall)

## WeakRef 和 FinalizationRegistry

> 对于WeakRef 和 FinalizationRegistry的使用要慎重考虑，**[能不使用就尽量不要使用！](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#avoid_where_possible)**
>
> `WeakRef`对象允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被GC回收；`FinalizationRegistry` 对象可以让你在对象被垃圾回收时请求一个回调。
>
> ---
>
> - WeakRefs 和 FinalizationRegistry TC39提案地址 [📖](https://github.com/tc39/proposal-weakrefs)
> - WeakRefs MDN地址 [📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
> - FinalizationRegistry MDN地址 [📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)

```javascript
let target = {};
let wr = new WeakRef(target);

//wr and target aren't the same


const registry = new FinalizationRegistry(heldValue => {
  // ....
});

registry.register(myObject, "some value", myObject);
// ... 当不再关心myObject的变化时，可以unregister
registry.unregister(myObject);
```

### 浏览器兼容性

![image-20210705171947464](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210705171947464YZ2zCv.png)

[最新兼容性 caniuse.com ➡️](https://caniuse.com/mdn-javascript_builtins_finalizationregistry)

![image-20210705172218276](https://changjingli-blog.oss-cn-shanghai.aliyuncs.com//blog/image-20210705172218276Cb8Niv.png)

[最新兼容性 caniuse.com ➡️](https://caniuse.com/mdn-javascript_builtins_finalizationregistry)
