```js
function constructorClassInstance(workInProgress, nextProps, component) {
  let context = null
  let instance = new component(nextProps, context)
  workInProgress.memoizedState = instance.state || null
  adoptClassInstance(workInProgress, instance) // 非常重要
  // 执行组件 同时 组件和fiber 互指
  // fiber.stateNode= instance
  // instance._reactinternalFiber= workInProgress;
  return instance
}
```

```

```