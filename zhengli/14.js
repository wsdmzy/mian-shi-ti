/*
  题目：给定n天股价，问只能买入卖出各一次的情况下，求最大盈利额（时间复杂度要求为O(n)）
  输入：[7,1,2,3,4,6,5]    周二以1元买入，周六以6元卖出能够获取最大利润5元
  输出：5
  输入：[7,6,5,4,3,2,1]    股价持续走低，无论怎么买都会亏本，所以盈利额为0
  输出：0
*/

function getMaxProfit(arr) {
  
  let res = 0, min = 99, len = arr.length

  for (let i = 0; i < len; i++) {
    if (arr[i] < min) min = arr[i]
    else if (arr[i] - min > res) res = arr[i] - min
  }
  return res
}

console.log(getMaxProfit([7,1,2,3,4,6,5]))