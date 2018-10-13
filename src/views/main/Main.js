import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch } from "react-router-dom";
import HomePage from '../home/HomePage';
import UserPage from '../user/UserPage';
import EntityPage from '../entity/EntityPage';
import MenuIcon from '../common/MenuIcon';
import './Main.css';
import {Dialog} from "react-weui";
import store from '../../redux/store';
class Main extends Component{
    constructor() {
        super();
        this.state = {
            menuIconClickCallback   : null,
            title   : '导航页',
            //dialogConfirmParam    : null
        }
        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.getContentContainer = this.getContentContainer.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.confirm = this.confirm.bind(this);
        this.renderDialogConfirm = this.renderDialogConfirm.bind(this);
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
                this.state.menuIconClickCallback.apply(this, arguments);
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
    componentWillMount() {
        store.subscribe((e)=>{
            let dialog = store.getState().dialog;
            if(dialog){
                this.confirm(dialog.dialogConfirmParam.content, dialog.dialogConfirmParam.title);
            }
        });
    }
    confirm(content, title) {
        let _this = this;
        let hideDialogAndDo = (callback)=>{
            _this.setState({dialogConfirmParam: null});
            if(typeof callback === 'function'){
                callback();
            }
        };
        let promise = new Promise(function(resolve, reject){
            _this.setState({dialogConfirmParam: {
                title   : title,
                content : content,
                buttons : [{
                    type: 'default',
                    label: '取消',
                    onClick: ()=>hideDialogAndDo(reject)
                },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: ()=>hideDialogAndDo(resolve)
                    }]
            }});
        });
        return promise;
    }
    renderDialogConfirm() {
        if(this.state.dialogConfirmParam != null){
            return (
                <Dialog type="ios" title={this.state.dialogConfirmParam.title}
                        buttons={this.state.dialogConfirmParam.buttons} show={true}>
                    {this.state.dialogConfirmParam.content}
                </Dialog>
            );
        }
    }
    render() {
        let menuBinder = {
            toggle          : this.onMenuIconClick,
            getContainer    : this.getContentContainer,
            setTitle        : this.setTitle,
            confirm         : this.confirm
        };
        return (
            <BrowserRouter>
                <div ref="contentContainer" id="contentContainer">
                    <Switch>
                        <Route path="(/)" exact render={()=><HomePage menuBinder={menuBinder} />} />
                        <Route path="/user" render={()=><UserPage menuBinder={menuBinder} />} />
                        <Route path="/entity/*" render={()=><EntityPage menuBinder={menuBinder} />} />
                    </Switch>
                    {this.renderDialogConfirm()}
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