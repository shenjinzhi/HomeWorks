let docer = (function () {
    // 轮播图
    let bannerModule = function bannerModule() {
        // 获取元素
        let container = document.querySelector('.container'),
            banner = container.querySelector('.banner'),
            wrapper = banner.querySelector('.wrapper'),
            sliderList = wrapper.querySelectorAll('.slider'),
            pager = container.querySelector('.pager'),
            pagerList = pager.querySelectorAll('li'),
            changeLeft = container.querySelector('.changeLeft'),
            changeRight = container.querySelector('.changeRight');

        // 设置公共变量
        let autoTimer = null,
            interval = 3000,
            step = 0,
            prev = 0;

        // 实现切换
        function change() {
            sliderList[prev].style.zIndex = 0;
            sliderList[step].style.zIndex = '1';
            sliderList[prev].style.opacity = 0;
            sliderList[prev].style.transition = 'opacity 0';
            sliderList[step].style.opacity = '1';
            sliderList[step].style.transition = 'opacity .66s';
        }
        let autoMove = function autoMove() {
            prev = step;
            step++;
            step > sliderList.length - 1 ? step = 0 : null;
            change();
            focus();
        }
        // 自动切换
        autoTimer = setInterval(autoMove, interval);
        // 鼠标划上停止
        banner.onmouseenter = function () {
            clearInterval(autoTimer);
            autoTimer = null;
        }
        // 鼠标离开恢复
        banner.onmouseleave = function () {
            autoTimer = setInterval(autoMove, interval);
        }
        // 焦点对齐
        function focus() {
            [].forEach.call(pagerList, (item, index) => {
                if (index === step) {
                    item.className = 'active';
                    return;
                }
                item.className = '';
            })
        }
        // 点击焦点切换
        [].forEach.call(pagerList, (item, index) => {
            item.onclick = function () {
                if (step === index) return;
                prev = step;
                step = index;
                change();
                focus();
            }
        })
        // 点击左右按钮切换
        changeRight.onclick = function () {
            autoMove();
        }
        changeLeft.onclick = function () {
            prev = step;
            step--;
            step < 0 ? step = sliderList.length - 1 : null;
            change();
            focus();
        };
    }

    // input
    let inputModule = function inputModule() {
        // 获取元素
        let searchTab = document.querySelector('.search-tab'),
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
        });
        window.addEventListener('click', function (ev) {
            console.log(ev.target.className)
            if (ev.target.className === 'search-inp') return;
            if (ev.target.className === 'inp-choose') return;
            if (ev.target.className === 'inp-choose-dl') return;
            if (ev.target.className === 'icon-del') return;
            if (ev.target.className === 'inp-choose-dis') return;
            if (ev.target.className === 'inp-val-dd') return;
            inpChoose.style.display = 'none';
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

    // select
    let selectModule = function selectModule() {
        // 获取元素
        let select = document.querySelector('#select'),
            selectList = select.querySelectorAll('.select-title-h li'),
            selectPic = select.querySelectorAll('.select-pic');

        // 鼠标划过
        Array.from(selectList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < selectList.length; i++) {
                    selectList[i].className = '';
                    selectPic[i].className = 'select-pic  select-pic-none';
                }
                item.className = 'select-active';
                selectPic[index].className = 'select-pic';
            }
        })
    }

    /* // ppt数据请求
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'ppt.data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
            };
        };
        xhr.send(null);
    } */

    // ppt
    let pptModule = function pptModule() {
        // 获取元素
        let ppt = document.querySelector('#ppt'),
            pptList = ppt.querySelectorAll('.ppt-title-h li'),
            pptPic = ppt.querySelectorAll('.ppt-pic');

        // 鼠标划过
        Array.from(pptList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < pptList.length; i++) {
                    pptList[i].className = '';
                    pptPic[i].className = 'ppt-pic  ppt-pic-none';
                }
                item.className = 'select-active';
                pptPic[index].className = 'ppt-pic';
            }


        })
    }

    // word
    let wordModule = function wordModule() {
        // 获取元素
        let word = document.querySelector('#word'),
            wordList = word.querySelectorAll('.word-title-h li'),
            wordPic = word.querySelectorAll('.word-pic');

        // 鼠标划过
        Array.from(wordList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < wordList.length; i++) {
                    wordList[i].className = '';
                    wordPic[i].className = 'ppt-pic word-pic  word-pic-none';
                }
                item.className = 'select-active';
                wordPic[index].className = 'ppt-pic word-pic';
            }
        })
    }

    // excel
    let excelModule = function excelModule() {
        // 获取元素
        let excel = document.querySelector('#excel'),
            excelList = excel.querySelectorAll('.excel-title-h li'),
            excelPic = excel.querySelectorAll('.excel-pic');

        // 鼠标划过
        Array.from(excelList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < excelList.length; i++) {
                    excelList[i].className = '';
                    excelPic[i].className = 'ppt-pic excel-pic  excel-pic-none';
                }
                item.className = 'select-active';
                excelPic[index].className = 'ppt-pic excel-pic';
            }
        })
    }

    // picture
    let pictureModule = function pictureModule() {
        // 获取元素
        let picture = document.querySelector('#picture'),
            pictureList = picture.querySelectorAll('.picture-title-h li'),
            picturePic = picture.querySelectorAll('.picture-pic');

        // 鼠标划过
        Array.from(pictureList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < pictureList.length; i++) {
                    pictureList[i].className = '';
                    picturePic[i].className = 'ppt-pic picture-pic  picture-pic-none';
                }
                item.className = 'select-active';
                picturePic[index].className = 'ppt-pic picture-pic';
            }
        })
    }

    // rank
    let rankModule = function rankModule() {

        let rankPptModule = function rankModule() {
            // 获取元素
            let rank = document.querySelector('#rank'),
                rankHot = rank.querySelector('#ppt-hot'),
                rankList = rankHot.querySelectorAll('.ppt-rank li span'),
                rankBody = rankHot.querySelectorAll('.ppt-rank-body');

            // 鼠标划过
            Array.from(rankList).forEach((item, index) => {
                item.onmouseover = function () {
                    for (let i = 0; i < rankList.length; i++) {
                        rankList[i].className = '';
                        rankBody[i].className = 'ppt-rank-body ppt-rank-body-none';
                    }
                    item.className = 'active';
                    rankBody[index].className = 'ppt-rank-body';
                }
            })
        }
        rankPptModule();
        let rankWordModule = function rankModule() {
            // 获取元素
            let rank = document.querySelector('#rank'),
                rankHot = rank.querySelector('#word-hot'),
                rankList = rankHot.querySelectorAll('.ppt-rank li span'),
                rankBody = rankHot.querySelectorAll('.ppt-rank-body');

            // 鼠标划过
            Array.from(rankList).forEach((item, index) => {
                item.onmouseover = function () {
                    for (let i = 0; i < rankList.length; i++) {
                        rankList[i].className = '';
                        rankBody[i].className = 'ppt-rank-body ppt-rank-body-none';
                    }
                    item.className = 'active';
                    rankBody[index].className = 'ppt-rank-body';
                }
            })
        }
        rankWordModule();
        let rankExcelModule = function rankModule() {
            // 获取元素
            let rank = document.querySelector('#rank'),
                rankHot = rank.querySelector('#excel-hot'),
                rankList = rankHot.querySelectorAll('.ppt-rank li span'),
                rankBody = rankHot.querySelectorAll('.ppt-rank-body');

            // 鼠标划过
            Array.from(rankList).forEach((item, index) => {
                item.onmouseover = function () {
                    for (let i = 0; i < rankList.length; i++) {
                        rankList[i].className = '';
                        rankBody[i].className = 'ppt-rank-body ppt-rank-body-none';
                    }
                    item.className = 'active';
                    rankBody[index].className = 'ppt-rank-body';
                }
            })
        }
        rankExcelModule();
        let rankFreeModule = function rankModule() {
            // 获取元素
            let rank = document.querySelector('#rank'),
                rankHot = rank.querySelector('#free-hot'),
                rankList = rankHot.querySelectorAll('.ppt-rank li span'),
                rankBody = rankHot.querySelectorAll('.ppt-rank-body');

            // 鼠标划过
            Array.from(rankList).forEach((item, index) => {
                item.onmouseover = function () {
                    for (let i = 0; i < rankList.length; i++) {
                        rankList[i].className = '';
                        rankBody[i].className = 'ppt-rank-body ppt-rank-body-none';
                    }
                    item.className = 'active';
                    rankBody[index].className = 'ppt-rank-body';
                }
            })
        }
        rankFreeModule();

    }

    // knowledge
    let knowModule = function knowModule() {
        // 获取元素
        let know = document.querySelector('#docer'),
            knowList = know.querySelectorAll('.docer-left-title li'),
            knowPic = know.querySelectorAll('.docer-left-content');

        // 鼠标划过
        Array.from(knowList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < knowList.length; i++) {
                    knowList[i].className = '';
                    knowPic[i].className = 'docer-left-content docer-none';
                }
                item.className = 'active';
                knowPic[index].className = 'docer-left-content';
            }
        })

    }

    // designer
    let designerModule = function designerModule() {
        // 获取元素
        let designer = document.querySelector('#designer'),
            designerList = designer.querySelectorAll('.select-title-h li'),
            designerPic = designer.querySelectorAll('.block');

        // 鼠标划过
        Array.from(designerList).forEach((item, index) => {
            item.onmouseover = function () {
                for (let i = 0; i < designerList.length; i++) {
                    designerList[i].className = '';
                    designerPic[i].className = 'module block designer-item-none';
                }
                item.className = 'select-active';
                designerPic[index].className = 'module block';
            }
        })

    }

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
        let fixedHeader = document.querySelector('.fixed-header');
        if (st >= ct / 2) {
            fixedHeader.style.display = 'block';
        } else {
            fixedHeader.style.display = 'none';
        }
    }

    // 侧面导航栏锚点定位
    let positionModule = function positionModule() {
        let side = document.querySelector('.side'),
            nameNav = side.querySelector('.name-nav'),
            aList = nameNav.querySelectorAll('a');
        //console.log(aList);
        [...aList].forEach((item, index) => {
            item.onclick = function () {
                for (let i = 0; i < aList.length; i++) {
                    aList[i].className = '';
                }
                item.className = 'active';
            }
        }) 
    }

    return {
        init() {
            bannerModule();
            inputModule();
            selectModule();
            pptModule();
            wordModule();
            excelModule();
            pictureModule();
            rankModule();
            knowModule();
            designerModule();
            positionModule();
            window.onscroll = function () {
                let st = document.documentElement.scrollTop,
                    ct = document.documentElement.clientHeight;
                goTopModule(st, ct);
                fixedHeaderModule(st, ct);
            }

        }
    }
})();
docer.init();