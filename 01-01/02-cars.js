/**
 * 代码题二、基于以下代码完成下面四个练习
 */
const fp = require("lodash/fp");

// 数据：horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  {
    name: "Ferrari FF",
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true,
  },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  {
    name: "Audi R8",
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
  },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

/**
 * 练习1
 * 使用函数组合fp.flowRight()重新实现下面这个函数
 */

let isLastInStock = (cars) => {
  // 获取最后一条数据
  let last_car = fp.last(cars);
  // 获取最后一条数据的in_stock属性值
  return fp.prop("in_stock", last_car);
};

// -------------------- ANSWER START --------------------
isLastInStock = fp.flowRight(fp.prop("in_stock"), fp.last);

console.log("Stock of last car: ", isLastInStock(cars));
// --------------------  ANSWER END  --------------------

/**
 * 练习2
 * 使用fp.flowRight(),fp.prop()和fp.first()获取第一个car的name
 */

// -------------------- ANSWER START --------------------
const nameOfFirst = fp.flowRight(fp.prop("name"), fp.first);

console.log("Name of first car: ", nameOfFirst(cars));
// --------------------  ANSWER END  --------------------

/**
 * 练习3
 * 使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
 */

let _average = (xs) => "$ " + fp.reduceRight(fp.add, 0, xs) / xs.length; // <- 无需改动
let averageDollarValue = (cars) => {
  let dollar_values = fp.map((car) => car.dollar_value, cars);
  return _average(dollar_values);
};

// -------------------- ANSWER START --------------------
averageDollarValue = fp.flowRight(
  _average,
  fp.map((c) => c.dollar_value)
);
console.log("Average Value of cars: ", averageDollarValue(cars));
// --------------------  ANSWER END  --------------------

/**
 * 练习4
 * 使用fp.flowRight()写一个sanitizeNames()函数
 * 返回一个下划线链接的小写字符串，把数组中的name转换为这种形式↓
 * 例如：sanitizeNames(["Hello World"])=>["hello_world"]
 */

let _underscore = fp.replace(/\W+/g, "_"); // <- 无需改动，并在sanitizeNames中使用它

// -------------------- ANSWER START --------------------
const sanitizeNames = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower));

console.log(sanitizeNames(["Hello World", "Something Else BLAH"]));
// --------------------  ANSWER END  --------------------
