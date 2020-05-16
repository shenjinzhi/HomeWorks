let swipter = (function () {

    // 获取需要操作的元素
    let container = document.querySelector('.container'),
        wrapper = container.querySelector('.wrapper'),
        sliderList = wrapper.querySelectorAll('.slider'),
        pagination = container.querySelector('.pagination'),
        paginationList = pagination.querySelectorAll('li'),
        changeLeft = container.querySelector('.changeLeft'),
        changeRight = container.querySelector('.changeRight');

    // 需要用到定时器，设置定时器和切换时间初始值
    let autoTimer = null,
        interval = 3000,
        prev = 0,
        step = 0;

    //切换函数封装
    let change = function change() {
        // 让上一张不显示
        sliderList[prev].style.zIndex = '0';
        sliderList[prev].style.opacity = '0';

        // 让当前张过渡显示
        sliderList[step].style.zIndex = '1';
        sliderList[step].style.opacity = '1';
        sliderList[step].style.transition = 'opacity 2s';

        // 自动切换的同时让焦点自动对其
        focus();
    }

    // 实现自动切换
    let autoMove = function autoMove() {
        // prev保存上一张的索引
        prev = step;
        // step代表即将显示的这一张
        step++;
        // 如果step大于图片时，让step重新为0
        step >= sliderList.length ? step = 0 : null;
        // 执行切换
        change();
    };

    //利用定时器完成自动切换
    autoTimer = setInterval(autoMove, interval);

    // 分页器自动对焦
    let focus = function focus() {
        [].forEach.call(paginationList, (item, index) => {
            step === index ? item.className = 'active' : item.className = '';
        })
    };

    // 鼠标经过停止自动轮播
    container.onmouseenter = function () {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    // 鼠标离开后开始自动轮播
    container.onmouseleave = function () {
        autoTimer = setInterval(autoMove, interval);
    }

    // 鼠标点击分页器跳转相应图片
    let clickFocus = function autoFocus() {
        [].forEach.call(paginationList, (item, index) => {
            item.onclick = function () {
                if (step === index) return;
                prev = step;
                step = index;
                change();
            }
        })
    }

    // 点击右按钮切换下一张
    changeRight.onclick = autoMove;

    // 点击左按钮切换上一张
    changeLeft.onclick = function () {
        prev = step;
        step--;
        step < 0 ? (step = sliderList.length - 1) : null;
        change();
    }

    return {
        init() {
            
            clickFocus();

        }
    }
})();
swipter.init(); 
