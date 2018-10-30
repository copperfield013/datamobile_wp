import React, {Component} from 'react';
import {Router , Route, Switch } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
import MenuIcon from '../common/MenuIcon';
import './Main.css';
import {setContainer} from '../../redux/actions/page-actions';
import store from '../../redux/store';
import history from '../../redux/actions/history';
class Main extends Component{
    constructor() {
        super();
        this.state = {
            menuIconClickCallback   : null,
            title   : '易+数据融合工具'
        }
    }
    componentDidMount() {
        console.log('bind onbeforeunload')
        window.addEventListener("pagehide", function(){
            //window.alert('页面要关闭了');
        }, false);
        window.onscroll = function () {
            console.log(document.body.parentElement.scrollTop);
        }
        setContainer(document.body);
        store.subscribe(()=>{
            const page = store.getState().page;
            if(page){
                this.setState({
                    menuIconClickCallback : page.onMenuClick,
                    title  : page.title
                });
            }
        });

    }
    render() {
        return (
            <Router history={history} ref="router">
                <div ref="contentContainer" id="contentContainer">
                    <Switch>
                        <Route path="(/)" exact component={HomePage} />} />
                        <Route path="/user" component={UserPage} />} />
                        <Route path="/entity/*" component={EntityPage} />} />
                    </Switch>
                    <div id="titlebar" ref="titlebar">
                        <h1>{this.state.title}</h1>
                        {
                            this.state.menuIconClickCallback?
                                <MenuIcon style={{flexBasis:"50px"}} ref="menuIcon" onClick={this.state.menuIconClickCallback} />
                                : ''
                        }
                    </div>
                </div>
            </Router>
            );
    }
}

export default Main;