```js
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  // 这个_reactRootContainer就是FiberRoot
  // 第一次肯定是undefined
  let root = container._reactRootContainer
  if (!root) {
    // 第二个参数是 isConcurrent 表示是否是异步渲染
    // 初次渲染肯定是false
    // react源码中还要传个是否是服务端渲染
    // 这个isConcurrent表示不使用异步渲染
    // 因为初次渲染时是一定要同步更新的 所以这里要默认状态是false
    let isConcurrent = false // 并行的，就是异步的
    // 就是这里创建了一个Root作为React应用的根儿
    // 然后在创建Root的同时还顺便创建了一个未初始化的RootFiber
    // _reactRootContainer fiber 
    // ReactRoot 不是一个 fiber
    root = container._reactRootContainer = new ReactRoot(container, isConcurrent) 

   

    new ReactRoot
        this._internalRoot = root;
        const root = createContainer(container, isConcurrent, hydrate);
              createFiberRoot(container) // 创建filberRoot的时候，创建了一个未初始化的filber uninitializedFiber
                const uninitializedFiber = createHostRootFiber(isConcurrent);
                        createHostRootFiber //  调用了 new FiberNode(); 

    // 这里要检查callback
    // ...
    
    // 这个unbatchedUpdates啥也没干
    // 只是改了个全局变量 告诉react不要批量更新
    // 批量更新会在同时执行多个异步的时候用到 比如同时执行了好几个setTimeout
    unbatchedUpdates(function () {
      root.render(children, callback)
    })
  }
}

```

```js 
  rootFilber的
 root = ({
      current: uninitializedFiber, //  未初始化的fliber
      containerInfo: containerInfo, // 真实的dom 元素
      pendingChildren: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      pingCache: null,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,

      interactionThreadID: unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map(),
    }: FiberRoot);

    // 未初始化的 fiber上的stateNode = root 进行互指
     uninitializedFiber.stateNode = root;

```