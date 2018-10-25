import React from 'react';
import Input from "./Input";
import {Input as WeInput} from 'react-weui';

class InputDate extends Input{
    getValue() {
        return this.refs.date.value;
    }
    render() {
        return (
            <div className={`field-input-component input-date`}>
                <input ref="date" type="date" defaultValue="" />
            </div>
        )
    }
}

export default InputDate;