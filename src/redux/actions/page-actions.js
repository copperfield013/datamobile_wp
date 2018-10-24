export const REGIST_MENU = 'regist_menu';
export const UNREGIST_MENU = 'unregist_menu';
export const SET_TITLE = 'set_title';

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
/*

let mainHistory = null;
export function setHistory(history){
    console.log('setHistory')
    console.log(history);
    mainHistory = history;
}

export function go(path, query){
    let search = '?';
    if(query && typeof query === 'object'){
        search += $.param(query);
    }
    console.log(`search=${search}`);
    history.push(path + search);
}*/
