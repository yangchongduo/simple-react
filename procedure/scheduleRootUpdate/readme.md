```js
// 1、根据 `过期时间` 创建 一个 update
// 2、这个update放在fiber 的enqueueUpdate 上
function scheduleRootUpdate(current$$1, element, expirationTime, callback) {
  var update = createUpdate(expirationTime); // 根据 `过期时间` 创建 一个 update
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = { element: element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    !(typeof callback === 'function') ? warningWithoutStack$1(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
    update.callback = callback;
  }

  flushPassiveEffects(); // todo:暂时不知道
  enqueueUpdate(current$$1, update); // 给 fiber 增加 enqueueUpdate  enqueueUpdate是一个列表
  scheduleWork(current$$1, expirationTime);
  
  return expirationTime;
}
```