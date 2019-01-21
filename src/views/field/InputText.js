import React from 'react';
import Input from "./Input";
import ContentEditable from "react-contenteditable";

class InputText extends Input{
    getValue() {
        return this.refs.textarea.getEl().textContent;
    }
    render() {
        return (
            <div className={`field-input-component input-text`}>
    <ContentEditable
        ref="textarea"
        className={`textarea`}
        html={this.props.fieldValue.getValue()} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        />
    </div>
        )
    }
}

export default InputText;