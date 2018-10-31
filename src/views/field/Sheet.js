import React from 'react';
import store from '../../redux/store';
import {showSheet} from '../../redux/actions/page-actions';


export default class Sheet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modified: false,
            value   : props.defaultValue,
            menus: props.options
        }
        let _this = this;
        this.showSheet = this.showSheet.bind(this);
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
            modified: true
        })
    }
    showSheet() {
        store.dispatch(showSheet(this.state.menus, (label)=>{
            this.selectOption(label);
        }));
    }
    render(){
        return (
            <div className={`field-input field-input-sheet`}>
                <div className={`field-input-value`} onClick={this.showSheet}>
                    <span>{this.state.value}</span>
                </div>
            </div>
        )
    }
}