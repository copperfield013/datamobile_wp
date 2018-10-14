import React, {Component} from 'react';
import {BrowserRouter , Route, Switch } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
import MenuIcon from '../common/MenuIcon';
import './Main.css';
import {setContainer} from '../../redux/actions/page-actions';
import store from '../../redux/store';
class Main extends Component{
    constructor() {
        super();
        this.state = {
            menuIconClickCallback   : null,
            title   : '导航页'
        }
    }
    componentWillMount() {
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
            <BrowserRouter>
                <div ref="contentContainer" id="contentContainer">
                    <Switch>
                        <Route path="(/)" exact component={HomePage} />} />
                        <Route path="/user" component={UserPage} />} />
                        <Route path="/entity/*" component={EntityPage} />} />
                    </Switch>
                    <div id="titlebar">
                        <h1>{this.state.title}</h1>
                        {
                            this.state.menuIconClickCallback?
                                <MenuIcon style={{flexBasis:"50px"}} ref="menuIcon" onClick={this.state.menuIconClickCallback} />
                                : ''
                        }
                    </div>
                </div>
            </BrowserRouter>
            );
    }
}

export default Main;