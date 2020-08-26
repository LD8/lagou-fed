# 模块二： ES 新特性与 TypeScript、JS 性能优化

## 一、请说出下列最终的执行结果，并解释为什么

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();
```

### 结果会是`10`

- 使用 var 声明的变量为全局变量，i

## 二、请说出下列最终的执行结果，并解释为什么

```js
var tmp = 123;

if (true) {
  console.log(tmp);
  let tmp;
}
```

### 结果是`Uncaught ReferenceError: Cannot access 'tmp' before initialization`

- let 是 block 级声明，它的引用只在此 block 中可达
- 一个 block 中用 let 声明 tmp 后，全局的 tmp 在此 block 中就无法被引用（不可达）
- let 声明的变量在其被声明之前无法被引用，不会像 var 声明的变量一样显示 undefined

## 三、结合 ES6 新语法，用最简单的方式找出数组中的最小值

```js
var arr = [12, 34, 32, 89, 4];
console.log(arr.sort((a, b) => a - b)[0]);
```

## 四、请详细说明 var，let，const 三种声明变量的方式之间的具体差别

- 变量 scope 差别：var 是全局的，let 和 const 是块级的
- 变量属性：var 和 let 都是可以在声明后发生改变（重新被赋值）的，const 则不行，但是 const 在声明普通对象时，对象中的键值对却可以在后续被重新赋值
- 。。。

## 五、请说出下列代码最终输出的结果，并解释为什么

```js
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    });
  },
};
obj.fn();
```

### 结果是 20

- this 指向 obj
- 即便没有 setTimeout 的话输出结果也是 20，原因同上

## 六、简述 symbol 类型的用途

## 七、说说什么是浅拷贝，什么是深拷贝

## 八、请简述 TypeScript 与 JavaScript 之间的关系

## 九、请谈谈你所认为的 TypeScript 的优缺点

## 十、描述引用计数的工作原理和优缺点

## 十一、描述标记整理算法的工作流程

## 十二、描述 V8 引擎中新生代存储区垃圾回收的流程

## 十三、描述增量标记算法在合适使用及工作原理
