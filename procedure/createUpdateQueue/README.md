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
    firstEffect: null, // 效果 影响  // 都是update  update 有tag，决定做什么操作。间接影响到fiber的 effectTag 
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null,
  }
```
