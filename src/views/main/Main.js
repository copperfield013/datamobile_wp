import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch, Redirect } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
import MenuIcon from './MenuIcon';
import '../../styles/weui.min.css';
import '../../styles/jquery-weui.min.css';
import './Main.css';
class Main extends Component{
    constructor() {
        super();
        this.state = {
            menuIconClickCallback   : null
        }
        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.getContentContainer = this.getContentContainer.bind(this);
    }
    onMenuIconClick(callback, removeFlag) {
        if(typeof callback === 'function'){
            if(removeFlag == false && this.state.menuIconClickCallback === callback){
                this.setState({
                    menuIconClickCallback : null
                });
            }else{
                this.setState({
                    menuIconClickCallback : callback
                });
            }
        }else{
            if(typeof this.state.menuIconClickCallback === 'function'){
                this.state.menuIconClickCallback.apply(this.refs.menuIcon);
            }
        }
    }
    getContentContainer() {
        return this.refs.contentContainer;
    }
    render() {
        return (
            <BrowserRouter>
                <div className="weui-tab">
                    <div className="weui-tab__bd" ref="contentContainer">
                        <Switch>
                            <Route path="(/)" exact component={HomePage} />
                            <Route path="/user" component={UserPage} />
                            <Route path="/entity/*" render={props=>{
                                return <EntityPage drawer={{
                                    toggle          : this.onMenuIconClick,
                                    getContainer    : this.getContentContainer,
                                }} />
                            }} />
                        </Switch>
                    </div>
                    <div className="weui-tabbar" id="main-tabbar">
                        <NavLink to="/"
                                 className="weui-tabbar__item"
                                 activeClassName="weui-bar__item--on"
                                 style={{flexGrow:15}}
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
                                 style={{flexGrow:15}}
                                 isActive={(x, y)=>{
                                     return y && y.pathname.startsWith('/user');
                                 }}>
                            <div className="weui-tabbar__icon">
                                <i className="iconfont user"></i>
                            </div>
                            <p className="weui-tabbar__label">我</p>
                        </NavLink>
                        {
                            this.state.menuIconClickCallback?
                                <MenuIcon style={{flexBasis:"50px"}} ref="menuIcon" onClick={this.onMenuIconClick} />
                                : ''
                        }

                    </div>
                </div>
            </BrowserRouter>
            );
    }
}

export default Main;