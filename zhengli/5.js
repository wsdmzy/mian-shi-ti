// 以下题目分别输出什么，为什么
// let i = 1
// for (let i = 0; i <= 10; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 0);
// }

// let i = 1
// for (var i = 0; i <= 10; i++) { //报错  SyntaxError: Identifier 'i' has already been declared
//   setTimeout(() => {
//     console.log(i)
//   }, 0);
// }

var i = 1
for (let i = 0; i <= 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0);
}