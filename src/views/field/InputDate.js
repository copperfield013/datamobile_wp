import React from 'react';
import Input from "./Input";
import DatePicker from 'react-mobile-datepicker';
import moment from 'moment';

class InputDate extends Input{
    constructor(props) {
        super(props);
        this.format = 'YYYY-MM-DD';
        this.state = {
            isOpen  : false
        };
        this.getValue = this.getValue.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    getValue() {
        return this.refs.date.text;
    }
    handleSelect(value) {
        if(typeof this.props.onComplete === 'function'){
            let dateStr = '';
            if(value){
                dateStr = moment(value).format(this.format);
            }
            this.props.onComplete(dateStr);
        }
        this.setState({isOpen: false});
    }
    handleCancel() {
        this.setState({
            isOpen  : false
        });
    }
    showWith(fieldValue) {
        if(fieldValue){
            let value = fieldValue.getValue();
            if(typeof value === 'string'){
                let m = moment(value, this.format);
                if(m.isValid()){
                    value = m.toDate();
                }else{
                    value = new Date();
                }
            }
            this.setState({
               isOpen   : true,
               value    : value
            });
        }
    }
    componentDidMount(){

    }
    render() {
        if(!this.state.isOpen){
            return null;
        }else{
            return (
                <DatePicker
                    value={this.state.value}
                    isOpen={true}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel} />
            )
        }

    }
}

export default InputDate;