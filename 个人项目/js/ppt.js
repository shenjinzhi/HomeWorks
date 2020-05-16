let docerPpt = (function () {
    let data = null,
        contextBody = document.querySelector('.context-body'),
        contextList = Array.from(contextBody.querySelectorAll('.context-body-list'));

    // 数据请求
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', '../json/ppt.data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                data = Array.from(JSON.parse(xhr.responseText));
                //console.log(data);
            }
        }
        xhr.send();
    }

    // 渲染数据
    let handle = function handle(data) {
        for (let i = 0; i < data.length; i += 4) {
            let group = data.slice(i, i + 4);
            group.sort((a, b) => {
                return a.height - b.height;
            });
            contextList.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });

            group.forEach((item, index) => {
                // 解构
                let {
                    type,
                    height,
                    title,
                    typeIcon,
                    imgTop,
                    imgBottom1,
                    imgBottom2,
                    imgBottom3,
                    imgBottom4,
                    img

                } = item;
                let card = document.createElement("li");
                card.className = "context-body-item";

                let typeStr = `${type === 'ppt' ? `<div class="ppt-pic-item-box clear" style = "height:${height}px">
                <div class="box-pic-top">
                    <div class="lazyImageBox">
                        <img src="" alt="" data-image="${imgTop}">
                    </div>
                </div>

                <div class="box-pic-bottom">
                    <div class="lazyImageBox">
                        <img src="" alt="" data-image="${imgBottom1}">
                    </div>
                </div>

                <div class="box-pic-bottom">
                    <div class="lazyImageBox">
                        <img src="" alt="" data-image="${imgBottom2}">
                    </div>
                </div>

                <div class="box-pic-bottom">
                    <div class="lazyImageBox">
                        <img src="" alt="" data-image="${imgBottom3}">
                    </div>
                </div>

                <div class="box-pic-bottom">
                    <div class="lazyImageBox">
                        <img src="" alt="" data-image="${imgBottom4}">
                    </div>
                </div>
            </div>`: (type === 'word' ? `<div class="ppt-pic-item-box word-body" style = "height:${height}px"><div class="lazyImageBox">
            <img src="" alt="" data-image="${img}"></div>
        </div>`: (type === 'excel' ? `<div class="ppt-pic-item-box excel-body" style = "height:${height}px"><div class="lazyImageBox">
        <img src="" alt="" data-image="${img}"></div>  
    </div>`: null))}`;

                let maskStr = `<div class="ppt-mask" style = "height:${height}px">
                <div class="ppt-mask-bg">
                    <div class="mask-middle">
                        <p class="mask-icon"></p>
                        <p class="mask-down">
                            稻壳免费下载
                        </p>
                        <div class="mask-bottom clear">
                            <div class="mask-bottom-hot">
                                <svg><use data-v-b95da806="" xlink:href="#svg-hot-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="svg-hot-icon"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"></path><path fill="#CCC" fill-rule="nonzero" d="M11.03 4.893a.5.5 0 0 1 .86-.227C13.183 6.106 14 7.885 14 10c0 2.862-2.634 5.5-6.024 5.5C4.569 15.5 2 13.037 2 10.22c0-1.558.475-2.564 1.584-3.847.1-.116.723-.815.904-1.028l.143-.17c.702-.851.833-2.188.343-4.048A.5.5 0 0 1 5.57.513c1.614.372 2.927 1.22 3.922 2.534.787 1.039.984 2.304.614 3.767.443-.493.75-1.13.923-1.921zm-5.628.918l-.152.182c-.19.224-.818.927-.91 1.034C3.375 8.144 3 8.937 3 10.22c0 2.255 2.112 4.28 4.976 4.28C10.813 14.5 13 12.31 13 10c0-1.51-.478-2.824-1.279-3.95-.468 1.186-1.281 2.042-2.428 2.542a.5.5 0 0 1-.652-.67c.852-1.817.852-3.218.054-4.272-.686-.905-1.537-1.545-2.564-1.928.315 1.734.083 3.105-.729 4.09z"></path></g></svg>
                                </use></svg>
                                100592
                            </div>

                            <div class="mask-bottom-ye">
                                <svg><use data-v-b95da806="" xlink:href="#svg-pagesize-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="svg-pagesize-icon"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"></path><path fill="#CCC" fill-rule="nonzero" d="M10.5 1a.5.5 0 1 1 0 1h-7a.5.5 0 0 0-.5.5v9a.5.5 0 1 1-1 0v-9A1.5 1.5 0 0 1 3.5 1h7z"></path><path fill="#CCC" fill-rule="nonzero" d="M6 5v9h7V5H6zm0-1h7a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"></path></g></svg>
                                </use></svg>
                                共17页
                            </div>

                        </div>
                    </div>
                    
                    <div class="mask-type">
                        <i style="background: url(${typeIcon}) 50%;background-size: 100% 100%;"></i>
                    </div>
                </div>
                
            </div>`;

                let titleStr = `<div class="ppt-pic-title">
                <i class="ppt-title-icon">
                    <svg>
                        <use data-v-b95da806="" xlink:href="#svg-docerfree">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="svg-docerfree">
                                <g fill="none" fill-rule="evenodd">
                                    <path d="M0 0h16v16H0z"></path>
                                    <path fill="#EB4E2F" fill-rule="nonzero"
                                        d="M15 10.93c0 .914-.348 1.461-.919 1.782-2.95 1.723-4.632 2.717-5.045 2.983-.62.398-1.348.415-2.08 0a488.372 488.372 0 0 1-4.858-2.873c-1.08-.645-1.092-1.26-1.092-2.008s-.014-5.22 0-5.939c.014-.719.297-1.21.962-1.622C2.632 2.84 6.364.666 6.962.303c.597-.364 1.29-.442 2.069 0 .778.441 4.634 2.697 5.232 3.09.598.394.737.846.737 1.482v6.055z">
                                    </path>
                                    <path fill="#FFF"
                                        d="M6.09 5.321S4.376 7.003 4.578 8.916c.148 1.408 1.857 2.993 1.857 2.993s.536-.69.714-1.585c.18-.904-.091-1.206-.091-1.206s-1.074-1.171-.97-3.797zm1.06 6.585s.062-1.598 1.873-2.973c1.812-1.375 3.54-1.722 3.54-1.722s-.243 1.7-1.79 3.08c-1.548 1.382-3.623 1.615-3.623 1.615zm.617-2.73s1.268-1.123 1.516-3.054c.254-1.98-1.002-3.213-1.002-3.213S6.99 4.2 6.803 5.922c-.187 1.722.964 3.255.964 3.255z">
                                    </path>
                                </g>
                            </svg>
                        </use>
                    </svg>
                </i>
                <p>${title}</p>
            </div>`;


                card.innerHTML = typeStr + maskStr + titleStr;

                //console.log(contextList);
                contextList[index].appendChild(card);

            })
        };
    }

    // 图片延迟加载
    let lazyFunc = function lazyFunc() {
        let lazyImageBoxs = document.querySelectorAll(".lazyImageBox");
        [].forEach.call(lazyImageBoxs, item => {
            let isLoad = item.getAttribute('isLoad');
            if (isLoad === 'true') return;
            let B = utils.offset(item).top + item.offsetHeight / 2;
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop
            if (B <= A) {
                lazyImg(item);
            }
        });
    }
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        lazyImageBox.setAttribute('isLoad', 'true');
    }

    // 分类
    function classWord(data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.type !== "word") {
                data[i] = data[data.length - 1];
                data.length--;
                i--;
            }
        }
    }
    function classPpt(data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.type !== "ppt") {
                data[i] = data[data.length - 1];
                data.length--;
                i--;
            }
        }
    }
    function classExcel(data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.type !== "excel") {
                data[i] = data[data.length - 1];
                data.length--;
                i--;
            }
        }
    }
    let classification = function classification() {
        let navBody = document.querySelector('.p-body-nav'),
            navList = navBody.querySelectorAll('.p-body-nav-item');

        [...navList].forEach((itemList, indexList) => {
            let navItem = itemList.querySelectorAll('.item-list-item');

            [...navItem].forEach((item, index) => {
                item.onclick = function () {
                    // 清除其他
                    for (let i = 0; i < navItem.length; i++) {
                        navItem[i].className = 'item-list-item';
                    };
                    for (let i = 0; i < contextList.length; i++) {
                        contextList[i].innerHTML = '';
                    };
                    // 当前项加上
                    item.className = 'item-list-item active';

                    if (indexList === 0) {
                        if (index === 1) {
                            queryData();
                            classWord(data);
                            handle(data);
                            lazyFunc();
                            black;
                        }
                        if (index === 2) {
                            queryData();
                            classPpt(data);
                            handle(data);
                            lazyFunc();
                            black;
                        }
                        if (index === 3) {
                            queryData();
                            classExcel(data);
                            handle(data);
                            lazyFunc();
                            black;
                        } else {
                            queryData();
                            handle(data);
                            lazyFunc();
                            black;
                        }
                        black;
                    } else {
                        queryData();
                        handle(data);
                        lazyFunc();
                        black;
                    }

                }
            })
        });
    }

    // 按最新及下载量
    let newest = function newest() {
        let contextTitle = document.querySelector('.context-title'),
            downloadNum = contextTitle.querySelector('.zonghe'),
            h5 = downloadNum.querySelector('h5'),
            qingkong = contextTitle.querySelector('.qingkong');
        downloadNum.addEventListener('click', function (ev) {
            let target = ev.target,
                text = target.innerText;
            let h5Text = h5.innerText;
            //console.log(text);
            h5.innerText = text;
            ev.target.innerHTML = h5Text;
            if (h5.innerText !== '综合排序') {
                qingkong.className = 'zh';
            }
            for (let i = 0; i < contextList.length; i++) {
                contextList[i].innerHTML = '';
            };
            queryData();
            handle(data);
            lazyFunc();
            ev.stopPropagation();
        })
    };


    // 回到顶部
    let goTopModule = function goTopModule(st, ct) {
        let goBack = document.querySelector('.go-top');
        if (st >= ct) {
            goBack.style.display = "block";
        } else {
            goBack.style.display = "none";
        }
        goBack.onclick = function () {
            document.documentElement.scrollTop = 0;
        }
    }
    // 头部固定
    let fixedHeaderModule = function fixedHeaderModule(st, ct) {
        let fixedHeader = document.querySelector('#fixed-header');
        if (st >= 100) {
            fixedHeader.style.display = 'block';
        } else {
            fixedHeader.style.display = 'none';
        }
    }



    let inputModule = function inputModule() {
        // 获取元素
        let searchTab = document.querySelector('.search-tab'),
            headInput = document.querySelector('.head-input'),
            searchActive = searchTab.querySelector('.search-active'),
            searchChoose = searchTab.querySelector('.search-active-choose'),
            chooseList = searchChoose.querySelectorAll('.choose'),
            searchList = document.querySelector('.search-list'),
            searchInp = document.querySelector('.search-inp'),
            inpChoose = document.querySelector('.inp-choose'),
            inpChooseDl = inpChoose.querySelector('.inp-choose-dl'),
            iconDel = inpChooseDl.querySelector('.icon-del'),
            headInp = document.querySelector('.head-input');


        // 绑定点击事件
        searchTab.addEventListener('click', function tabBlock() {
            searchChoose.style.display = 'block';

        });
        searchChoose.addEventListener('click', function (ev) {
            let target = ev.target,
                text = target.innerText;
            searchActive.innerText = text;

            searchChoose.style.display = 'none';
            ev.stopPropagation();
            //console.log(ev); 
        });

        // 点击输入框
        headInp.addEventListener('click', function () {
            inpChoose.style.display = 'block';
            headInput.className = 'up-active';
        });
        window.addEventListener('click', function (ev) {
            //console.log(ev.target.className)
            if (ev.target.className === 'search-inp') return;
            if (ev.target.className === 'inp-choose') return;
            if (ev.target.className === 'inp-choose-dl') return;
            if (ev.target.className === 'icon-del') return;
            if (ev.target.className === 'inp-choose-dis') return;
            if (ev.target.className === 'inp-val-dd') return;
            inpChoose.style.display = 'none';
            headInput.className = 'head-input';
        })

        searchInp.addEventListener('keyup', function (ev) {
            let val = this.value;
            if (val && ev.keyCode === 13) {
                let ddd = document.createElement('dd');
                ddd.className = 'inp-val-dd';
                ddd.innerHTML = `<a href="#">${val}
                    <i></i>
                    </a>`
                inpChooseDl.appendChild(ddd);
                this.value = '';
            }
        })

        // 点击删除按钮未完成
        /* iconDel.onclick = function () {
            let dddd = inpChooseDl.querySelectorAll('.inp-val-dd');
            dddd.innerHTML = '';
            //debugger;
        } */
    }



    return {
        init() {
            inputModule();
            queryData();
            handle(data);
            lazyFunc();
            classification();
            newest();
            window.onscroll = function () {
                lazyFunc();
                let st = document.documentElement.scrollTop,
                    ct = document.documentElement.clientHeight;
                goTopModule(st, ct);
                fixedHeaderModule(st, ct);
            }
        }
    }
})()
docerPpt.init();

