//1
var myvar = 'my value';
(function(){
    console.log(myvar);  //undefined
    var myvar = 'local value'; 
})()

//2
function Person(name){
    this.name = name;
}
Person.prototype.age = 20;
Person.prototype.award = [];

var jack = new Person('jack');
var rose = new Person('rose');

jack.age++;
rose.award.push('oscar');
console.log(rose.age); //20
console.log(jack.award);//['oscar']

//3.请编写formatNum 函数，将数字格式化为金额格式，每三位数加入逗号：
    var money = 34782632;
    //添加方法 money.formatNum(),输出“34,782,632”
    Number.prototype.formatNum = function(){
        if(Object.prototype.toString.call(this)!=='[object Number]'){
            throw new Error('type error');
        }
        var NumArr = String(this).split('').reverse();
        var len = NumArr.length;
        var arr = [];
        for(var i=0;i<Math.floor(len/3);i++){
            arr.push(NumArr.splice(0,3).reverse().join(''));
        }
        arr.push(NumArr.reverse().join(''));
        return arr.reverse().join(',');
    }
    console.log(money.formatNum());
 
//4.扩展console.log 方法，使其输入带赢自增序号
function extendLog(){
    var index = 1;
    var log = console.log;
    return function(){
        arguments[0] = index + ':' + arguments[0];
        log.apply(this,arguments);
        index ++;
    }
}
console.log = new extendLog();
console.log('foo'); //1:foo
console.log('bar'); //2:bar

//5.实现一个函数 输出结果如下
/**
 * f(1).value == 1;
 * f(1)(2).value == 5;
 * f(1)(2)(3).value == 14;
 * 
 * 请找出规律，支持对任意多个数进行计算
 */
var f = function (a){
    arguments.callee.value = a*a;
    var callee = arguments.callee;
    var func = function(b){
        callee.value += b*b;
        arguments.callee.value = callee.value;
        return func;
    }
    func.value = callee.value;
    return func
}
console.log(f(1).value);
console.log(f(1)(2).value);
console.log(f(1)(2)(3).value);