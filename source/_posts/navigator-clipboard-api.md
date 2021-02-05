---
layout: navigator.clipboard title: navigator.clipboard API date: 2021-02-02 15:21:12
tags: [navigator.clipboard, Clipboard, 剪贴板]
category: [技术研究]
---

## navigator.clipboard API

Web开发者一直以来希望能够访问剪贴板，通过操作剪贴板，好的一方面是我们可以实现复制订单号、读取用户复制的吱口令等方便用户的功能；坏的一面是开发者可以复制恶意文本，使用户可能不小心粘贴到表单，使其发生财产或其他损失等等。

过去我们通过`document.execCommand('copy')`来完成复制的功能，但这是不可靠的。`navigator.clipboard`API提供异步`readText`和`writeText`
方法管理剪贴板数据，通过以下代码看它是如何工作的：

```javascript
// 往剪贴板写数据
document.body.addEventListener('click', async e => {
    await navigator.clipboard.writeText('hello world');
});

// 从剪贴板读数据
document.body.addEventListener('click', async e => {
    const text = await navigator.clipboard.readText();
    alert(`text: ${text}`);
});
```

## 问答

### 1. `readText`和`writeText`使用起来这么方便，我可以在任意地方调用navigator.clipboard API吗？

不能，出于浏览器安全策略考虑，规范表明需在**由用户主动触发的事件中**使用，类似微信用户信息授权机制。实际测试过程中发现，打开用到剪贴板的页面时，Chrome 88提示剪贴板权限，授予权限后，可以在*任意*处运行；Safari
14.0.3
打开页面直接报错，提示`Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.`
，放在`click`、`touchstart`之类callback中没有问题。

### 2. 如果用户拒绝剪贴板权限，程序会异常吗？

不会，`readText`和`writeText`都是异步的，异常行为与Promise类似。如果没有剪贴板授权，会得到`Promise Rejection`报错，可以通过`.catch`或者`try{} catch {}`
优雅处理未授权情况。






