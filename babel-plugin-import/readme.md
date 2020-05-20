## babel
parser -> transform -> generate
      ast           ast

```js
<div>
  <p></p>
</div>
```
- 解析： code  -> AST
  - 词法分析： 状态机，源码解析为一个个token: div  p
  - 语法分析： html -> dom树  父子关系构造出来
  - AST 对源码进行抽象表达