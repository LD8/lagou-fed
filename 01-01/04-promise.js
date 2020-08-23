/**
 * 代码题四、手写实现MyPromise源码
 * 要求：尽可能还原Promise中的每一个API，并通过注释的方式描述思路和原理
 *
 * ***** Promise功能分析 *****
 *
 * 1. 执行Promise类时，需传入一个函数 —— 叫做执行器（executor）：
 *    * 执行器可传2个参数：resolve 和 reject
 *    * 执行器会在执行Promise时立即执行 -> constructor
 *
 * 2. Promise有三种状态：pending（默认）, fulfilled, rejected
 *    * 状态改变根据执行的状态一旦改变则不可变更
 *
 * 3. Promise状态的变更是通过 resolve 和 reject 来完成的
 *    * 执行resolve：pending -> fulfilled
 *    * 执行reject：pending -> rejected
 *    * 这两个函数的其他功能：
 *      - 判断promise状态，如果为pending则return空
 *      - 将传入他们的参数记录在promise实例的属性里，然后
 *      - 这些实例属性会被下一个then方法的的 resolve 和 reject 当做参数使用
 *      - 为了实现异步，他们还需循环执行已经以数组形式存储在实例中的then方法的 onFulfilled 和 onRejected
 *
 * 4. then方法：每一个Promise对象都可以调用then方法，它是被定义在原型对象中的
 *    * then永远返回一个新的Promise
 *    * then的功能就是判断上一个Promise的状态（实例中的status），并根据状态决定执行哪个参数
 *      - 它接收2个参数：onFulfilled 和 onRejected
 *      - 第一个参数resolve：成功时调用，接收上一个promise对象成功时的传入 resolve 的参数
 *      - 第二个参数reject：失败时调用，接收上一个promise对象失败时传入 reject 的参数
 *      - 也可以不传任何参数：a) 直接将上一个promise成功的结果传递给下一个then; b) (e) => { throw e}
 *    * 可以处理异步以及针对一个promise实例同时执行多个then的情况：
 *      - 即：传入then的参数需以array的形式被储存（push）进promise对象的实例属性中
 *    * 链式调用：
 *      - 链式调用需注意防止循环调用出现
 *      - 需支持不传参时的接力
 *    * 需注意捕获运行中的错误
 *
 * 5. Promise.all 方法：可直接被Promise调用所以是一个静态方法
 *    * 传入一个数组，返回一个promise对象
 *    * 用循环的方式在新promise中执行它的resolve方法
 *      - 传入resolve方法的参数也是一个数组
 *      - 通过创建addData来保证输出的数组result和传入的数组arr顺序一致
 *      - 在循环中记录此次循环的对象是否为promise或者为普通值：
 *        - 是普通值直接把它addData进result
 *        - 是promise执行这个对象的then方法：
 *          - onFulfilled：(value)=>addData(index,value)
 *          - onRejected: (err)=>reject(err)
 *    * addData的结构
 *      - 传入2个参数，index（传入数组中的项的index）和 value（项本身）
 *      - 为了实现异步，所以使用`result[index]=value`的方法赋值给result
 *      - 使用all方法内部的变量resultLength判断result的长度与arr的长度一致后运行新promise的resolve方法
 *
 * 6. Promise.resolve方法：将传入参数变为一个Promise对象
 *    * 判断参数是否为Promise对象
 *      - 如果是Promise对象，则直接作为返回值传出
 *      - 如果是普通值，则包裹在新的Promise实例中传出
 *
 * 7. finally方法：
 *    * 无论promise是fulfilled还是rejected的状态，finally方法的参数（回调函数）始终会被执行一次
 *    * 在finally方法之后还可以使用then取得此promise对象的返回结果
 *    * 借助Promise.resolve方法支持异步输出操作
 *
 * 8. catch方法：
 *    * 调用then方法只注册失败回调来实现error捕获
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executer) {
    try {
      // 因为执行器函数是这个类被创建时**马上**执行的，所以直接调用
      executer(this.resolve, this.reject);
    } catch (e) {
      return this.reject(e);
    }
  }

  // 定义类中的实例属性
  status = PENDING;
  resolvedValue = undefined;
  rejectedErr = undefined;
  onFulfilledCallbackArr = [];
  onRejectedCallbackArr = [];

  // 使用箭头函数定义类中的函数是为了autobind，即：使定义的函数中的 this 指向这个类，否则会默认指向 window
  resolve = (value) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.resolvedValue = value;
    while (this.onFulfilledCallbackArr.length)
      this.onFulfilledCallbackArr.shift()();
  };
  reject = (err) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.rejectedErr = err;
    while (this.onRejectedCallbackArr.length)
      this.onRejectedCallbackArr.shift()();
  };

  then = (onFulfilled, onRejected) => {
    // 可选参数设置
    // 若无 resolve 函数则直接输出上一个then接收到的值，实现接力
    onFulfilled = onFulfilled || ((v) => v);
    // 若无 reject 函数则直接输出上一个then接收到的值，实现接力
    onRejected =
      onRejected ||
      ((e) => {
        throw e;
      });
    // 1. 为了实现链调用，then的返回值也需要是MyPromise的实例
    // 2. MyPromise的执行器会在定义时执行，所以完全可以将判断逻辑写在新MyPromise的执行器里
    // 3. 将上一个then的成功/失败方法的返回值传入新MyPromise对象里的resolve和reject方法，从而实现接力
    let nextThenPromise = new MyPromise((resolve, reject) => {
      // 判断上一个Promise执行状态
      if (this.status === FULFILLED) {
        try {
          // 使成为异步执行代码：为了取得 nextThenPromise 来跟 v 作比较
          queueMicrotask(() => {
            let v = onFulfilled(this.resolvedValue);
            validateAndProceed(nextThenPromise, v, resolve, reject);
          });
        } catch (e) {
          return reject(e);
        }
      } else if (this.status === REJECTED) {
        try {
          queueMicrotask(() => {
            let e = onRejected(this.rejectedErr);
            validateAndProceed(nextThenPromise, e, resolve, reject);
          });
        } catch (e) {
          return reject(e);
        }
      } else {
        // 当状态为PENDING时，需要长一些的时间处理执行器中的任务，即：异步时
        // 比起直接.push(onFulfilled)，这样可以处理更多异常情况
        this.onFulfilledCallbackArr.push(() => {
          try {
            queueMicrotask(() => {
              let v = onFulfilled(this.resolvedValue);
              validateAndProceed(nextThenPromise, v, resolve, reject);
            });
          } catch (e) {
            return reject(e);
          }
        });
        // 比起直接.push(onRejected)，这样可以处理更多异常情况
        this.onRejectedCallbackArr.push(() => {
          try {
            queueMicrotask(() => {
              let e = onRejected(this.rejectedErr);
              validateAndProceed(nextThenPromise, e, resolve, reject);
            });
          } catch (e) {
            return reject(e);
          }
        });
      }
    });
    return nextThenPromise;
  };

  static all = (arr) => {
    let result = [];
    let realResultLength = 0;
    const returnAllPromise = new MyPromise((resolve, reject) => {
      const addData = (i, value) => {
        result[i] = value;
        realResultLength++;
        if (realResultLength === arr.length) {
          resolve(result);
        }
      };
      for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        if (current instanceof MyPromise) {
          current.then(
            (v) => addData(i, v),
            (e) => reject(e)
          );
        } else {
          addData(i, current);
        }
      }
    });
    return returnAllPromise;
  };

  static resolve = (value) =>
    value instanceof MyPromise
      ? value // 是MyPromise实例的直接返回该实例
      : new MyPromise((resolve) => resolve(value)); // 是普通值的包裹在MyPromise实例中，由resolve方法传出

  finally = (callback) =>
    this.then(
      (val) => MyPromise.resolve(callback()).then(() => val),
      (err) =>
        MyPromise.resolve(callback()).then(() => {
          throw err;
        })
    );

  catch = (onRejected) => this.then(undefined, onRejected);
}

const validateAndProceed = (nextThen, thisThenResult, resolve, reject) => {
  // 防止循环调用出现：
  if (thisThenResult === nextThen) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<MyPromise>")
    );
  }
  // 为了支持then的参数返回另一个Promise对象的情况：
  if (thisThenResult instanceof MyPromise) {
    //  * 判断 v/e 是普通值还是promise对象
    //  * 如果是promise对象，继续判断promise的状态，决定调用resolve还是reject
    thisThenResult.then(resolve, reject);
  } else {
    //  * 如果是普通值 直接resolve/reject
    resolve(thisThenResult);
  }
};
