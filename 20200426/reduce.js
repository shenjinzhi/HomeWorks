/**
 * myReduce
 *  @params:
 *      callback,initialValue
 *  @return:
 *      回调函数累计处理的结果
 * by shenjinzhi 20200426
 */

/* (proto => {
    function myReduce(callback, initialValue) {
        // callback 必须是函数
        if (callback && typeof callback === "function") {
            let res = null,
                num = 0;
            if (initialValue !== undefined) {
                res = initialValue;
            } else {
                // 空数组，抛错
                if (this.length === 0) throw new TypeError();
                res = this[0];
                num = 1;
            }
            for (let i = num; i < this.length; i++) {
                res = callback(res, this[i], i, this);
            }
            return res;
        }
    }
    proto.myReduce = myReduce;
})(Array.prototype) */

Array.prototype.myReduce = function _reduce(callback, value) {
    // callback
    if (typeof callback !== 'function' || typeof callback === 'function' && typeof callback.nodeType === 'number') {
        throw new TypeError('callback不是一个函数');
    }

    if (this.length === 0 && value === undefined) {
        throw new TypeError('类型错误');
    }

    if (this.length === 1 && value === undefined || this.length === 0 && value !== undefined) {
        return value === undefined ? this[0] : value;
    }
    //不传第二个参数 直接从第二项开始循环并且循环第一项的时候，让回调函数的第一项是数组中索引为0的项

    if (value === undefined) {
        for (let i = 1; i < this.length; i++) {
            i === 1 ? value = this[0] : null;
            value = callback(value, this[i]);
        }
    } else {
        for (let i = 0; i < this.length; i++) {
            value = callback(value, this[i]);
        }
    }
    return value;
}

/* 测试一： 
 */
function callback(accumulator, currentValue, currentIndex, array) {
    return accumulator + currentValue;
};

let arr = [0, 1, 2, 3, 4, 5, 8, 7, 8, 9];
let res = arr.reduce(callback);
console.log(res);
let res2 = arr.myReduce(callback);
console.log(res2);

/* 测试二： 
 */
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function (a, b) {
        return a.concat(b);
    },
    []
);
console.log(flattened);
var flattened = [[0, 1], [2, 3], [4, 5]].myReduce(
    function (a, b) {
        return a.concat(b);
    },
    []
);
console.log(flattened);

/* 测试三：
 */
var initialValue = 0;
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    , initialValue
);
console.log(sum) // logs 6

var initialValue = 0;
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].myReduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    , initialValue
);
console.log(sum) // logs 6

