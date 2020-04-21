let banner = (function () {
    let container = document.querySelector('.container'),
        wrapper = container.querySelector('.wrapper'),
        btnLeft = container.querySelector('.left_btn'),
        btnRight = container.querySelector('.right_btn'),
        dian = container.querySelectorAll('.dian li');

    let timer = null,
        step = 0;

    // 自动轮播
    let auto = function auto() {
        timer = setInterval(autoTimer, 1000)
    }

    // 定时器
    let autoTimer = function autoTimer() {
        step++;
        if (step >= 6) {
            step = 0;
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(${-step * 600}px)`;

            let l = wrapper.offsetLeft;
            step = 1;
            wrapper.style.transition = 'all .5s';
        } else {
            wrapper.style.transition = 'all .5s';
        }

        wrapper.style.transform = `translateX(${-step * 600}px)`;

        focus();
    }

    //点跟随图片一起运动
    let focus = function focus() {
        let temp = step;
        temp === 5 ? temp = 0 : null;
        [].forEach.call(dian, (item, index) => {
            if (index === temp) {
                //console.log(temp);
                item.className = 'active';
                return;
            }
            item.className = '';
        })
    }

    //点击点切换
    let clickDian = function clickDian() {
        [...dian].forEach((item, index) => {
            item.onclick = function () {
                step = index;
                console.log(step);
                if (step >= 6) {
                    step = 0;
                    wrapper.style.transition = 'none';
                    wrapper.style.transform = `translateX(${-step * 600}px)`;


                    let l = wrapper.offsetLeft;
                    step = 1;
                    wrapper.style.transition = 'all .5s';
                } else {
                    wrapper.style.transition = 'all .5s';
                }

                wrapper.style.transform = `translateX(${-step * 600}px)`;

                focus();
            }
        })
    }


    // 右按钮
    let right = function right() {
        btnRight.onclick = function () {
            autoTimer();
        }
    }

    // 左按钮
    let left = function left() {
        btnLeft.onclick = function () {
            step--;
            if (step < 0) {
                step = 5;
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translateX(${-step * 600}px)`;


                let l = wrapper.offsetLeft;
                step = 4;
                wrapper.style.transition = 'all .5s';
            } else {
                wrapper.style.transition = 'all .5s';
            }

            wrapper.style.transform = `translateX(${-step * 600}px)`;

            focus();
        }
    }

    return {
        init() {
            auto();
            container.onmouseenter = function () {
                clearInterval(timer);
            }
            container.onmouseleave = function () {
                timer = setInterval(autoTimer, 1000)
            }
            clickDian();
            right();
            left();
        }
    }
})()
banner.init();