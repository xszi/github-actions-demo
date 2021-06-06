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
//  fruit 的类型是多个（复杂）类型的并集
let fruit: IApple | IBanana | undefined



