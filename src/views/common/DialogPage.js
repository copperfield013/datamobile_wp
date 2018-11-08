import React from 'react';

class DialogPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show        : props.show === true
        }
        this.hide = this.hide.bind(this);
        this.cancel = this.cancel.bind(this);
        this.complete = this.complete.bind(this);
        this.getContainer = this.getContainer.bind(this);
    }
    cancel() {
        if(this.props.onCancel){
            this.props.onCancel(this);
        }
        this.hide();
    }
    complete(){
        if(this.props.onComplete){
            this.props.onComplete(this);
        }
        this.hide();
    }
    hide(){
        this.setState({
            show    : false
        });
    }
    show(){
        this.setState({
            show    : true
        })
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
            let _this = this;
            setTimeout(function(){
                _this.dialog.classList.add('show');
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
                    this.mainContainer = null;
                    this.mainContainerScrollTop = null;
                }
            }
            return null;
        }
        if($container && !$container.classList.contains('lock')){
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
            <div ref={(ins)=>this.dialog = ins} className="field-dialog">
                <div className={`field-dialog-cover`}></div>
                <div className="field-dialog-header">
                    <span onClick={this.cancel} action="cancel">取消</span>
                    <span onClick={this.complete} action="complete">完成</span>
                </div>
                <div className="field-dialog-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default DialogPage;