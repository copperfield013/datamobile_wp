import React from 'react';

class FieldDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show        : props.show === true,
            fieldValue  : null,
            mainContainerScrollTop : 0,
            mainContainer     : null,
        }
        this.showWith = this.showWith.bind(this);
        this.cancel = this.cancel.bind(this);
        this.complete = this.complete.bind(this);
        this.getContainer = this.getContainer.bind(this);
    }
    showWith(fieldValue) {
        this.setState({
            show    : true,
            fieldValue : fieldValue
        });
    }
    cancel() {
        this.setState({
            show    : false
        });
    }
    complete(){
        console.log(this.refs.input);
        if(this.refs.input){
            let value = this.refs.input.getValue();
            this.props.onComplete(value);
        }
        this.setState({
            show    : false
        });
    }
    getContainer() {
        if(typeof this.props.getContainer === 'function'){
            return this.props.getContainer();
        }else{
            return document.body;
        }
    }
    componentDidUpdate(){
        if(this.state.show){
            let dialog = this.refs.dialog;
            setTimeout(function(){
                dialog.classList.add('show');
            }, 10);
        }
    }
    componentWillUnmount() {
        let $container = this.getContainer();
        if($container){
            $container.classList.remove('lock');
        }
    }
    render() {
        let $container = this.getContainer();
        if(!this.state.show){
            if($container){
                $container.classList.remove('lock');
                $container.style.top = null;
                if( this.mainContainer && this.mainContainerScrollTop){
                    this.mainContainer.scrollTo(0, this.mainContainerScrollTop);
                }
            }
            return null;
        }
        if($container){
            if($container.parentElement.scrollTop > 0){
                this.mainContainer = $container.parentElement;
            }else{
                this.mainContainer = $container;
            }
            this.mainContainerScrollTop = this.mainContainer.scrollTop;
            $container.classList.add('lock');
            $container.style.top = `${-this.mainContainerScrollTop}px`;
        }
        return (
            <div ref="dialog" className="field-dialog">
                <div className={`field-dialog-cover`}></div>
                <div className="field-dialog-header">
                    <span onClick={this.cancel} action="cancel">取消</span>
                    <span onClick={this.complete} action="complete">完成</span>
                </div>
                <div className="field-dialog-body">
                    {
                        React.createElement(this.props.input, {
                            ref     : 'input',
                            fieldValue   : this.state.fieldValue
                        })
                    }

                </div>
            </div>
        )
    }
}

export default FieldDialog;