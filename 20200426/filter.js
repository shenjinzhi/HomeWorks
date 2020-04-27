
/**
 * myFilter
 *  @params:
 *      callback，thisArg;
 *  @return:
 *      新数组
 * by shenjinzhi 20200426
 */
(proto => {
    function myFilter(callback, thisArg = window) {
        // callback 是函数处理
        if (callback && typeof callback === "function") {
            // 循环处理数组每一项
            let res = [];
            for (let i = 0; i < this.length; i++) {
                let ary = callback.call(thisArg, this[i], i, this)
                if (ary) {
                    res.push(this[i])
                }
            }
            return res;
        } 
    }
    proto.myFilter = myFilter;
})(Array.prototype)




/* 测试1
 */
function callback(item, index, array) {
    console.log(item, index, array)
    return item > 1;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let newArr = arr.filter(callback)
console.log(newArr);

let newArr2 = arr.myFilter(callback);
console.log(newArr2);


/**
 * 测试2
 */
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
function filterItems(query) {
    return fruits.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']


function filterItems(query) {
    return fruits.myFilter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']