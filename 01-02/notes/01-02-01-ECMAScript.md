# ECMAScript

- 它是脚本语言，简称 ES
- JS 是 ES 的扩展语言，ES 提供了基本语法，如：怎样定义变量、函数等，JS 囊括了 ES 语法和 web API

## ES6 === ES2015

ES6 有时泛指所有的 ES5 之后的新特性，所有的新特性可以在[这](http://www.ecma-international.org/ecma-262/6.0)找到.

新特性分为 4 大类：

1. 解决原有语法上的问题和不足(let, const)
2. 增强原有语法(解构、展开、参数默认值、末班字符串)
3. 全新的对象、方法、功能(Promise, assign etc.)
4. 全新的数据类型和数据结构(symbol, set, map)

### 1. 解决原有语法上的问题和不足

**----- ES6 let 与块级作用域(Scope) -----**

- 全局作用域 global
- 函数作用域 function
- **块级作用于 block**（NEW）：block 即大括号包裹的区域，如使用 if、for 时

-> 通过 let 定义的变量只能在 block 中使用，外部无法访问，使声明变量更安全。

```js
let i = 9;
for (let i = 0; i < 3; i++) {
  let i = 8;
  console.log(i);
}
// 输出3次8
// 括号中用let定义的变量只能在括号中被访问
```

-> let 变量被声明之前无法被调用（会报错），而 var 可以不过值为 undefined（不会报错）

**----- ES6 const -----**

-> const 声明过后变量无法被修改，但可以修改用 const 声明的 obj 内的键值对

-> let 可以不设置初始值，const 不可以

**----- ES6 数组和对象的解构 -----**

```js
const arr = [100, 200, 300]
const [foo, ...rest] = arr;
console.log(rest);
// [200, 300]
×××××××
const [...prev, foo] = arr;
console.log(prev);
// Uncaught SyntaxError: Rest element must be last element
```

**----- ES6 字符串 -----**

#### 模板字符串

```js
const str = `hello,

this is a \`string\``;
// 可以换行
```

-> 也可以嵌入变量`${value}`

-> 带标签的模板字符串：可用于制作多语言支持、检查文本中的不安全字符、实现小型模板引擎等

```js
const name = "tom";
const gender = true;

function myTagFunc(strings) {
  console.log(strings);
}
function myTagFunc2(strings, name, gender) {
  const sex = gender ? "man" : "woman";
  return strings[0] + name + strings[1] + sex + strings[2];
}
const result = myTagFunc`hey, ${name} is a ${gender}.`;
// => [ 'hey, ', ' is a ', '.' ]

const result2 = myTagFunc2`hey, ${name} is a ${gender}.`;
console.log(result2);
// => hey, tom is a man.
```

#### 字符串的扩展方法

- includes()
- startsWith()
- endsWith()

-> **便捷了字符串查找**

**----- ES6 参数 default parameters -----**

#### 参数默认值

带有默认值的形参需被定义在最后，否则无法正常工作 ↓ （_在以后的版本会进行修复_）

```js
const test = (a = 2, b) => {
  console.log(b);
};
test();
// Uncaught SyntaxError: Identifier 'test' has already been declared
```

#### spread 展开参数

```js
const arr = [100, 200, 300];
console.log(...arr);
// => 100, 200, 300
```

**----- ES6 箭头函数的 `this` -----**

箭头函数不会改变`this`的指向，也就是说箭头函数外面的`this`是什么，箭头韩里面的`this`就是什么。而用`function`定义的函数内`this`是指向函数的。

```js
const person = {
  name: "Tom",
  sayHiFunc() {
    console.log(`sayHiFunc: Hi ${this.name}`);
  },
  sayHiArrow: () => console.log(`sayHiArrow: Hi ${this.name}`),
  sayHiFuncArrow() {
    () => console.log(`sayHiFuncArrow Hi ${this.name}`);
  },
  sayHiFuncArrowTime() {
    setTimeout(() => console.log(`sayHiFuncArrow Hi ${this.name}`), 1000);
  },
};

person.sayHiFunc(); // sayHiFunc: Hi Tom
person.sayHiArrow(); // sayHiArrow: Hi
person.sayHiFuncArrow(); // undefined
person.sayHiFuncArrowTime(); // 延迟1秒后 sayHiFuncArrow Hi Tom
```

**----- ES6 计算属性名 -----**

直接在声明对象时使用方括号作为`key`来声明变化的键：`[变化中的key]: value`

**----- ES6 Object 对象的扩展方法 -----**

#### `Object.assign`

将多个源对象中的属性赋值到一个目标对象中：

```js
const origin = {
  1: "toCover",
  2: "copied",
};

const target = {
  1: "covered",
  3: "stay",
};

const resultObj = Object.assign(target, origin);

console.log(resultObj); // { 1: 'toCover', 2: 'copied', 3: 'stay'}
console.log(target); // { 1: 'toCover', 2: 'copied', 3: 'stay'}
console.log(resultObj === target); // true
```

-> 可以用于深度拷贝：`const newObj = Object.assign({}, oldObj)`

#### `Object.is`

```js
console.log(
  0 == false, // true
  Object.is(0, false), // false

  +0 === -0, // true
  Object.is(+0, -0), // false

  NaN === NaN, // false
  Object.is(NaN, NaN) // true
);
```

-> 大部分时候还是建议使用严格相等号`===`

**----- ES6 代理 Proxy/Object.defineProperty -----**

#### 用 Proxy 实现(控制)对象的数据响应

```js
const person = {
  name: "don",
  age: 20,
};

const personProxy = new Proxy(person, {
  get(targetObj, key) {
    return key in targetObj ? targetObj[key] : "default";
  },
  set(targetObj, key, value) {
    if (key === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an integer`);
      }
    }
    targetObj[key] = value;
  },
});

console.log(personProxy.name); // 'don'
console.log(personProxy.xxxx); // 'default'
personProxy.age = 100;
console.log(personProxy.age); // 100
personProxy.age = "male"; // 'TypeError: male is not an integer'
```

#### `Proxy`相对于`defineProperty`的优势

1. `definePerperty`只能监视属性的读写，而`Proxy`可以监视更多对象操作，因为它封装了很多对于对象的操作，如：删除操作、apply 调用函数等，更多点[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
2. `Proxy`更好地支持对于数组对象的监视（重写数组的操作方法）

```js
const list = [];

const listProxy = new Proxy(list, {
  set(targetList, key, value) {
    console.log("set", key, value);
    target[key] = value;
    return true; // 表示设置成功
  },
});

listProxy.push(100);
// set 0 100
// set length 1
```

3. Proxy 以非侵入的方式监管了对象的读写（慢慢体会。。。）

**----- ES6 let -----**

**----- ES6 let -----**

**----- ES6 let -----**

**----- ES6 let -----**
