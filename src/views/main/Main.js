import React, {Component} from 'react';
import {BrowserRouter , Route, Switch, Redirect} from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
import MenuIcon from '../common/MenuIcon';
import './Main.css';
import {setContainer, scrollTrigged, hideSheet} from '../../redux/actions/page-actions';
import store from '../../redux/store';
import {ActionSheet} from "react-weui";
import Login from './Login';
class Main extends Component{
    constructor() {
        super();
        this.state = {
            menuIconClickCallback   : null,
            title   : '易+数据融合工具',
            showGlobalSheet : false,
            globalSheetMenus : [],
            globalSheetActions  : [{
                label: '取消',
                onClick: ()=>store.dispatch(hideSheet())
            }]
        }
    }
    handleGlobalSheet(page){
        let globalSheetMenus = page.globalSheetMenus;
        if(page.showGlobalSheet){
            for(let i in globalSheetMenus){
                if(typeof globalSheetMenus[i] === 'string'){
                    globalSheetMenus[i] = {
                        label   : globalSheetMenus[i],
                        onClick : ()=>{
                            if(page.globalSheetCallback){
                                page.globalSheetCallback(globalSheetMenus[i].label);
                            }
                            store.dispatch(hideSheet());
                        }
                    }
                }else if(typeof globalSheetMenus[i] === 'object'){
                    let onClick = globalSheetMenus[i].onClick;
                    globalSheetMenus[i] =
                        {...globalSheetMenus[i],
                            onClick:()=>{
                                if(typeof onClick === 'function'){
                                    try{
                                        if(onClick(globalSheetMenus[i].label) === false){
                                            return;
                                        }
                                    }catch(e){console.error(e)};
                                }
                                store.dispatch(hideSheet());
                            }
                        };
                }
            }
        }
        return globalSheetMenus;
    }
    componentDidMount() {
        console.log('bind pagehide')
        window.addEventListener("pagehide", function(){
            console.log('总有刁民想害朕')
            //window.alert('页面要关闭了');
        }, false);
        window.onscroll = function () {
            console.log(document.body.scrollTop + document.documentElement.scrollTop);
            scrollTrigged(document.body.scrollTop + document.documentElement.scrollTop);
            //scrollTrigged(document.body.scrollTop);
        }
        setContainer(document.body);
        store.subscribe(()=>{
            const page = store.getState().page;
            if(page){
                let globalSheetMenus = this.handleGlobalSheet(page);
                this.setState({
                    menuIconClickCallback : page.onMenuClick,
                    title  : page.title,
                    showGlobalSheet : page.showGlobalSheet,
                    globalSheetMenus    : globalSheetMenus
                });
                if(page.redirect && page.redirect.redirected === false){
                    page.redirect.redirected = true;
                    this.refs.router.history.replace(page.redirect.url);
                }
            }
        });

    }
    render() {
        return (
            <BrowserRouter ref="router">
                <div ref="contentContainer" id="contentContainer">
                    <Switch>
                        <Route path="(/)" exact component={HomePage} />} />
                        <Route path="/login" exact component={Login} />} />
                        <Route path="/user" component={UserPage} />} />
                        <Route path="/entity/*" component={EntityPage} />} />
                        <Route path="" render={()=><Redirect to="/login"/>}/>
                    </Switch>
                    <div id="titlebar" ref="titlebar">
                        <h1>{this.state.title}</h1>
                        {
                            this.state.menuIconClickCallback?
                                <MenuIcon style={{flexBasis:"50px"}} ref="menuIcon" onClick={this.state.menuIconClickCallback} />
                                : ''
                        }
                    </div>
                    <ActionSheet
                        menus={this.state.globalSheetMenus}
                        actions={this.state.globalSheetActions}
                        show={this.state.showGlobalSheet}
                        type="ios"
                        onRequestClose={()=>store.dispatch(hideSheet())}
                    />
                </div>
            </BrowserRouter>
            );
    }
}

export default Main;