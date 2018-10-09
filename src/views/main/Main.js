import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch, Redirect } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
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
                            <Route path="(/)" exact component={HomePage} />
                            <Route path="/user" component={UserPage} />
                            <Route path="/entity/*" component={EntityPage} />
                        </Switch>
                    </div>
                    <div className="weui-tabbar" id="main-tabbar">
                        <NavLink to="/"
                                 className="weui-tabbar__item"
                                 activeClassName="weui-bar__item--on"
                                 isActive={(x,y)=>{
                                     return x && !y.pathname.startsWith('/user');
                                 }}   >
                            <div className="weui-tabbar__icon">
                                <i className="iconfont home"></i>
                            </div>
                            <p className="weui-tabbar__label">首页</p>
                        </NavLink>
                        <NavLink to="/user"
                                 className="weui-tabbar__item"
                                 activeClassName="weui-bar__item--on"
                                 isActive={(x, y)=>{
                                     return y && y.pathname.startsWith('/user');
                                 }}>
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