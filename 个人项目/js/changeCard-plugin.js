(function () {
    class ChangeCard {
        constructor(container, options) {
            this.container = container;
            for (let key in options) {
                if (!options.hasOwnProperty(key)) break;
                this[key] = options[key];
            }
            this.activeIndex = this.initialSlide;
            this.init();
        }
        // init控制执行顺序
        init() {
            let _this = this;
            this.queryDOM();
            this.show();
            this.on.init();
            utils._each(this.navList, (item, index) => {
                item[this.event] = function () {
                    if(item.className === 'active') return;
                    this.setAttribute('index', index);
                    _this.change(this.getAttribute('index'));
                    // 每次事件完成要要做的是
                    _this.on.transitionEnd();
                }
            })
        }
        // 获取要操作的元素
        queryDOM() {
            let container = this.container;
            this.navBox = container.querySelector(this.nav.el);
            this.contentBox = container.querySelector(this.content.el);
            this.navList = this.navBox.querySelectorAll('li');
            this.contentList = this.contentBox.querySelectorAll('div');
        }
        // 默认显示
        show() {
            let {navList,contentList,activeIndex}=this;
            navList[activeIndex].className ='active';
            contentList[activeIndex].className ='active';
        }
        // 切换
        change(index) {
            for (let i = 0; i < this.navList.length; i++) {
                this.navList[i].className = '';
                this.contentList[i].className = '';
                this.navList[index].className = 'active';
                this.contentList[index].className = 'active';
            }
        }

    }

    function changeCard(container, options) {
        let _options = {
            initialSlide: 0, //初始展示的那一张
            event: 'onclick', //触发事件
            navNumber: 5,
            nav: {
                el: '.nav',
            },
            content: {
                el: '.content'
            },
        };
        options = utils._assignDeep(_options, options);
        if (typeof container === 'string') {
            container = document.querySelector(container)
        }
        if (!container || container.nodeType !== 1) {
            throw new Error('container必须是DOM元素')
        }
        return new ChangeCard(container, options)
    }
    window.changeCard = changeCard;
})();

