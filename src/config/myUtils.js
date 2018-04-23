/*
*  存localstorage
* */
export const setItem = (name, content) => {
    if(!name) return;
    if(typeof content != 'string'){
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/*
* 取localstorage
* */
export const getItem = (name) =>{
    if(!name) return;
    let data = JSON.parse(window.localStorage.getItem(name));
    if(data){
        return data;
    }else{
        return '';
    }
}

/*
* 删除localstorage
* */
export const removeItem = name =>{
    if(!name)return;
    window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}