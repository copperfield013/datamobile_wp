import React from 'react';
import Input from "./Input";

class InputText extends Input{
    getValue() {
        return this.refs.textarea.value;
    }
    render() {
        return (
            <div className={`field-input-component input-text`}>
                <textarea ref="textarea" defaultValue={this.props.fieldValue.getValue()}>
                </textarea>
            </div>
        )
    }
}

export default InputText;