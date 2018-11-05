import React from 'react';
import tokenStore from '../../utils/TokenStore';
import queryString from 'query-string';
import store from "../../redux/store";
import {setTitle} from "../../redux/actions/page-actions";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errorMsg    : null
        }
        this.doLogin = this.doLogin.bind(this);
    }

    doLogin(){
        let formData = new FormData();
        formData.append('username', this.username.value);
        formData.append('password', this.password.value);
        fetch(`/api/auth/token`, {
            method: 'POST', body:formData
        }).then((res)=>{
            if(res.status === 504){
                this.setState({
                    errorMsg    : '服务器连接失败'
                })
            }else{
                res.json().then((data)=>{
                    if(data.status === 'suc'){
                        tokenStore.setToken(data.token);
                        this.props.history.push('/');
                    }else if(data.errorMsg){
                        this.setState({errorMsg: data.errorMsg});
                        console.log(data.errorMsg);
                    }
                })
            }
        });
    }
    componentDidMount(){
        store.dispatch(setTitle(`登录-易+数据融合工具`));
    }
    render(){
        let query = queryString.parse(this.props.location.search);
        console.log(query.reason);
        let errorMsg = '';
        if(!this.state.errorMsg){
            if(query.reason === 'notAcceptable'){
                errorMsg = '验证错误， 请重新登录';
            }
        }

        return (
            <div className="login">
                <div className="welcome"></div>
                <div className="login-form">
                    <div className="login-inp">
                        <i className={`iconfont icon-user`}></i>
                        <input ref={(ins)=>this.username=ins} type="text" autoComplete="off" placeholder="请输入用户名" />
                    </div>
                    <div className="login-inp">
                        <i className={`iconfont icon-password`}></i>
                        <input ref={(ins)=>this.password=ins} type="password" autoComplete="off" placeholder="请输入密码" />
                    </div>
                    {
                        errorMsg?
                        <div className="error-msg">
                            <span>登陆失败。{errorMsg}</span>
                        </div>:null


                    }
                    <div onClick={this.doLogin} className="login-inp submit"><span>登录</span></div>
                </div>
                <div className="login-txt">
                    <a href="#">忘记密码？</a>
                </div>
            </div>
        );
    }
}