/*
*  用于设置不同屏幕大小的document字体大小
* */
(function (doc ,win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clinetWidth = docEl.clientWidth;
            if(!clinetWidth)return;
            docEl.style.fontSize = 20 * (clinetWidth / 320) + 'px';
        };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);