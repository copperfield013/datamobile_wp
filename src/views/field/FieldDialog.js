import React from 'react';
import DialogPage from '../common/DialogPage';

class FieldDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show        : props.show === true,
            fieldValue  : null
        }
        this.showWith = this.showWith.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }
    showWith(fieldValue) {
        this.setState({
            fieldValue : fieldValue
        });
        this.dialog.show();
    }
    onComplete(){
        if(this.refs.input){
            let value = this.refs.input.getValue();
            this.props.onComplete(value);
        }
    }
    render() {
        return (
            <DialogPage ref={(ins)=>this.dialog = ins} show={this.state.show} onComplete={this.onComplete}>
                {
                    React.createElement(this.props.input, {
                        ref     : 'input',
                        field   : this.props.field,
                        fieldValue   : this.state.fieldValue
                    })
                }
            </DialogPage>
        )
    }
}

export default FieldDialog;