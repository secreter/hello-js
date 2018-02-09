/**
 * 判断数组元素或元素的指定字段是否是唯一
 * @param  {array}
 * @param  {Function}
 * @return {bool}
 */
const isUnique=(list,callback=(x)=>x)=>{
	return list.reduce((set, item) => {
            return set.add(callback(item))
    }, new Set()).size===list.length
}
var a=[1,2,3,4,5,5]
var list=[{key:1},{key:2},{key:2}]
console.log(isUnique(list,(item)=>item.key))