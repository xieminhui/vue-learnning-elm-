import { getStyle } from '../../config/myUtils'

//自定义指令，通过mixin方式插入vue
//无限加载的原理是通过对滚动事件的监听，每一次滚动都要获取到已滚动的距离，如果滚动的距离加上浏览器窗口高度，会大于等于内容高度，就触发函数加载数据。
export const loadMore = {
    directives: {
        'load-more': {
            bind:(el, binding) => {
                let windowHeight = window.screen.height;
                let height,setTop,paddingBottom,marginBottom,requestFram,oldScrollTop,scrollEl,heightEl,scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce =2;
                if(scrollType == 2){
                    scrollEl = el;
                    heightEl = el.children[0];
                }else {
                    scrollEl = document.documentElement;
                    heightEl = el;
                }
                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;
                    setTop = el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, {passive:true});

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, {passive:true});

                el.addEventListener('scroll', () => {
                    loadMore();
                }, false);
                //运动结束时判断是否有惯性运动，例如轻轻滑可以连续向上滚动
                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, {passive:true})

                const moveEnd = () => {
                    //动画函数requestAnimationFrame，定时器加强优化版
                    requestFram = requestAnimationFrame(() => {
                        if(scrollEl.scrollTop != oldScrollTop){
                            moveEnd();
                        }else{
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }
                const loadMore = () => {
                    if(scrollEl.scrollTop +windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce){
                        binding.value();//触发请求，加载更多数据
                    }
                }
            }
        }
    }
}
