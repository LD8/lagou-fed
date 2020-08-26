/**
 * 代码题一、将下面的异步代码使用Promise的方式改进
 */

// setTimeout(() => {
//   var a = "hello";
//   setTimeout(() => {
//     var b = "lagou";
//     setTimeout(() => {
//       var c = "I ❤️ U";
//       console.log(a + b + c);
//     }, 10);
//   }, 10);
// }, 10);

// -------------------- ANSWER START --------------------
Promise.resolve()
  .then(() => "hello")
  .then((res) => res + "lagou")
  .then((res) => {
    console.log(res + "I ❤️ U");
  });
// --------------------  ANSWER END  --------------------
