# 笔记


## 2
  Vue面试题
  1.  v-show和v-if的区别
    css   v-if不会新渲染到dom
  2. 为何v-for中要用key
    循环体中，vdom中diff算法进行比较的时候，会比较key，如果相同则保留，否则重建
  3. 描述Vue组件生命周期(有父子组件的情况下)
    创建挂载更新销毁   外-> 内  内 -> 外
  4. Vue组件如何通讯
    1.props emit  2. 自定义事件 3 vuex
  5. 描述组件渲染和更新的过程
  6. 双向数据绑定v-model的实现原理
    监听input value绑定$event.target.value 动态更新


  React
  1. React组件如何通讯
  2. JSX的本质是什么
  3. context是什么，有和用途？
  4. shouldComponentUpdate的用途
  5. 描述redux的单项数据流
  6. setState是同步还是异步


  框架综合应用
  1. 基于React设计一个todolist(组件结构，redux state数据结构)
  2. 基于Vue设计一个购物车(组件结构， vuex state数据结构)

  webpack面试题
  1. 前端代码为何要进行构建和打包？
  2. module chunk bundle分别什么意思，有何区别？
  3. loader和plugin的区别
  4. webpack如何实现懒加载
  5. webpack常见性能优化
  6. babel-runtime和babel-polyfill的区别


  框架的使用(基本使用，高级特性，周边插件)   --考察使用
  框架的原理(基本原理的了解，热门技术的深度，全面性)  --考察原理
  框架的实际应用，即设计能力(组件结构，数据结构)  --考察设计能力


## 3
  基本使用，组件使用
  高级特性
  Vuex和Vue-router
- 基本使用，组件使用
  v-html 有xss风险

  computed缓存，data不变
  watch如何深度监听？
    拿不到oldVal(引用类型)
    deep: true

  v-if 不满足不会渲染到dom   更新不频繁
  v-show 会渲染 dispaly node   更新频繁

  如何遍历对象  (val,key,index) in listObj
  key的重要性  id
  v-for和v-if不能一起使用  v-for优先级高   v-if放在上一级

  事件
    event对象  是原生的event对象  事件被挂载到当前元素
      没有参数，自带event
      有参数，加上$event
    事件修饰符
    按键修饰符
    表单
      v-model
      .trim .lazy .number

  
  组件使用
    props和$emit
    组件间通讯-自定义事件  vue本身具有自定义事件能力
      export default new Vue()  
      event.$emit('',参数) 调用自定义事件
      event.$on('',func)  绑定自定义事件
      event.$off('',func)  //及时销毁自定事件(beforeDestory)，否则内存泄漏
    组件生命周期
      单个组件
        created 创建初始化完内存 mounted 渲染完成
      父子组件
        创建外->内  渲染内->外 
        update 父before—>子before->子update->父update

- 高级特性
    自定义v-model
      颜色选择器
      组件 v-model
      子组件中 配置model,props,
        输入框中 :value  @input="$emit("事件"，$event.target.value)" 
        emit中的事件和model.event对应
        model.prop和:value绑定的变量对应，且props中有
    $nextTick
      Vue是异步渲染，data改变之后，DOM不会立刻渲染
      $nextTick会在DOM渲染之后触发(回调)，以获取最新的DOM节点
      多次data修改只会渲染一次
    slot
      父组件往子组件插入一段内容
      作用域插槽  拿到子组件的属性
        子组件 绑定数据 :name2
        父组件 <template v-solt="name1">{{name1.name2}}</template>
      具名插槽
        子组件name属性，父组件调用v-solt:name  | name="name"
    动态，异步组件
      动态组件  新闻详情页
        <component :is="component-name">用法
        需要根据数据，动态渲染组件
      异步组件  路由懒加载的方法一样加载组件
        import()
        按需加载异步加载大组件
    keep-alive
      缓存组件，频繁切换，不需要重复渲染   tab切换
    minxin
      多个组件有相同的逻辑，抽离出来
      并不是完美解决，有一些问题，(变量来源不明确，可能造成命名冲突，mixin和组件多对多的关系)
      Vue3中Composition API

- Vuex
  单一状态树
  api  辅助函数
  actions 异步请求

- Vue-router
  路由模式 hash history(需要server支持)
  路由配置 动态路由，懒加载  meta  路由守卫 
    
  

## 4
  Vue原理  2/8原则
  组件化
  响应式
  vdom和diff
  模板编译
  渲染过程
  前端路由

- 组件化基础
  很久以前就有组件化   静态渲染，依赖于操作dom
  数据驱动视图   MVVM  model view viewmodel

- Vue响应式
  组件data的数据一旦变化，立刻触发视图的更新
  核心API-Object.defineProperty  (Vue3.0 Proxy兼容性不好)
  监听对象，监听数组
  复杂对象，深度监听
  几个缺点
    1. 深度监听要递归到底，一次性计算量大
    2. 无法新增/删除属性(Vue.set,Vue.delete)
    3. 无法监听数组，需要特殊处理
    
- vdom和diff
  vdom是实现vue和React的重要基石
  diff算法是vdom中最核心，最关键的部分
  vdom热门话题
  dom操作十分耗时，解决：vdom
    js执行速度很快，所以
    用js模拟dom结构，计算最小的变更，操作dom
  snabbdom学习vdom  (vue参考它实现的)
  diff即对比，广泛的概念， linux diff git diff
  树diff的时间复杂度O(n^3)
  -> 优化到O(n)
    1. 只比较同一层级，不跨级比较
    2. tag不相同，则直接删掉重建，不再深度比较
    3. tag和key，两者都相同，则认为是相同节点，不深度比较 
  h,vnode,patch,diff,key等
  vdom存在的价值更重要：数据驱动视图，控制DOM操作

- 模板编译
  with语法
  模板一定是转换为js代码，模板编译
  vue template complier 将模板编译为render函数
  执行render函数返回vnode
  vnode再执行patch(补丁)和diff
  使用webpack vue-loader，会在开发环境下编译模板
  所以vue组件中可以使用render代替template
  简单说：模板到render函数，再到vnode，再到渲染和更新

- 渲染过程
  考察对流程了解的全面的程度
  - 初次渲染
    1. 解析模板为render函数(或者开发环境已完成，vue-loader)
    2. 触发响应式，监听data属性getter，setter
    3. 执行render函数生成vnode，patch(elem,vnode)
  - 更新过程
    1. 修改data，触发setter(此前getter中已被监听)
    2. 重新执行render函数，生成newVnode
    3. patch(vnode,newVnode) diff算法会计算最小的变动
  - 异步渲染
    $nextTick，多次data修改，一次渲染
    减少DOM操作次数，提高性能
  
- 前端路由

  hash的特点: window.onhashchange
    1. hash变化会触发网页跳转，即浏览器的前进，后退
    2. hash变化不会发生刷新页面，SPA必须的特点
    3. hash永远不会提交到server端(前端自生自灭)
  history:
    1. url规范的路由，但跳转时不刷新页面
    2. history.pushState()和window.onpopstate()
    3. 需要服务端配合  不管怎么样都返回index.html


## 5
  常见题
  1. v-show和v-if的区别
    1. v-show通过css display控制显示和隐藏
    2. v-if组件真正的渲染和销毁，而不是显示和隐藏
    3. 频繁切换用v-show，否则v-if

  2. v-for中用key
    1. 必须用key，不能是index和random
    2. diff算法中通过tag和key来判断，是否是sameNode
    3. 减少渲染次数，提升渲染性能

  3. 描述Vue组件生命周期(父子组件)
    1. 单组件生命周期图
    2. 父子组件生命周期关系(外->内->外)

  4. Vue组件如何通讯(常见)
    1. porps，$emit
    2. 自定义事件(new vue  自带自定义事件能力)
    3. vuex

  5. 描述组件渲染和更新的过程
    首次渲染:
      1. 将vue组件模板编译为render()函数
      2. observer劫持data中的数据，通过Object.defineProperty的getter监听data中数据
      3. 执行render函数生成vnode，patch(elm,vnode)将vdom生成真实dom渲染到界面上
    更新:
      1. 监听到data中的数据改变，Object.defineProperty的setter,
      2. 重新执行render函数，生成newVnode,然后patch(vnode,newVnode)，diff算法会计算最小变更，渲染页面

  6. 双向绑定v-model的实现原理
    1. input元素的value=this.name
    2. 绑定input事件this.name=$event.target.value
    3. data更新触发re-render

  7. 对MVVM的理解
    M model V View  VM ViewModel
    数据驱动视图，
    V -> dom listener  ->  M
      <-   Directives  <-

  8. computed有和特点
    1. 缓存，data不变不会重新计算
    2. 提高性能

  9. 为何data必须是一个函数？
    .vue文件实际上是个类，调用是new，是函数就形成闭包，可以有自己独立的状态
    如果不是函数，那么就会冲突，会影响之间的状态

  10. ajax请求放在哪个生命周期
    1. mountd
    2. js是单线程，ajax是异步获取数据
    3. 放在mounted之前没有用，只会让逻辑更加混乱

  11. 如何将组件所有props传递给子组件？
    1. $props
    2. <User v-bind="$props">

  12. 如何自己实现v-model
    1.  :value="text" @input="$emit('change',$event.target.value)"
    2. model: { prop : 对应props, event: 对应上面的change}

  13. 多个组件相同的逻辑，如何抽离？
    mixin，minin有些缺点(多人合作不易阅读，多对多关系)

  14. 何时使用异步组件
    1. 加载大组件
    2. 路由异步加载
    3. 优化性能
    
  15. 何时keep-alive
    1. 缓存组件，不需要重复渲染
    2. 如多个静态tab页的切换
    3. 优化性能

  16. 何时使用beforeDestroy
    1. 解绑自定义事件event.$off
    2. 清除定时器
    3. 解绑自定义的DOM事件，如window scoll

  17. 什么是作用域插槽
    允许将模板传递给插槽，拿到子组件的数据
    子组件中绑定数据，父组件中模板中v-slot

  18. Vuex actions和mutation有何区别
    1. action异步，mutation不可以
    2. mutation做原子操作，官方推荐改变state通过mutation
    3. action可以整合多个mutation

  19. Vue-router常用的路由模式
    1. hash默认  onhashchange
    2. history (需要服务端支持)  pushState  onpopstate

  20. 请用vnode描述一个DOM结构
    {
      tag: 'div',
      props: {
        className: 'content',
        id: 'home'
      },
      children: [
        ...
      ]
    }
  21. 监听data变化的核心API是什么
    1. Object.defineProperty
    2. 以及深度监听，监听数组
    3. 缺点(深度监听一次性递归，重新定义数组原型，新增和删除用Vue提供的api)

  22. 请描述响应式原理
    1. 监听data变化
    2. 组件渲染和更新的过程

  23. diff的事件复杂度
    O(n^3) -> O(n)
      1. 只比较同一层级，不跨级比较
      2. tag不相同，则直接删掉重建，不再深度比较
      3. tag和key，两者都相同，则认为是相同节点，不深度比较 

  24. 简述diff算法过程  snabbdom学习vdom
    1. patch(elm,vnode)和patch(vnode,newVnode)
    2. patchVnode,addVnodes,removeVnodes
    3. updateChildren(key的重要性)

  25. Vue为何是异步渲染，$nextTick有何用
    1. 异步渲染(合并data的修改)，以提高渲染性能
    2. $nextTick在DOM更新完之后，触发回调(只有在$nextTick中拿到DOM的变化)

  26. Vue常见性能优化方法
    1. 合理使用v-show和v-if
    2. 合理使用computed
    3. v-for时加key，以及避免v-if同时使用
    4. 自定义事件，DOM事件及时销毁
    5. 合理使用异步组件
    6. 合理使用keep-alive
    7. data层级不要太深
    8. 使用vue-loader在开发环境做模板编译(预编译)
    9. webpack层面的优化
    10. 前端通用的性能优化，图片懒加载
    11. 使用SSR


## 6
  Vue3.0
  - 升级内容
    1. 全部用ts重写(响应式，vdom，模板编译)
    2. 性能提升，代码量减少
    3. 会调整部分API

 
  Reflect:
    Reflect和Proxy能力一一对应的
    规范化,标准化,函数式
    代替Object的工具函数

   - Proxy重写响应式
    1. 深度监听性能更好(深度监听get时候递归,不是一次性递归)
    2. 可监听新增(set中判断Reflect.ownKeys)/删除元素(deleteProperty)
    3. 可监听数组变化

    无法兼容所有浏览器,无法polyfill




    
  

## 10
  webpack前端构建的不二选择
  工具,重点在于配置和使用
  基本配置
  高级配置
  优化打包效率
  优化产出代码
  构建流程概述
  babel

  - 基本配置
    1. 拆分配置和merge(smart)
    2. 启动本地服务
    3. 处理es6
    4. 处理样式
    5. 处理图片
    6. (模块化)

  - 高级配置
    1. 多入口  多页面   
      entry 多个
      output  [name].[hash]
      plugin  每个入口生成对应的html,chunks:引入对应的js
    2. 抽离css文件
      module: loader: MiniCssExtractPlugin.loader,'css-loader'
      plugins: new 配置
      optimization: minimizer  压缩css
    3. 抽离公共代码  
      公共引用部分
      第三库代码
      optimization: splitChunks: chunks:all, cacheGroup:{}
    4. 懒加载
      异步加载 webpack默认支持,,生成chunk
    5. jsx语法  babel preset
    6. vue语法  vue-loader

  - module chunk bundle的区别
    1. module-引用各个源码文件(css,图片..),webpack中一切皆模块
    2. chunk-多模块合并成的,如entry import() splitChunk
    3. bundle-最终的输出文件

  - webpack性能优化
    - webpack优化构建速度 构建速度
      1. 优化babel-loader
        开启缓存  ?cacheDirectory
        明确范围  include和exclude
      2. IgnorePlugin
        忽略无用文件
      3. noParse
        避免打包一些文件
      4. happyPack
        多进程打包
        JS单线程,开启多进程打包
        提高构建速度(特别多核CPU)
        plugins,module.use
      5. ParallelUglifyPlugin
        多进程压缩JS
        plugins
      6. 自动刷新
        整个网页全部刷新,速度较慢,状态会丢失
      7. 热更新
        新代码生效,网页不刷新,状态不丢失
        HotMo...插件,devServer hot:true
        js代码,开启热更新范围
      8. DllPlugin 动态链接库插件
        背景:
          前端框架如vue React  体积大,构建慢
          较稳定,不常升级版本
          同一版本只构建一次,不用每次都重新构建
        webpack已内置了DllPlugin
        DllPlugin-打包出dll文件
        DllReferencePlugin-使用dll文件

    - webpack优化构建速度(可用于生产环境)
      1. 优化babel-loader
        明确范围
      ...
      不用于生产
        自动刷新
        热更新
        DllPlugin

    - 优化产出代码
      - 体积更小,
      - 合理分包,不重复加载
      - 速度更快,内存使用更少
      小图片base64化
      bundle加hash
      懒加载
      提取公共代码
      IgnorePlugin
      使用CDN加速
      使用production
        自动开启代码压缩
        Vue React等会自动删除掉调式代码
        启动Tree-Shaking
          没用到的代码不打包
          ES6Module才能让tree-shaking生效?
            es6module静态引入,编译时引入
            commonjs动态引入,执行时引入
            只有es6module才能静态分析,实现tree-shaking
      Scope Hosting
        多个函数内容放到一个函数中
        代码体积更小,作用域更少,可读性更好
        插件ModuleConca...
        resolve.mainFields: jsnext:main,指向es6模块化语法的文件

  - babel 
    环境搭建和基本配置
      npx babel filename
      presets:常用很多的plugins,另外的再扩展
    babel-polyfill
      polyfill? 补丁
        做一个低版本浏览器的兼容
      core-js ?    
        标准库集合了很多polyfill
      regenerator
        标准库集合了很多polyfill
      babel-polyfill即两者的集合   7.4被弃用了 推荐使用上面两个
    babel-runtime

    - babel-polyfill
      babel 本身只关注语法不关注API,不处理模块化(webpack)
      如何配置按需引入?
        useBuiltIns:"usage"
      问题?
        会污染全局环境
        用babel-runtime解决

    - babel-runtime
      生产代码  _ 不会污染全局环境

  - 面试题
    1. 前端为何要进行打包和构建?
      - 代码层面
        1. 体积更小(Tree-Shaking,压缩,合并),加载更快
        2. 编译高级语言或语法(TS,ES6+,模块化,scss)
        3. 兼容性和错误检测(Polyfill,postcss,eslint)
      - 研发流程
        1. 统一高效的开发环境
        2. 统一的构建流程和产出标准
        3. 集成公司构建规范(提测,上线等)

    2. module,chunk,bundle的区别
      1. module-引用各个源码文件(css,图片..),webpack中一切皆模块
      2. chunk-多模块合并成的,如entry import() splitChunk
      3. bundle-最终的输出文件

    3. loader和plugin的区别
      1. loader模块转换器,如less->css
      2. plugin扩展插件,如HtmlWebpackPlugin

    4. 常见loader和plugin有哪些
      ...

    5.  babel和webpack的区别
      1. babel  js新语法的编译工具,不关心模块化 
      2. webpack 打包构建工具,是多个loader和plugin的集合
      3. webpack+babel 占据了前端工程化的生态位

    6. 如何产出一个lib?
      output: library: ' '

    7. babel-polyfill和babel-runtime的区别
      1. babel-polyfill会污染全局
      2. babel-runtime不会污染全局
      3. 产出第三lib要用babel-runtime

    8. webpack如何实现懒加载
      1. import()
      2. 结合Vue React异步组件  路由

    9. 为何Proxy不能被Polyfill
      1. 如clss可以用function模拟
      2. 如Promise可以用callback来模拟
      3. 但Proxy的功能用Object.defineProperty无法模拟

    10. webpack优化构建速度(可用于生产环境)
      1. 优化babel-loader
      2. IgnorePlugin(忽略本地化内容,moment.js)
      3. noPrase(过滤不需要解析的文件,例如loadsh)
      4. happyPack
      5. ParallelUglifyPlugin
    
    11. webpack优化构建速度(不可用于生产环境)
      1. 自动刷新
      2. 热更新
      3. DllPugin(将框架生成lib,引入,不需要打包)

    12. webpack优化产出代码
      1. 小图片base64化
      2. bundle加hash
      3. 懒加载(chunk)
      4. 提取公共代码
      5. 使用CDN加速
      6. IgnorePlugin
      7. 使用production(Tree shaking)
      8. Scope Hosting

  

      



## 11



  