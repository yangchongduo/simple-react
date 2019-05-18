```js
// 这个函数只是辅助工具 在production 上是不会存在的
enableUserTimingAPI = __DEV__;
global.__DEV__ = NODE_ENV === 'development';
global.__PROFILE__ = NODE_ENV === 'development';
 function startWorkLoopTimer(nextUnitOfWork) {
      if (enableUserTimingAPI) {
        currentFiber = nextUnitOfWork;

        if (!supportsUserTiming) {
          return;
        }

        commitCountInCurrentWorkLoop = 0; // This is top level call.
        // Any other measurements are performed within.

        beginMark('(React Tree Reconciliation)'); // Resume any measurements that were in progress during the last loop.

        resumeTimers();
      }
    }
```