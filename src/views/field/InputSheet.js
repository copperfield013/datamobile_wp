import React from 'react';
import store from '../../redux/store';
import {showSheet} from '../../redux/actions/page-actions';
import Utils from "../../utils/Utils";


export default class InputSheet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modified: false,
            value   : props.defaultValue,
            menus: props.options
        }
        let _this = this;
        if(!this.state.value && this.state.menus.length === 1){
            this.state.value = this.state.menus[0];
        }
        this.showSheet = this.showSheet.bind(this);
        this.uuid = Utils.uuid(5, 62);
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
            },
            getUUID() {
                return this.uuid;
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
    componentWillUnmount(){
        if(this.props.name && this.props.inputMap){
            this.props.inputMap.remove(this.props.name, this);
        }
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