
```js
let originalStartTimeMs: number = now();
let currentRendererTime: ExpirationTime = msToExpirationTime(
  originalStartTimeMs,
);
let currentSchedulerTime: ExpirationTime = currentRendererTime;

// Use these to prevent an infinite loop of nested updates
const NESTED_UPDATE_LIMIT = 50;
let nestedUpdateCount: number = 0;
let lastCommittedRootDuringThisBatch: FiberRoot | null = null;

const timeHeuristicForUnitOfWork = 1;

// 每次执行这个函数就是 重新计算 currentRendererTime 当前的渲染时间
// 引入import 到执行这个函数的时间  统计时间用的
function recomputeCurrentRendererTime() {
  const currentTimeMs = now() - originalStartTimeMs;
  currentRendererTime = msToExpirationTime(currentTimeMs);
}
```

```js
// 1 unit of expiration time represents 10ms.
//  将 毫秒转变成 过期时间  时间约大，说明执行的顺序越长
export function msToExpirationTime(ms: number): ExpirationTime {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET;
}

```