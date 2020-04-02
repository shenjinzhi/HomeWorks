/* 1、点击加号，小记单价*点击次数；商品共合计+点击次数；
 * 2、点击减号，小记单价-点击次数*单价；商品共合计-点击次数；
 * 
 * 3、商品共合计=总+号点击数-总减号点击数
 * 4、总花费 = 小记之和
 * 5、最贵的商品：if循环比较
 */

let list = document.querySelectorAll('.list li');
let info = document.querySelectorAll('.info em');

for (let i = 0; i < list.length; i++) {
    let listI = list[i].querySelectorAll('.list li i'),
        listEm = list[i].querySelector('.list li em'),
        listStrong = list[i].querySelectorAll('.list li strong');

    let num = 0;

    listI[1].onclick = function () {
        num++;
        listEm.innerHTML = num;
        add = parseFloat(listStrong[0].innerHTML) * num;
        listStrong[1].innerHTML = `${add}元`;
        sum();
    }
    listI[0].onclick = function () {
        num--;
        num < 0 ? num = 0 : null;
        listEm.innerHTML = num;
        sub = parseFloat(listStrong[0].innerHTML) * num;
        listStrong[1].innerHTML = `${sub}元`;
        sum();
    }

}
function sum() {
    let total = 0;
    let allPrice = 0;
    let ary = [0];
    for (let j = 0; j < list.length; j++) {
        let listEm = list[j].querySelector('em');
        let listStrong = list[j].querySelectorAll('strong');

        total += Number(listEm.innerHTML);
        allPrice += parseFloat(listStrong[1].innerHTML);
        if (Number(listEm.innerHTML) >= 1) {
            ary.push(parseFloat(listStrong[0].innerHTML))
        }
    }
    ary.sort((a, b) => b - a);
    info[0].innerHTML = total;
    info[1].innerHTML = allPrice;
    info[2].innerHTML = ary[0];
    console.log(ary)
}


