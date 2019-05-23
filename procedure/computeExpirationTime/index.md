#### 过期时间和优先级 是非常重要的

- 低优先级的 在25ms 为一个
- 搞优先级在10ms一个

- ExpirationTime 不同，就是任务优先级不同
- 假如 在短时间内，连续两次执行setState，他们的now() 是肯定不同的，计算出来的 ExpirationTime 就不同，
- 如果有了 25ms 这个概念，他们计算出来的 ExpirationTime 就相同了，任务的优先级也就一样了。
- 在差距很小的时间间隔内，算出来的 ExpirationTime 是一样的，

#### 异步的优先级 是比较低的

- 优先级的任务是可以打断的，但是也设置了一个ExpirationTime ，如果已经过了 ExpirationTime，这个时候就强制更新

#### ExpirationTime 有很多场景


```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// import MAX_SIGNED_31_BIT_INT from './maxSigned31BitInt';

export type ExpirationTime = number;

export const NoWork = 0;
export const Sync = 1;
export const Never = MAX_SIGNED_31_BIT_INT;

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = 2;

// 1 unit of expiration time represents 10ms.
//
export function msToExpirationTime(ms: number): ExpirationTime {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET;
}

export function expirationTimeToMs(expirationTime: ExpirationTime): number {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
}

function ceiling(num: number, precision: number): number {
  return (((num / precision) | 0) + 1) * precision;
}

//  计算过期时间段
function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs,
): ExpirationTime {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      //  2 + 500
      // 150 / 10 
      (((num / precision) | 0) + 1) * precision;
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, // 工作单元
      bucketSizeMs / UNIT_SIZE,
    )
  );
}

export const LOW_PRIORITY_EXPIRATION = 5000; //低优先权期限
export const LOW_PRIORITY_BATCH_SIZE = 250; // 低优先级批量大小

// 计算异步时间段
export function computeAsyncExpiration(
  currentTime: ExpirationTime,
): ExpirationTime {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  );
}

// We intentionally set a higher expiration time for interactive updates in
// dev than in production.
//
// If the main thread is being blocked so long that you hit the expiration,
// it's a problem that could be solved with better scheduling.
//
// People will be more likely to notice this and fix it with the long
// expiration time in development.
//
// In production we opt for better UX at the risk of masking scheduling
// problems, by expiring fast.
export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;
// 计算交互式过期
export function computeInteractiveExpiration(currentTime: ExpirationTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  );
}

```