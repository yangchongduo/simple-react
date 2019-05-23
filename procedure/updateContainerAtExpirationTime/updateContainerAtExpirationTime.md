```js
 更新容器的过期时间

    function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
      // 根据ReactDom.render传入的参数 进行渲染，肯定要复用 上一次的 current。尽管这是初次渲染
      var current$$1 = container.current;
      {
        if (ReactFiberInstrumentation_1.debugTool) {
          if (current$$1.alternate === null) {
            ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
          }
        }
      }
      var context = getContextForSubtree(parentComponent);

      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      return scheduleRootUpdate(current$$1, element, expirationTime, callback);
    }
 

```