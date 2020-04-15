let fallsModule = (function () {
    // 获取元素
    let columns = Array.from(document.querySelectorAll('.column')),
        data = [];

    // 获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText)
                console.log(data);
            }
        }
        xhr.send(null);
    }

    // 渲染数据
    let bindHTML = function bindHTML() {
        data.map(item => {
            let w = item.width,
                h = item.height;
            item.width = 230;
            item.height = 230 * h / w;
            return item;
        })
        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            })
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            })
            group.forEach((item, index) => {
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<a href="${item.link}">
                    <div class="lazyImageBox" style='height:${item.height}px'>
                        <img src="" alt="" data-image="${item.pic}">
                    </div>
                    <p>${item.title}</p>
                </a>`
                columns[index].appendChild(card);
            })
        }
    }

    // 懒加载条件
    let lazyFunc = function lazyFunc() {
        let lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox'));
        lazyImageBoxs.forEach(item => {
            let load = item.getAttribute('isLoad');
            if (load) return;
            let T = utils.offset(item).top + item.offsetHeight / 2,
                H = document.documentElement.scrollTop + document.documentElement.clientHeight;
            if (T <= H) {
                lazyImg(item);
            }
        })
    }

    // 单张图片懒加载
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            template = new Image;
        template.src = dataImage;
        template.onload = function () {
            img.src = dataImage;
            utils.setCss(img, 'opacity', 1);
        }
        img.removeAttribute('data-image');
        template = null;
        lazyImageBox.setAttribute('isLoad', true);
    }

    let isRender;
    // 加载更多
    let loadMore = function loadMore() {
        let HTML = document.documentElement;
        if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
            if (isRender) return;
            isRender = true;
            queryData();
            bindHTML();
            lazyFunc();
            isRender = false;
        }
    }


    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                lazyFunc();
                loadMore();
            }
        }
    }
})()
fallsModule.init();