# TypeScript

### 强类型和弱类型语言

### 静态语言和动态语言

## Flow

安装:

```bash
$ yarn add flow-bin --dev
$ yarn flow init
$ yarn flow
$ yarn flow stop
```

- 需关闭 VSCode 的 JavaScript Validation 偏好选项。
- 需在 JS 代码第一行添加`// @flow`
- 需在最后移除类型注解，主流的有两种方法：

  1.`flow-remove-types`

```bash
$ yarn add flow-remove-types --dev
$ yarn flow-remove-types src -d dist
# 编码在src中，运行以上操作后
# 在dist文件中找到运行文件
```

2.`@babel/core @babel/cli @babel/preset-flow`

```bash
$ yarn add @babel/core @babel/cli @babel/preset-flow --dev
```

根目录下创建`.babelrc`配置文件

```js
// .babelrc
{
    "presets": ["@babel/preset-flow"]
}
```

命令行中：

```bash
$ yarn babel src -d dist
# 编码在src中，运行以上操作后
# 在dist文件中找到运行文件
```

### Flow 开发工具插件

VS Code 插件： `Flow Language Support`  
直接在编码时反应 TypeError。但需要在保存文件过后才会显示出现的问题。但是相比较上面几种在命令行，文件执行后才能发现错误来说，使用插件还是更方便的。

### Flow 原始类型

```js
// @flow
const b: number = Infinity; // NaN // 100
const e: void = undefined;
```

### Flow 数组类型

```js
// @flow
const foo: [string, number] = ["foo", 100];
// 固定长度数组，2个叫元祖
```

### Flow 特殊类型

`maybe`类型：

```js
// gender除了可以是数字以外还可以是空值（相当于：number | null | undefined）
const gender: ?number = null;
```

`mixed`类型相比较`any`类型来说是强类型，`any`是弱类型。`any`主要运用于旧代码的兼容，尽量少用。如果没有声明参数为`string`，声明参数为`mixed`后却调用了这个参数的`string`的方法，则会报错，除非做过`if`类型判断。所以说`mixed`还是强类型的任意类型。

- [Flow 所有类型的描述文档](http://flow.org/en/docs/types/)
- [第三方类型手册](https://www.saltycrane.com/cheat-sheets/flow-type/latest)：比较直观

### Flow 运行环境 API (浏览器/node 环境)

```js
// @flow
const element: HTMLElement | null = document.getElementById("app");
```

API 对应的声明文件的链接：

- [core.js](https://github.com/facebook/flow/blob/master/lib/core.js): Object, Array, JSON
- [dom.js](https://github.com/facebook/flow/blob/master/lib/dom.js): 不同环境的 API 声明
- [bom.js](https://github.com/facebook/flow/blob/master/lib/bom.js)
- [cssom.js](https://github.com/facebook/flow/blob/master/lib/cssom.js)
- [node.js](https://github.com/facebook/flow/blob/master/lib/node.js)

## TypeScript

- `TS === JS + 类型系统 + ES6+`，即：TS是JS的超集。最后会编译为 JS 在生产环境中使用。
- TS 的兼容性很好，可以选择编译为低版本的 JS。
- 任何一种 JS 运行环境都支持 TS
- 比`Flow`功能更强大，生态更健全、完善
- 很多长周期、大型开源项目建议使用 TS，如： Angular 和 Vue 3.0
- 学习成本较高，好在 TS 属于“渐进式”语言，了解一个特性使用一个
- 开发初期增加 Type 的投入较高

### 安装

```bash
$ yarn init --yes
$ yarn add typescript --dev
# 有tsc编译命令可以使用了
$ yarn tsc 文件目录/文件名
# 可编译为低版本的JS
```

### 配置文件

```bash
$ yarn tsc --init
```

```json
// tsconfig.json
{
    ...
    /* 有注释，无需记录 */
    "sourceMap": true, /* 隐射：方便调试源代码 */
    "outDir": "dist",
    "rootDir": "src",
}
```

有配置文件后，需直接使用`yarn tsc`

### 标准库

内置对象所对应的声明文件，在配置文件里的`lib`设置，需手动添加所有的库`["ES2015", "DOM"]`等。

### 中文错误消息

```bash
$ yarn tsc --locale zh-CN
```

也可以在 VSCode 的偏好设置里修改 VS 的 TS 提示

### 小写的`object`类型

```ts
const foo: object = function () {}; // {} // []
// object类型包括了非原始类型，而非仅仅指{}
```

### 枚举类型 `enum`

```ts
enum Something {
  value1, // 默认值为1
  value2, // 自动累加
  value3, // 自动累加
}
// 此时编译过后Something会成为双向键值对对象

const enum SomethingElse {
  value1,
  value2,
  value3,
}
// 此时编译过后，调用这个值的地方会被直接替换成值，SomethingElse不会被编译成双向键值对对象
```

### 抽象类

形容比较抽象的事物，是专门被其他类继承以后形成更具象的类而存在的。

如：

```js
abstract class Animal {
    eat (food: string):void {
        console.log(`Eating ${food}`)
    }
    // 抽象方法：使子类必须创建符合规范的方法
    abstract run (distance: number): void
}
// Animal抽象类无法使用new来创建实例对象
// Dog这个子类可以
class Dog extends Animal {
    run(distance: number): void {
        console.log(`Ran ${distance} yards`)
    }
}

const jack = new Dog()
jack.eat('grass')
jack.run(100)
```

### 泛型

为了复用代码，使定义的接口（Interface/Type）适用度更广。有些参数无法在定义时确认类型，用泛型代替后，在使用函数时定义、明确泛型。

```js
// 注意定义泛型的位置
// function createArrayInLength<T> (length: number, value: T): T[] {
const createArrayInLength = <T>(length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value);
    return arr;
}

// 注意使用泛型的位置
const array = createArrayInLength<number>(3, 100)
const array = createArrayInLength<string>(3, 'something')
```