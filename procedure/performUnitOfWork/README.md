```js
function performUnitOfWork(workInProgress) {
   {
        setCurrentFiber(workInProgress); //  全局有一个current 变量，存放当前的fiber
  }
  // replayFailedUnitOfWorkWithInvokeGuardedCallback 只有dev 下面才会有用，production 没用
  if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
      stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
    }
  // beginWork就是开始工作 开始工作就是创建出子fiber节点
  let next = beginWork(workInProgress) // 创建一次的fiber
  workInProgress.memoizedProps = workInProgress.pendingProps

  if (next === null) {
    // 子fiber节点是null了
    // 说明一侧的fiber树创建完成
    // 然后要在completeUnitOfWork函数中将这一侧的update都挂到root上
    // next = completeUnitOfWork
    // 然后在completeUnitOfWork中找到兄弟节点作为next进行兄弟节点上的fiber的创建
    // 如果都到这里了 这next还是返回null 就说明这个root下的节点们都已经完成了fiber
    // 就可以进行下一步的commit了
    next = completeUnitOfWork(workInProgress)
  } 
  return next
}
```