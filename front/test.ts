// 接口和接口继承
interface IPet {
    name: string
}

interface IAnimal {
    favorites?: string[]
}
// ICat 类型继承自 IPet 及 IAnimal, 因此也拥有字符串类型的 name 属性
// 以及 字符串数组类型的favorites 属性
interface ICat extends IPet, IAnimal {
    color: string
}
// 高级类型
// 某个类型只是其他类型的别名
type NumberArray = Array<number>
// const numberList: Array<number> = [1, 3, 10, 20]
const numberList: NumberArray = [1, 3, 10, 20]

type CatArray = Array<ICat>
const catList: CatArray = [
    // ...
]
// ICat作为一种“类型参数”被传递，在TS中被称为泛型(generic) ———— 一种泛指的类型变量

// 面向类型的编程

// 并集 union， 在TS中使用或运算符 “|”代表这种关系
let value: number | string = 100
value = '100'

interface IApple {
    name: string;
    color: string
}
interface IBanana {
    name: string;
    length: number
}
//  fruit 的类型是多个（复杂）类型的并集, 至少符合其中一个类型
let fruit: IApple | IBanana | undefined = {
    name: 'cc',
    color: 'dd',
    length: 1
}

// 交集 intersection, 在TS中使用与运算符 “&” 代表这种关系，必须符合所有类型
type IAppleBanana = IApple & IBanana
const ab: IAppleBanana = {
    name: 'ab',
    color: 'red',
    length: 10
}

// 类型索引
// 关键字keyof可以获得一种类型（通常是接口）下所有的键构成的集合

// 声明接口，满足该接口声明的对象必然具有x, y属性
interface IPoint {
    x: number;
    y: number;
    type: string
}

// 使用关键字 keyof 获得 IPoint 的全部 key 组成的合集
// 相当于 type IKeyofPoint = 'x' | 'y' | 'type'
type IKeyofPoint = keyof IPoint;

// 既然有了“键”，就可以通过 [] 运算符获取“值”
// 相当于 IValueOfPoint = string | number
type IValueOfPoint = IPoint[IKeyofPoint]

// 从 IPoint 里取特定的键值
function getValueFromPoint(obj: IPoint, key: IKeyofPoint): IValueOfPoint {
    return obj[key];
}

// 使用泛型可以使得上述方法用于不同的对象，实现一些更通用的声明：
// 只使用一个泛型 T
function getValues<T>(obj: T, keys: Array<keyof T>) {
    return keys.map(key => obj[key]);
}

// 使用两个泛型 T、K， 其中 K 必须要从类型 “keyof T” 继承而来，并且输出类型与原类型一一对应
function plunk<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key]);
}

const apple: IApple = {
    name: 'apple',
    color: 'red'
}

const appleValues = plunk(apple, ['name', 'color'])

console.log(appleValues, '======'); // // ['apple', 'red']

// 类型映射 Mapped Types
// 关键字 in 可以用来约束类型是否属于某个类型集合

// 将泛型 T 的所有键都标记为非必须（？）
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }
// 标识符“Partial”重复。ts(2300)
// lib.es5.d.ts(1471, 6): 此处也声明了 "Partial"。

// Partial<IPoint> 是 IPoint 的键值对非必须版本，相当于 { x? number; y?: number; type?: string }
const p0: Partial<IPoint> = {
    x: 200,
    y: 300
}

// 将泛型 T 的所有键都去除掉非必须（-？）
type Required<T> = {
    [P in keyof T]-?: T[P]
}
// 标识符“Required”重复。ts(2300)
// lib.es5.d.ts(1478, 6): 此处也声明了 "Required"。


const p1: Required<Partial<IPoint>> = {
    x: 100,
    y: 100,
    type: 'rect'
}

// 从泛型 T 的所包含的键值类型中选择若干，并构成一个新的类型
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
// 标识符“Pick”重复。ts(2300)
// lib.es5.d.ts(1492, 6): 此处也声明了 "Pick"。

// Pick<IPoint, 'x' | 'y'> 从 IPoint 中选择 'x' 和 'y' 组成新的对象类型， 相当于 {x: number, y: number}
const p2: Pick<IPoint, 'x' | 'y'> = {
    x: 200,
    y: 300
}

// 条件类型 可以通过某类型（泛型）进行类型条件运算推断
// 类型FruitType<T> 实际类型由泛型推断而来
// 如果 T 满足 number 类型的约束，则返回 IApple 类型，否则返回 IBanana 类型
type FruitType<T> = T extends number ? IApple: IBanana
// f 被推断为IApple对象
const f: FruitType<123> = {
    name: 'apple',
    color: 'red'
}

// 条件类型 和 泛型 组合使用
// 定义连个union类型
type ICollectionA = 100 | 'abc' | null
type ICollectionB = undefined | 'null'

// 从泛型 T 中过滤选择出能够满足 泛型 U 约束的类型
// 注意这里和直观的认知不同，并不是真的返回完整的 T 类型，而是返回 T 类型中满足 U 约束的类型
type Filter<T, U> = T extends U ? T : never

// 从100 | 'abc' | null 中过滤出满足 undefined | null 的类型，即 null
type INull = Filter<ICollectionA, ICollectionB>

// 与 Filter 刚好相反，从泛型 T 中剔除能够满足泛型 U 约束的类型
type Exclude<T, U> = T extends U ? never : T
// 标识符“Exclude”重复。ts(2300)
// lib.es5.d.ts(1506, 6): 此处也声明了 "Exclude"。

// 从 100 | 'abc' | null 中排除掉满足 undefined | null 的类型，即 100 | 'abc
type IDefined = Exclude<ICollectionA, ICollectionB>

// 与Pick<T, K> 正好相反，从 T 中去除 K 包含的类型
// 先把 T 对象中的所有键类型罗列出来，并从中移除满足 K 约束的，再利用 Pick 将剩余的键类型保留为新的对象类型
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// 标识符“Omit”重复。ts(2300)
// lib.es5.d.ts(1516, 6): 此处也声明了 "Omit"。

const IXY: Omit<IPoint, 'type'> = {
    x: 100,
    y: 100,
}


// 具体使用场景
// 对外暴露的类型，指示用户配置项的每一个属性都是可选的
export interface IOptions {
    uid: number;
    name: string;
}
// 对外暴露的方法
export function useModules(options?: IOptions) {
    const opt: Required<IOptions> = {
        uid: 0,
        name: 'none',
        ...options
    }
    // 后续使用 opt 时，都可以认为每个属性都存在
}
