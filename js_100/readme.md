性能代价和获取的用户体验不成正比
- vue 2.0 中 defineProperty 并没有对数组提供完全的数据劫持
  有一个前端性能的坑(数组下标1000.。。)， n empty object 数组
  push pop 常用的方法 重新定义数组原型，，Object.create()
  1. defineProperty 无法监听到数组下标的变化(特指Vue),数组api重新定义数组原型
  2. defineProperty 只能劫持的对象的属性，Proxy可以代理整个对象
  3. defineProperty 对象进行深度监听一次性递归，Proxy不需要一次性递归
  4. Proxy不仅可以对象，还可以代理数组

- vue3 Proxy 可以代理整个对象    defineProperty每个属性单独代理

