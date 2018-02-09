/**
* koa 迭代器分析
*/
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose(middleware){
  return function *(next){
    if (!next) next = noop();

    var i = middleware.length;

    while (i--) {
      next = middleware[i].call(this, next);
    }
    //next=log2.call(this,noop())
    //next=log.call(this,log2.call(this,noop()))
    //next=log.call(this,log2.call(this,log3.call(this,noop())))
    //这里next是一个执行语句，会不断递归调用里面的生成器
    //但是就compose而言，只yield了一次，就执行了所有middleware

    return yield *next;                 //迭代器返回的是middleware里最后一个yield值
  }
}

/**
 * Noop.
 *
 * @api private
 */

function *noop(){}

function log(){
	return function *(next){
		console.log(111)
		yield *next
	}
}
function *log2(next){
	console.log(222)
	var result=yield *next                        //yield表达式的值是最终return的值
	console.log('result:',result)
}
function *log3(){
	console.log(333)
	yield 1
	return 'log3'
}
var middlewareCursorgenerator=compose([log(),log2,log3])
var middlewareCursor=middlewareCursorgenerator()
var a=middlewareCursor.next()                 //执行当前生成器的一次yield
console.log(a)
middlewareCursor.next()
// 111
// 222
// 333
// result: log3
// { value: undefined, done: true }


//yield 1
//-------------
// 111
// 222
// 333
// { value: 1, done: false }
// result: log3
