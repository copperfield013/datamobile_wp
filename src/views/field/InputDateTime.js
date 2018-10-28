import React from 'react';
import InputDate from "./InputDate";
import DatePicker from 'react-mobile-datepicker';

class InputDateTime extends InputDate{
    constructor(props){
        super(props);
        this.format = 'YYYY-MM-DD HH:mm:ss';
    }
    render(){
        if(!this.state.isOpen){
            return null;
        }else{
            return (
                <DatePicker
                    dateFormat={['YYYY', 'MM', 'DD', 'hh', 'mm', 'ss']}
                    value={this.state.value}
                    isOpen={true}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel} />
            )
        }
    }
}

export default InputDateTime;