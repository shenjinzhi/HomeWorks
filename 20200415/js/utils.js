let utils = (function () {
    function offset(element) {
        let parent = element.offsetParent,
            left = element.offsetLeft,
            top = element.offsetTop;
        while (parent) {
            if (!/MSIE 8/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top
        }
    }

    function setCss(element, attr, value) {
        if (attr === 'opacity') {
            element['style']['opacity'] = value;
            element['style']['filter'] = `alpha(opacity=${value * 100})`;
        }
        let reg = /^(width|height|padding|margin)?(left|top|right|bottom)?$/i;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value += 'px';
            }
        }
        element['style'][attr] = value ;
    }

    return {
        offset,
        setCss
    }
})()