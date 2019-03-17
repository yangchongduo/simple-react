```js
function createUpdateQueue(state) {
  return {
    baseState: state, // 这个baseState就是当前这个fiber的状态 每次更新完后都会把最新的state给这个属性
    firstUpdate: null,
    lastUpdate: null,
    firstEffect: null, 
    lastEffect: null,
  }
}
```


```js

const queue: UpdateQueue<State> = {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null, //Captured Update 捕获更新
    lastCapturedUpdate: null, 
    firstEffect: null, // 效果 影响
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  }
```