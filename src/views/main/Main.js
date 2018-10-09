import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch, Redirect } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import '../../styles/weui.min.css';
import '../../styles/jquery-weui.min.css';
import './Main.css';
class Main extends Component{
    render() {
        return (
            <BrowserRouter>
                <div className="weui-tab">
                    <div className="weui-tab__bd">
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/user" component={UserPage} />
                            <Redirect to="/home"/>
                        </Switch>
                    </div>
                    <div className="weui-tabbar" id="main-tabbar">
                        <NavLink to="/home" className="weui-tabbar__item" activeClassName="weui-bar__item--on">
                            <div className="weui-tabbar__icon">
                                <i className="iconfont home"></i>
                            </div>
                            <p className="weui-tabbar__label">首页</p>
                        </NavLink>
                        <NavLink to="/user" className="weui-tabbar__item" activeClassName="weui-bar__item--on">
                            <div className="weui-tabbar__icon">
                                <i className="iconfont user"></i>
                            </div>
                            <p className="weui-tabbar__label">我</p>
                        </NavLink>
                    </div>
                </div>
            </BrowserRouter>
            );
    }
}

export default Main;