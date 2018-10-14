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
    console.log(`设置容器为${$$container}`);
    $container = $$container;
}

export function getContainer(){
    return $container;
}