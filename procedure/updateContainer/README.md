```js
  function updateContainer(element, container, parentComponent, callback) => {
    // 这里在初次渲染时 element是children container是root parentComponent是null
    let current = container.current // current就是RootFiber
    let currentTime = requestCurrentTime() // 这里得到的是到目前为止 react还能处理多少单位时间(1单位时间是10ms)   react 设置了一个固定值 -  页面打开时间，到js 执行到现在的时间
    // 通过增加当前时间，计算器过期时间
    let expirationTime = computeExpirationForFiber(currentTime, current) // react 设置了一个过期时间 2^30  整个react 过期时间为这个
    this.scheduleRootUpdate(current, element, expirationTime, callback)
       var update = createUpdate(expirationTime); // 根据过期时间创建了updateEququ
          enqueueUpdate(current$$1, update);  // 初次渲染的时候将 没有updatqueue，所以建立一个
    return updateContainerAtExpirationTime()
  }
```

```js
 // 每个fiber节点，有自己的 updateEqueue（更新队列，是一个链表）每一个fiber current 上一次fiber
```