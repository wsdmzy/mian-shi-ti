function func() {
  console.log(this)
}

func.call(1)   //输出是什么？