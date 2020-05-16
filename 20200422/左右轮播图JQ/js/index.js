$(function () {
    // 获取元素
    let $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $sliderList = $wrapper.find('.slider'),
        $pagination = $container.find('.pagination'),
        $paginationList = $pagination.find('li'),
        $changeLeft = $container.find('.changeLeft'),
        $changeRight = $container.find('.changeRight');

    // 定义公共变量
    let step = 0,
        interval = 1000,
        autoTimer = null,
        len = $sliderList.length;

    // 自动轮播的方法
    function autoMove() {
        //debugger;
        step++;
        if (step >= len) {
            $wrapper.css('left', 0);
            step = 1;
        }
        $wrapper.stop().animate({
            left: -step * 800
        }, 300)
        focus();
    }

    // 实现自动轮播
    autoTimer = setInterval(autoMove, interval);

    // 焦点对齐
    function focus() {
        let $temp = step;
        $temp === len - 1 ? $temp = 0 : null;
        $paginationList.each((index, item) => {
            $item = $(item);
            if (index === $temp) {
                $item.addClass('active');
                return;
            }
            $item.removeClass('active');
        });
    }

    // 鼠标划上停止自动轮播,鼠标离开恢复
    $container.on('mouseenter', () => clearInterval(autoTimer))
        .on('mouseleave', () => autoTimer = setInterval(autoMove, interval));

    // 点击焦点可以切换
    $paginationList.each((index, item) => {
        $item = $(item);
        $item.on('click', function () {
            let index = $(this).index();
            step = index;
            $wrapper.stop().animate({
                left: -step * 800
            }, 300)
            focus();
        })
    })

    // 右按钮
    $changeRight.on('click',autoMove);

    // 左按钮
    $changeLeft.on('click',function(){
        step--;
        if (step < 0) {
            $wrapper.css('left', -(len-1) * 800);
            step = len-2;
        }
        $wrapper.stop().animate({
            left: -step * 800
        }, 300)
        focus();
    })
})