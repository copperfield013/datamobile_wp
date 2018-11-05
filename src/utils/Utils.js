import tokenStore from './TokenStore';
import store from '../redux/store';
import {redirect} from '../redux/actions/page-actions';
let Utils = {
    fetch(url, formData, param = {}) {
        let defFetchParam = {
            url     : null,
            method  : 'POST',
            formData: new FormData(),
            responseDataType    : 'json',
            withToken       : true,
            tokenName       : '',
            notAcceptableRedirect: true
        };
        if(url && typeof url === 'string'){
            param.url = url;
        }else if(typeof url === 'object'){
            param = url;
        }

        if(formData instanceof FormData){
            param.formData = formData;
        }else if(typeof formData === 'object'){
            let f = new FormData();
            param.formData = f;
            for(let key in formData){
                f.append(key, formData[key]);
            }
        }
        param = {...defFetchParam, ...param};

        let headers = {};
        if(param.withToken){
            headers[param.tokenName || tokenStore.getTokenName()] = tokenStore.getToken();
        }
        return new Promise((resolve)=>{
            if(param.url){
                window.fetch(param.url,{method: param.method, body: param.formData, headers:headers})
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
    }
}

export default Utils;