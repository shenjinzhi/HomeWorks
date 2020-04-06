let shopModule = (function () {
    let navList = document.querySelectorAll('.nav-item'),
        productBox = document.querySelector('.productBox'),
        data = null;

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                //console.log(data);
            };
        };
        xhr.send(null);
    };

    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                price,
                title,
                hot,
                time,
                img
            } = item;
            str += `<div class="card">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：¥${price.toFixed(2)}元</p>
                <p class="card-text">热度：${hot}</p>
                <p class="card-text">上架时间：${time}</p>
            </div>
            </div>`;
        });
        productBox.innerHTML = str;
    };

    let clear = function clear(){
        Array.from(navList).forEach(item=>{
            if(item !== this){
                item.flag = -1;
            }
        })
    };

    let handle = function handle() {
        [].forEach.call(navList, item => {
            item.flag = -1
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag
                })
                render();
            };
        })
    };

    return {
        init() {
            queryData();
            render();
            handle();
        }
    }
})();
shopModule.init();