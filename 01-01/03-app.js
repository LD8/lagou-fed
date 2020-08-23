/**
 * 代码题三、基于下面提供的代码，完成后续的四个练习
 */

// // （support.js文件中的代码在此省略）

/**
 * 练习1
 * 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
 */

// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support.js");
let maybe = Maybe.of([5, 7, 1]);

// -------------------- ANSWER START --------------------
let ex1 = (v) => {
  let r = maybe.map(fp.map(fp.add(v)));
  console.log(r);
};
ex1(10);
// --------------------  ANSWER END  --------------------

/**
 * 练习2
 * 实现一个函数ex2，能够使用fp.first获取列表的第一个元素
 */

// app.js
// const fp = require("lodash/fp");
// const { Maybe, Container } = require("./support");
let xs = Container.of(["do", "ray", "me", "fa", "so", "ls", "ti", "do"]);

// -------------------- ANSWER START --------------------
let ex2 = () => {
  let r = xs.map(fp.first);
  console.log(r);
};
ex2();
// --------------------  ANSWER END  --------------------

/**
 * 练习3
 * 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
 */

// app.js
// const fp = require("lodash/fp");
// const { Maybe, Container } = require("./support");
let safeProp = fp.curry((x, o) => Maybe.of(o[x]));
let user = { id: 2, name: "Albert" };

// -------------------- ANSWER START --------------------
let ex3 = () => {
  let r = safeProp("name", user).map(fp.first);
  console.log(r);
};
ex3();
// --------------------  ANSWER END  --------------------

/**
 * 练习4
 * 使用Maybe重写ex4，不要有if语句
 */

// app.js
// const fp = require("lodash/fp");
// const { Maybe, Container } = require("./support");
let ex4 = (n) => {
  if (n) {
    return parseInt(n);
  }
};

// -------------------- ANSWER START --------------------
ex4 = (n) => Maybe.of(parseInt(n));
console.log(ex4("3"));
// --------------------  ANSWER END  --------------------
