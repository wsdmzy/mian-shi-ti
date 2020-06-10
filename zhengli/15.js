// [1,[2,3],[[4],[4,[4,5]]]].unique() -> [1,2,3,4,5]


Array.prototype.unique = function() {
  console.log(Array.from(new Set(this.flat(Infinity))))
}

let arr = [1,[2,3],[[4],[4,[4,5]]]]
arr.unique() 