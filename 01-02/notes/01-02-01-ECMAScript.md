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

## ----- ES6 let 与块级作用域(Scope) -----

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

## ----- ES6 const -----

-> const 声明过后变量无法被修改，但可以修改用 const 声明的 obj 内的键值对

-> let 可以不设置初始值，const 不可以

## ----- ES6 数组和对象的解构 -----

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

## ----- ES6 字符串 -----

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

## ----- ES6 参数 default parameters -----

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

## ----- ES6 箭头函数的 `this` -----

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

## ----- ES6 计算属性名 -----

直接在声明对象时使用方括号作为`key`来声明变化的键：`[变化中的key]: value`

## ----- ES6 Object 对象的扩展方法 -----

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

## ----- ES6 代理 Proxy/Object.defineProperty -----

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

1.`definePerperty`只能监视属性的读写，而`Proxy`可以监视更多对象操作，因为它封装了很多对于对象的操作，如：删除操作、apply 调用函数等，更多点[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 2.`Proxy`更好地支持对于数组对象的监视（重写数组的操作方法）

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

3.Proxy 以非侵入的方式监管了对象的读写（慢慢体会。。。）

## ----- ES6 Reflect -----

Reflect 有所有 Proxy 的功能，但区别在于 Reflect 使用静态方法与对象交互。

```js
const obj = {
  name: "don",
  age: 18,
};

const proxy = new Proxy(obj, {
  get(target, key) {
    // Proxy中的实例方法默认调用Reflect相应的方法。
    return Reflect.get(target, key);
  },
});
```

Reflect 为标准化的对象交互指令，是未来 ES 的发展方向。

### 新老对比：

```js
// BEFORE:
// console.log('name' in obj)
// console.log(delete obj['age])
// console.log(Object.keys(obj))

// NOW:
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age))
console.log(Reflect.ownKeys(obj))
```

## ----- ES6 `class`的继承 `extends` -----

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name);
    this.number = number;
  }

  sayHello() {
    super.sayHi();
    console.log(`My student number is ${this.number}`);
  }
}

const joe = new Student("Joe", 15);
joe.sayHello();
```

## ----- ES6 `Set` 数据结构 -----

#### `Set`与`Array`类似，但`Set`是一个值不会重复的`Array`，并且有很多它自己的方法。

```js
const s = new Set();

s.add(1).add(2).add(3).add(3).add(2);

console.log(s); // Set { 1, 2, 3}
```

-> `Set`可以作为`iterator`

```js
s.forEach((i) => console.log(i));

for (let i of s) {
  console.log(i);
}
```

-> 其他`Set`的方法

```js
console.log(s.size);
// 相当于Array.length

console.log(s.has(100));
// 有没有这个值

s.clear();
console.log(s);
// 清除所有数组中的元素
```

-> 最常用的情况就是对于 Array 中的元素去重：将`arr`传入`new Set(arr)`，然后再 spread 在`[...new Set(arr)]`中就是一个无重复值的数组了。

## ----- ES6 Map 数据结构 -----

-> 真正意义上的对象键值对集合。可以用任意类型的数据作为键，而对象只能使用字符串作为键

```js
const m = new Map();

cosnt tom = { name: 'tom' };

// 将tom作为键，90作为值传入Map数据obj中
m.set(tom, 90);

console.log(m)
// Map { { name: 'tom'} => 90 }

// 同样可以使用数据交互方法
console.log(m.get(tom))
// 90

m.has() // 判断
m.delete() // 删除
m.clear() // 清除

m.forEach(value, key) => console.log(value, key)
// 90 { name: 'tom' }
```

## ----- ES6 Symbol 数据结构 -----

为了让对象的属性名称（字符串）或变量名称不发生冲突，独一无二的 Symbol 诞生了：

```js
const s = Symbol();
console.log(s); // Symbol()
console.log(typeof s); // Symbol
console.log(Symbol() === Symbol()); // false 永远不发生重复
```

-> `Symbol()`可传入参数作为区分：`Symbol('foo')`

-> 对象的属性名称可以用`Symbol`表示，甚至可以使用‘计算属性名’的方式创建某对象的私有成员，如：

```js
const name = Symbol();
const person = {
  [name]: "don",
  say() {
    console.log(this[name]);
  },
};

person[Symbol()]; // undefined
// 因为不可能生成和定义name时一样的Symbol，所以不可能直接访问某些参数

// 但还是可以用其他方法获取的 if you know where to look
person[name]; // "don"

person.say(); // don
```

-> `Symbol.for(x)` 系统内部会维护一个全局注册表，只要`x`这个字符串是一样`Symbol`值也就是一样的，但需要注意的是`x`如果不是字符串会被自动转换成字符串，那么这便使`Symbol.for(true) === Symbol.for('true')`成为一个不严谨的 bug。使用时需要注意

-> `Symbol`类的静态方法有很多，可以便利开发，如：`Symbol.iterator`、`Symbol.hasInstance`等

-> 为对象设置`toString`标签

```js
const obj = {};
console.log(obj.toString()); // [Object Object]
```

=>

```js
const obj = {
  [Symbol.toStringTag]: "XObject",
};
console.log(obj.toString()); // [Object XObject]
```

-> 在对象中使用`Symbol`作为`key`时，一般方法无法获取该`key`的值

```js
const obj = {
  [Symbol()]: "symbol value",
  foo: "something",
};

for (var key in obj) {
  console.log(key);
}
// foo

console.log(Object.keys(obj));
// ['foo']

console.log(JSON.stringify(obj));
// {"foo":"normal value"}
```

以上情况`Symbol()`为`key`的属性都会被忽略。这些特性使得`Symbol`特别适合作为对象的私有属性。

-> 在对象中获取`Symbol`作为`key`的属性 `Object.getOwnPropertySymbols(obj)`

## ----- ES6 BigInt -----

未来会有`BigInt`数据类型来储存更长的数字。目前处在`stage-4`阶段。

## ----- ES6 循环 -----

`for`：遍历普通数组  
`for...in`：遍历键值对  
`Array.forEach`：遍历数组  
全新的：

### `for...of`：遍历所有数据的统一方式

-> 可以用`break`来终止遍历循环

-> 可用来直接遍历数组、Set、Map 数据类型

-> 在遍历对象时需自己添加可迭代（Iterable）接口：

## ----- ES6 迭代器 `iterator` -----

在浏览器 console.log 以下实例会发现  
`Array`, `Set`, `Map`  
它们都有一个共同的方法叫`Symbol(Symbol.iterator): ƒ values()`

所有可迭代对象(可以被遍历、可以使用`for...of`的对象)中必须有一个“可迭代接口”，即：迭代器

```js
const arr = ["foo", "bar", "baz"];
const iterator = arr[Symbol.iterator](); // 一个迭代器对象：一个带有next方法的对象
iterator.next(); // {value: "foo", done: false}
iterator.next(); // {value: "bar", done: false}
iterator.next(); // {value: "baz", done: false}
iterator.next(); // {value: undefined, done: true}
```

### 实现可迭代接口

```js
// 可迭代对象
const obj = {
  store: ["foo", "bar", "baz"],
  store2: ["some", "thing", "else"],

  // 外部使用时不需要知道内部的数据结构，只需使用这个接口
  each: function (callback) {
    const all = [...store, ...store2];
    for (const item of all) {
      callback(item);
    }
  },
  // 使用时：obj.each((i) => console.log(i))

  // 可迭代接口：在语言层面实现迭代
  [Symbol.iterator]: function () {
    let index = 0;
    // -- next中的this并不指向obj对象，所以要把this存在一个变量中给next调用
    const self = this;
    // 返回一个带有next方法的对象
    return {
      // 返回一个迭代结果
      next: function () {
        const result = {
          value: self.store[index],
          done: index >= self.store.length,
        };
        index++;
        return result;
      },
    };
  },
};

for (const item of obj) {
  console.log(item);
}
```

-> **以上事例中`each`方法只适用于本对象，而“迭代接口”是 ES6 在语言层面上解决对象迭代的方法，我们只需编写方法，明确迭代逻辑即可**

## ----- ES6 生成器 `generator` -----

在复杂的异步代码中减少嵌套，提高代码可读性，生成器特性：

- 定义语法：需要用星号定义对象，用`yield`返回值（与`return`的功能相似）
- 执行语法：`const generator = 生成器函数()`，需`generator.next()`这样执行获得下一个`yield`的结果，并暂停，知道下一个`next()`被运行，直到这个函数完全结束（当`{value: undefined, done: true}`时）

```js
function* foo() {
  console.log("don");
  yield 1;
  console.log("lee");
  yield 2;
}

const result = foo();
console.log(result.next()); // don { value: 1, done: false }
console.log(result.next()); // lee { value: 1, done: false }
console.log(result.next()); //     { value: undefined, done: true }
// 迭代结果为一个对象
```

### 生成器案例：发号器

```js
function* createIdMaker() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idMaker = createIdMaker();
console.log(idMaker.next()); // 1
console.log(idMaker.next()); // 2
console.log(idMaker.next()); // 3
```

### 生成器案例：用生成器实现普通对象的迭代

```js
const todos = {
  life: ["eat", "drink", "sleep"],
  learn: ["coding", "cooking", "swimming"],
  work: ["programming", "watering"],

  // 使用迭代器模式实现遍历：
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn, ...this.work];
    let index = 0;
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length,
        };
      },
    };
  },

  // 使用生成器模式：
  [Symbol.iterator]: function* () {
    const all = [...this.life, ...this.learn, ...this.work];
    for (const item of all) {
      yield item;
    }
  },
};
console.log(Object.getOwnPropertyDescriptor(todos));
for (const item of todos) {
  console.log(item);
}
```

## ----- ES2016 -----

小版本发布，发布于 2016 年 6 月：

- `Array.prototype.includes`，从此不用再使用`Array.indexof`：`includes`可以用来查找`NaN`
- 指数运算符，从此可不使用`Math.pow(2, 10)`，在语言层面增加的运算符

## ----- ES2017 -----

ECMAScript 的第八个版本， 发布于 2017 年 6 月：

- `Object.values`：value[]
- `Object.entries`：键值对[]
- `Object.getOwnPropertyDescriptors`：深度解析对象中每一个键的值

  ```js
  const p1 = {
    fn: "don",
    ln: "lee",
    get fullname() {
      return this.fn + " " + this.ln;
    },
  };
  // 这种有getter，setter的对象，如果使用Object.assign({}, p1)则会复制`fullname`的返回值而不是函数本身

  // 这时需要进行深度解析这个对象的键的值：
  const descriptors = Object.getOwnPropertyDescriptors(p1);
  console.log(descriptors);
  // {
  //   fn: {...},
  //   ln: {...},
  //   fullName: {
  //     get: [Function: get fullName],
  //     set: undefined,
  //     ...
  //   }
  // }

  // 然后再把这个解析结果赋值给新的对象
  const p2 = Object.defineProperties({}, descriptors);
  // 这个新的对象就可以正常使用getter和setter了，因为拷贝的是fullName这个function本身，而非它的结果
  ```

- `String.prototype.padStart`：参数1：设置字符串的总位数，参数2：不满足设置的位数时拿什么填充
- `String.prototype.padEnd`：`padStart`填充在最前面，`padEnd`填充在最后面

  ```js
  const books = {
    html: 5,
    css: 12,
    javascript: 128,
  };
  

  for (const [name, count] of Object.entries(books)) {
  console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
  }

  // html------------|005
  // css-------------|012
  // javascript------|128
  ```

- 在函数参数中添加尾逗号

