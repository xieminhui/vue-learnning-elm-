import { getStyle } from '../../config/myUtils'

//自定义指令，通过mixin方式插入vue
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
                    scrollEl = document.body;
                    heightEl = el;
                }
                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;
                    setTop = el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, false)

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false)

                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                }, false)

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
