function *a(){
	var p =new Promise((resolve,reject)=>{
		resolve(1)
	})
	var res=yield p
	// console.log(res)
	yield res
}
var g=a()
var res
console.log(res=g.next())
console.log(g.next(1))
