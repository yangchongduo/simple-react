// 使用二进制是因为可以很好的融合以及剔除种类
// 可以很好的进行  组合mode  ，判断是否有某个mode
// 比如 0b010 | 0b001 => 0b011
// |= 标识添加上这个类型
export const NoContext = 0b000 // 没有上下文的类型
export const ConcurrentMode = 0b001 // 使用低优先级的类型
export const StrictMode = 0b010 // 严格模式的类型
// export const ProfileMode = 0b100

const mode = NoContext; // 本身结果是0

mode & ConcurrentMode  // 判断是否有 这个mode ，如果返回0 就说明没有这个mode
mode |= ConcurrentMode; // 通过 |= 添加这个mode，
mode & ConcurrentMode // 这个时候返回这个ConcurrentMode，不等于NoContext（0），说明这个mode是包含这mode 的。
mode |= StrictMode;  //  给当前的mode 再添加一个mode， 这样mode 会包含三个mode  // mode 的值是这些mode的集合 mode===3

mode & ConcurrentMode // 1       
mode & StrictMode // 2 
