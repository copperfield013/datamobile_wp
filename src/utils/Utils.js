import tokenStore from './TokenStore';
import store from '../redux/store';
import {redirect} from '../redux/actions/page-actions';

let CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
let Utils = {
    fetch(url, formData, param = {}) {
        let defFetchParam = {
            url     : null,
            method  : 'POST',
            formData: new FormData(),
            responseDataType    : 'json',
            withToken       : true,
            tokenName       : '',
            notAcceptableRedirect: true,
            sendJson        : false
        };
        if(url && typeof url === 'string'){
            param.url = url;
        }else if(typeof url === 'object'){
            param = url;
        }

        if(param.sendJson === true){
            if(typeof formData === 'object' && !(formData instanceof FormData)){
                param.formData = formData;
            }
        }else{
            if(formData instanceof FormData){
                param.formData = formData;
            }else if(typeof formData === 'object'){
                let f = new FormData();
                param.formData = f;
                for(let key in formData){
                    f.append(key, formData[key]);
                }
            }
        }
        param = {...defFetchParam, ...param};

        let headers = {};
        if(param.withToken){
            headers[param.tokenName || tokenStore.getTokenName()] = tokenStore.getToken();
        }
        let body = param.formData;
        if(param.sendJson === true){
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(param.formData);
        }
        return new Promise((resolve)=>{
            if(param.url){
                window.fetch(param.url,{method: param.method, body: body, headers:headers})
                    .then((res)=> {
                        if (res.status >= 200 && res.status < 300) {
                            //请求已被处理
                            if (param.responseDataType === 'json') {
                                //处理json返回数据
                                try {
                                    res.json().then((data) => {
                                        resolve(data);
                                    })
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        } else {
                            if (res.status === 403) {
                                //权限不足
                                if(param.notAcceptableRedirect === true){
                                    store.dispatch(redirect('/login?reason=notAcceptable'));
                                }
                            } else if (res.status === 404) {
                                //页面不存在
                                store.dispatch(redirect('/pageNotFound'));
                            }else if(res.status === 504){
                                //页面不存在
                                store.dispatch(redirect('/pageNotFound'));
                            } else if (res.status === 500){
                                //后台错误
                            }
                        }
                    }).catch((e)=>{
                        console.error(e);
                    });
            }
        });
    },
    /**
     * 获得随机字符串
     * @param len 随机字符串长度，默认32
     * @param radix 字符维度。如果传入10，则生成的字符串的每个字符都是0~9，如果传入16，则为0~F。默认16，最大62
     * @return string 随机字符串
     */
    uuid(len, radix){
        let chars = CHARS, uuid = [], i;
        len = len || 32;
        radix = radix || 16;
        if(radix > chars.length){
            radix = chars.length;
        }
        for (i = 0; i < len; i++){
            uuid[i] = chars[0 | Math.random() * radix];
        }
        return uuid.join('');
    },
}

export default Utils;