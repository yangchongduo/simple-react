```js

  function createFiberRoot(containerInfo, isConcurrent, hydrate) {
      // Cyclic construction. This cheats the type system right now because
      // stateNode is any.
      var uninitializedFiber = createHostRootFiber(isConcurrent);
      var root = void 0;
      // global.__PROFILE__ = NODE_ENV === 'development';
      // export const enableSchedulerTracing = __PROFILE__;
      // 是否启动调用 tracing
      if (enableSchedulerTracing) {
        root = {
          current: uninitializedFiber,
          containerInfo: containerInfo,
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
          hydrate: hydrate,
          nextExpirationTimeToWorkOn: NoWork,
          expirationTime: NoWork,
          firstBatch: null,
          nextScheduledRoot: null,
          interactionThreadID: tracing.unstable_getThreadID(),
          memoizedInteractions: new Set(),
          pendingInteractionMap: new Map()
        };
      } else {
        root = {
          current: uninitializedFiber,
          containerInfo: containerInfo,
          pendingChildren: null,
          pingCache: null,
          earliestPendingTime: NoWork,
          latestPendingTime: NoWork,
          earliestSuspendedTime: NoWork,
          latestSuspendedTime: NoWork,
          latestPingedTime: NoWork,
          didError: false,
          pendingCommitExpirationTime: NoWork,
          finishedWork: null,
          timeoutHandle: noTimeout,
          context: null,
          pendingContext: null,
          hydrate: hydrate,
          nextExpirationTimeToWorkOn: NoWork,
          expirationTime: NoWork,
          firstBatch: null,
          nextScheduledRoot: null
        };
      }

      uninitializedFiber.stateNode = root; // The reason for the way the Flow types are structured in this file,
      // Is to avoid needing :any casts everywhere interaction tracing fields are used.
      // Unfortunately that requires an :any cast for non-interaction tracing capable builds.
      // $FlowFixMe Remove this :any cast and replace it with something better.

      return root;
    }
```