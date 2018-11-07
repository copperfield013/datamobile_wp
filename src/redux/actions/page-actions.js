export const REGIST_MENU = 'regist_menu';
export const UNREGIST_MENU = 'unregist_menu';
export const SET_TITLE = 'set_title';
export const SHOW_SHEET = 'show_sheet';
export const HIDE_SHEET = 'hide_sheet';
export const REDIRECT = 'redirect';

/**
 * 注册页面顶部的菜单按钮回调
 * @param onMenuClick
 */
export function registMenu(onMenuClick){
    return {
        type: REGIST_MENU,
        payload: {onMenuClick }
    }
}

/**
 * 取消绑定顶部菜单的按钮回调，需要传入原绑定的函数的对象（防止错误解除）
 * @param onMenuClick
 * @returns {{type: string, payload: {onMenuClick: *}}}
 */
export function unregistMenu(onMenuClick){
    return {
        type: UNREGIST_MENU,
        payload: {onMenuClick }
    }
}

export function setTitle(title){
    return {
        type: SET_TITLE,
        payload: title
    }
}

let $container = null;

export function setContainer($$container){
    $container = $$container;
}

export function getContainer(){
    return $container;
}
const browser = {
    versions:function(){
        let u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
export function getBrowser() {
    return browser;
}


/**
 * 显示全局的选项菜单
 * @param menus
 * @param callback
 * @returns {{type: string, payload: {menus: *, callback: callback}}}
 */
export function showSheet(menus, callback=function(){}){
    return {
        type: SHOW_SHEET,
        payload: {menus, callback }
    }
}

export function hideSheet(){
    return {
        type: HIDE_SHEET,
        payload: {}
    }
}



let registedElementMap = new Map();
class Node{
    constructor(value){
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    setNext(node){
        if(node instanceof Node){
            this.next = node;
            node.prev = this;
        }
    }
    hasNext(){
        return this.next != null;
    }
}
class LinkedList{
    constructor(array){
        this.first = null;
        this.current = null;
        this.last = null;
        if(array instanceof HTMLCollection || Array.isArray(array)){
            for (let i = 0; i < array.length; i++){
                this.addNode(array[i]);
            }
        }
    }
    addNode(item){
        let node = item;
        if(!(item instanceof Node)){
            node = new Node(item);
        }
        if(this.last == null){
            this.first = this.last = this.current = node;
        }else{
            this.last.setNext(node);
            this.last = node;
        }
    }
    setCurrent(node){
        this.current = node;
    }
    iterate(func){
        let item = this.current;
        while(item != null){
            let result = func(item);
            if(result instanceof Node){
                return result;
            }else if(result === false){
                return null;
            }else{
                item = item.next;
            }
        }
    }
    iterateInvert(func){
        let item = this.current;
        while(item != null){
            let result = func(item);
            if(result instanceof Node){
                return result;
            }else if(result === false){
                return null;
            }else{
                item = item.prev;
            }
        }
    }
}

export function registScrollElementsFixed(key, elements){
    if(key && (elements instanceof HTMLCollection || Array.isArray(elements)) && elements.length > 0){
        registedElementMap.set(key, new LinkedList(elements));
    }
}

let originScrollTop = 0;
export function scrollTrigged(scrollTop){
    let subscroll = scrollTop - originScrollTop;
    originScrollTop = scrollTop;
    registedElementMap.forEach((list, key)=>{
        let theNode = null;
        if(subscroll > 0){
            theNode = list.iterate((current)=>{
                if(current.next === null){
                    return false;
                }
                if(scrollTop + 41 >= current.next.value.offsetTop + current.next.value.offsetHeight){
                    return current.next;
                }else if(scrollTop + 41 <= current.next.value.offsetTop){
                    return current;
                }
            })
        }else if(subscroll < 0){
            theNode = list.iterateInvert((current)=>{
                if(current.prev == null){
                    return false;
                }
                if(scrollTop + 41 < current.value.offsetTop ){
                    return current.prev;
                }
            })
        }
        if(theNode != null){
            list.current.value.classList.remove('fixed');
            list.setCurrent(theNode);
            theNode.value.classList.add('fixed');
        }

    });
}

export function redirect(url){
    if(url){
        return {
            type: REDIRECT,
            payload: {url}
        }
    }
}

