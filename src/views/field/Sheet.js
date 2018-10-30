import React from 'react';
import {ActionSheet} from 'react-weui';


export default class Sheet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modified: false,
            shown   : false,
            value   : props.defaultValue,
            menus: [],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>this.setState({shown: false})
                }
            ]
        }
        if(Array.isArray(props.options)){
            for(let i in props.options){
                this.state.menus.push({
                    label: props.options[i],
                    onClick: this.selectOption.bind(this, props.options[i])
                })
            }
        }
        let _this = this;
        this.filedInputAdapter = {
            getName(){
                return props.name;
            },
            getValue(){
                return _this.state.value;
            },
            isStrict(){
                return true;
            },
            isModified(){
                return _this.state.modified;
            }
        }
        if(props.name && props.inputMap){
            props.inputMap.put(props.name, this);
        }
    }
    selectOption(option) {
        this.setState({
            value: option,
            shown: false,
            modified: true
        })
    }
    render(){
        return (
            <div className={`field-input field-input-sheet`}>
                <div className={`field-input-value`} onClick={()=>this.setState({shown: true})}>
                    <span>{this.state.value}</span>
                </div>
                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.shown}
                    type="ios"
                    onRequestClose={()=>this.setState({shown: false})}
                />
            </div>
        )
    }
}