import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch } from "react-router-dom";
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
            menuIconClickCallback   : null,
            title   : '导航页'
        }
        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.getContentContainer = this.getContentContainer.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }
    onMenuIconClick(callback, removeFlag) {
        if(typeof callback === 'function'){
            if(removeFlag === false && this.state.menuIconClickCallback === callback){
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
        return document.body;
    }
    setTitle(title) {
        this.setState({
            title: title
        });
    }
    render() {
        let menuBinder = {
            toggle          : this.onMenuIconClick,
            getContainer    : this.getContentContainer,
            setTitle        : this.setTitle
        };
        return (
            <BrowserRouter>
                <div ref="contentContainer" id="contentContainer">
                    <Switch>
                        <Route path="(/)" exact render={()=><HomePage menuBinder={menuBinder} />} />
                        <Route path="/user" render={()=><UserPage menuBinder={menuBinder} />} />
                        <Route path="/entity/*" render={()=><EntityPage menuBinder={menuBinder} />} />
                    </Switch>
                    <div id="titlebar">
                        <h1>{this.state.title}</h1>
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