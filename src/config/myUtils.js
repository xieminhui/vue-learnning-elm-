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
    let data = window.localStorage.getItem(name);
    if(data){
        return JSON.parse(data);
    }else{
        return {};
    }
}

/*
* 删除localstorage
* */
export const removeItem = name =>{
    if(!name)return;
    window.localStorage.removeItem(name);
}