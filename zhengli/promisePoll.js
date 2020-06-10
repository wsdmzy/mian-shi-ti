class PromisePool {
  constructor(max, fn) {
    this.max = max; // 最大并发数
    this.fn = fn; // 自定义的请求函数
    this.pool = []; // 并发池
    this.tasks = []; // 剩余的请求地址
  }

  start(tasks) {
    this.tasks = tasks;
    // 先循环把并发池塞满
    while (this.pool.length < this.max) {
      let task = this.tasks.shift();
      this.setTask(task);
    }
    // 利用Promise.race 方法来获得并发池中某任务完成的信号
    let race = Promise.race(this.pool);
    return this.run(race);
  }

  run(race) {
    race.then((res) => {
      console.log(res);
      // 每当并发池跑完一个任务，就再塞入一个任务
      let task = this.tasks.shift();
      this.setTask(task);
      return this.run(Promise.race(this.pool));
    });
  }
  setTask(task) {
    if (!task) return;
    let task = this.fn(task);
    this.pool.push(task); // 将该任务推入pool并发池中
    console.log(`任务 ${task} 开始，当前并发数：${this.pool.length}`);
    task.then((res) => {
      // 请求结束后将该Promise任务从并发池中移除
      this.pool.splice(this.pool.indexOf(task), 1);
      console.log(`任务 ${task} 结束，当前并发数：${this.pool.length}`);
    });
  }
}