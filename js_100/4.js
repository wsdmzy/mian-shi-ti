const numbers = [1,2,3]

numbers[10] = 11 //带来什么后果  占用了一大串内存空间
console.log(numbers[3])   //undefined
console.log(numbers)