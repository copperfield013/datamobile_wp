import React from 'react';
import FieldValue from "./FieldValue";
import FieldDialog from "./FieldDialog";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";

class FieldInput extends React.Component{
    constructor() {
        super();
        this.showDialog = this.showDialog.bind(this);
    }
    showDialog() {
        let value = this.refs.value;
        let dialog = this.refs.dialog;
        if(value && dialog){
            dialog.showWith(value);
        }
    }
    render() {
        if(this.props.field){
            let field = this.props.field;
            let input = null;
            switch (field.type) {
                case 'text' :
                    input = InputText;
                    break;
                case 'select':
                    input = InputSelect;
                    break;
                case 'date':
                    input = InputDate;
                    break;
            }
            return (
                <div className={`field-input field-input-${field.type}`}>
                    <div onClick={this.showDialog}>
                        <FieldValue ref="value" field={field} />
                    </div>
                    {input?
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