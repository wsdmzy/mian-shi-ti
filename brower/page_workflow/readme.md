虚拟DOM  算法Tree  重绘  浏览器工作原理

1. 如果下载文件CSS文件阻塞了，会阻塞DOM树的合成吗，会阻塞页面的显示吗
   不会阻塞DOM树的合成，会阻塞页面的显示
   不同阶段  

   url -> download html document -> 解析页面  分阶段

   1. DOM树的合成(?)   
   2. 页面的显示，重排，重绘(css处理有关)
   浏览器把页面展示(绘制)出来,工作流程
   - 入口是什么       index.html  网络子进程下载 Buffer
    resolve['html','js','css']
    html 超文本标记语言 结构 dom  标签节点，文本节点
    css  层叠样式表  样式 stylesheet  
    js  javascript  交互 动态dom部分
    document 文档开始， 空白的  DOM树没形成， 
    rules  渲染通过最初的html文档内容，进行分别处理，
    为什么标签就可以？

   - 不同类型的文件，不同的loader
    每个阶段？ 
    类比: webpack
      - 开始每个子阶段有输入的内容， .styl .css .png .ts...
      - 对其进行相应处理  loader
      - 每个阶段生成输出内容  bunder.js
    上一个阶段的输出会成为下一个阶段的输入  bundle.js
   - 输出是什么

 
1. 构建DOM树  在内存中 看不到页面，在内存中构建dom树
  浏览器没办法理解HTML格式
  编程的过程 数据结构(tree) + 算法(css selector, js querySelector  查找效率  什么树来解决 )  
2. 样式的计算(Recalculate style)
  这么多样式怎么管起来？样式表
  选择器，权重， 层叠
  当浏览引擎接收到css文本时， text/css
  document.stylesheets 对象中  json组织css 规则的
  选择器就是key   value就是属性值
  样式的计算
  - 转换样式表中的属性值，使其标准化
    body {font-size: 2em} em css3  px
    font-weight: bold 700
  - 计算每个节点的具体样式
    1. 继承
    2. 层叠
    3. 浏览器默认样式，及节点样式
3. 布局
  需要计算出DOM树种可见元素的几何位置，这个过程叫布局
  第二颗树？渲染树 
  1. 遍历DOM树的所有节点，并把这些节点加到布局树中
  2. 布局计算
    
  - 双飞翼和圣杯布局，常考考点
  - 三列式布局， 圣杯有缺点，宽度小于left 掉下来
    双飞翼布局 解决路这个bug， 缺点也有 DOM树更复杂，渲染性能不如圣杯

4. 绘制