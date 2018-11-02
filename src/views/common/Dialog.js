import React from 'react';
import {Dialog as W_Dialog} from 'react-weui';
const defaultState = {
    show        : false,
    title       : '',
    content     : '',
    onConfirmed : null,
    onCanceled  : null
};
export default class Dialog extends React.Component{
    constructor() {
        super();
        this.state = {...defaultState};
    }
    hideDialogAndDo(callback) {
        if(typeof callback === 'function'){
            if(callback() === false){
                return;
            }
        }
        this.setState({show: false});
    }
    confirm(content = defaultState.content,
            title = defaultState.title,
            onConfirmed = defaultState.onConfirmed,
            onCanceled = defaultState.onCanceled) {
        const _this = this;
        this.setState({
            show    : true,
            title: title,
            content: content,
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: ()=>{
                        _this.hideDialogAndDo(onCanceled);
                    }
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: ()=>{
                        _this.hideDialogAndDo(onConfirmed);
                    }
                }
            ]
        });
    }
    alert(content = defaultState.content,
            title = defaultState.title,
            onConfirmed = defaultState.onConfirmed) {
        const _this = this;
        return new Promise((resolve)=>{
            this.setState({
                show    : true,
                title: title,
                content: content,
                buttons: [
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: ()=>{
                            _this.hideDialogAndDo(()=>{
                                if(onConfirmed){
                                    if(onConfirmed() === false){
                                        return false;
                                    }
                                }
                                return resolve();
                            });
                        }
                    }
                ]
            });
        });
    }
    render() {
        if(this.state.show){
            return (
                <W_Dialog type="ios"
                          title={this.state.title}
                          buttons={this.state.buttons} show={this.state.show}>
                    {this.state.content}
                </W_Dialog>
            );
        }else{
            return null;
        }
    }
}