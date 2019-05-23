```js
// 1、根据 `过期时间` 创建 一个 update
// 2、这个 update 放在 uninstallFiber 的 updateQueue 上
// 调度 Root 更新
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
  enqueueUpdate(current$$1, update); // 如果有 updateQueue 就将   给 fiber 增加 updateQueue  updateQueue 是一个列表
  // 到目前为止 只是将 element 放在了 uninstallFiber 上updateQueue.update.payload 上 什么也没做
  // 开始执行调度work  
  scheduleWork(current$$1, expirationTime);

  return expirationTime;
}
```

```js
// 联调 firstUpdate  lastUpdate
{
    "baseState": null,
    "firstUpdate": {  // 
        "expirationTime": 1073741823,
        "tag": 0,
        "payload": {
            "element": {
                "key": null,
                "ref": null,
                "props": {},
                "_owner": null,
                "_store": {}
            }
        },
        "next": null,
        "nextEffect": null
    },
    "lastUpdate": {
        "expirationTime": 1073741823,
        "tag": 0,
        "payload": {
            "element": {
                "key": null,
                "ref": null,
                "props": {},
                "_owner": null,
                "_store": {}
            }
        },
        "next": null,
        "nextEffect": null
    },
    "firstCapturedUpdate": null,
    "lastCapturedUpdate": null,
    "firstEffect": null,
    "lastEffect": null,
    "firstCapturedEffect": null,
    "lastCapturedEffect": null
}
```