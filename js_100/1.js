// var a = 2 变量的查询    词法分析 -> token  
// LHS查询 试图找到变量的容器本身，从而对其赋值     赋值操作的目标是谁
// RHS查询 简单的查找某个变量的值别无二致   = 右侧  谁是赋值操作的源头
function chageObjProperty(o) {  //o 形参 是LHS  RHS查询？ LHS
  o.siteUrl = "http://www.baidu.com";
  console.log(o, '---')
  o = new Object();  //LHS   右边的先执行
  console.log(o,'++')
  o.siteUrl = "http://www.google.com";
}


let webSite = new Object();
chageObjProperty(webSite);
console.log(webSite.siteUrl);