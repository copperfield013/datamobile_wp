import React from 'react';
import FieldValue from "./FieldValue";
import FieldDialog from "./FieldDialog";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";
import InputDateTime from "./InputDateTime";
import InputCaselect from './InputCaselect';

class FieldInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            field: props.field,
            hiddenValue: props.value
        }
        if(props.name && props.inputMap){
            props.inputMap.put(props.name, this);
        }
        this.showDialog = this.showDialog.bind(this);
    }
    showDialog() {
        let value = this.refs.value;
        let dialog = this.refs.dialog;
        if(value && dialog){
            dialog.showWith(value);
        }
    }
    getName(){
        return this.props.name;
    }
    getValue(){
        if(this.props.hidden === true){
            return this.state.hiddenValue || '';
        }
        if(this.refs.value){
            return this.refs.value.getValue();
        }else{
            return this.state.field.value || '';
        }
    }
    getField() {
        return this.state.field;
    }
    isModified(){
        if(this.modifield === true){
            return true;
        }
        if(this.refs.value){
            return this.refs.value.isModified();
        }else{
            return false;
        }
    }
    isStrict(){
        return !!this.props.strict || false;
    }
    componentWillUnmount(){
        if(this.props.name && this.props.inputMap){
            this.props.inputMap.remove(this.props.name, this);
        }
    }
    render() {
        if(this.props.hidden === true){
            return null;
        }
        if(this.props.field){
            let field = this.props.field;
            let dialog = null;
            let input = null;
            if(field.available){
                switch (field.type) {
                    //文本框
                    case 'text' :
                        input = InputText;
                        break;
                    //普通下拉选项
                    case 'select':
                        input = InputSelect;
                        break;
                    //日期选择
                    case 'date':
                        dialog = <InputDate
                                ref="dialog"
                                onComplete={(value)=>this.refs.value.setValue(value)}/>;
                        break;
                    //日期时间选择
                    case 'datetime':
                        dialog = <InputDateTime
                            ref="dialog"
                            onComplete={(value)=>this.refs.value.setValue(value)}/>;
                        break;
                    //级联属性
                    case 'caselect':
                        input = InputCaselect;
                        break
                }
            }
            return (
                <div className={`field-input field-input-${field.type}`}>
                    <div className={`field-input-value`} onClick={this.showDialog}>
                        <FieldValue ref="value" field={field} />
                    </div>
                    {dialog?
                        dialog
                        :input?
                            <FieldDialog ref="dialog"
                                         input={input}
                                         field={this.props.field}
                                         onComplete={(value)=>this.refs.value.setValue(value)}
                                         getContainer={this.props.getContainer}
                            />
                            : null}
                </div>
            );
        }
        return (
            <div>字段为空</div>
        );
    }
}

export default FieldInput;