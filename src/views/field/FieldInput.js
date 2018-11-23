import React from 'react';
import FieldValue from "./FieldValue";
import FieldDialog from "./FieldDialog";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";
import InputDateTime from "./InputDateTime";
import InputCaselect from './InputCaselect';
import Utils from "../../utils/Utils";

class Validators {
    constructor(validatorStrs) {
        this.validatorNames = new Set();
        if(typeof validatorStrs === 'string'){
            let array = validatorStrs.split(',');
            array.forEach((name)=>{
                this.validatorNames.add(name);
            });
        }
    }
    format(prefix=''){
        let array = [];
        this.validatorNames.forEach((name)=>array.push(prefix + name));
        return array.join(' ');
    }
    validate(){
        let result = {
            succeed  : true
        };
        this.validatorNames.forEach((name)=>{
            switch (name) {
                case 'required':

            }
        });

        return result;
    }
}

class FieldInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            field: props.field,
            hiddenValue: props.value
        }
        this.uuid = Utils.uuid(5, 62);
        this.validators = new Validators(props.field && props.field.validators);
        this.showDialog = this.showDialog.bind(this);
        this.validate = this.validate.bind(this);
    }
    getUUID() {
        return this.uuid;
    }
    showDialog() {
        if(this.props.readonly !== true){
            let value = this.refs.value;
            let dialog = this.refs.dialog;
            if(value && dialog){
                dialog.showWith(value);
            }
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
    isHidden(){
        return this.props.hidden === true;
    }
    isStrict(){
        return !!this.props.strict || false;
    }
    validate(){

    }
    render() {
        if(this.props.hidden === true){
            return  <div uuid={this.getUUID()} className={`field-input`}></div>
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
                    case 'label':
                        //input = InputMultipleSelect;
                        break
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
                <div uuid={this.getUUID()} className={`field-input ${this.validators.format('field-input-validator-')} field-input-${field.type}`}>
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