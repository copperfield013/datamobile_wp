import React from 'react';
import Input from './Input';

class InputCaselect extends Input{
    constructor(props) {
        super(props);
        this.state = {
            multiple    : props.multiple === true,
            options     : [],
            activeLevel : 0
        };
        this.value = props.fieldValue.getValue();
        this.selectOption = this.selectOption.bind(this);
        this.activeSearchText = this.activeSearchText.bind(this);
        this.onBlurSearchText = this.onBlurSearchText.bind(this);
        this.getValueItems = this.getValueItems.bind(this);
    }
    selectOption(option, e) {
        if(e.currentTarget){
            if(this.selected && !this.state.multiple){
                this.selected.dom.classList.remove('selected');
            }
            e.currentTarget.classList.add('selected');
            this.selected = {
                option  : option,
                dom     : e.currentTarget
            };
        }
    }
    getValue() {
        if(this.selected){
            return this.selected.option.value;
        }
    }
    componentDidMount() {
        console.log(this.props.field);
        if(this.props.field && this.props.field.fieldId){
            let formData = new FormData();
            formData.append("fieldIds", this.props.field.fieldId);
            fetch(`/api/field/options`,
                {method: 'POST', body: formData}).then((res)=>res.json().then((data)=>{
                this.setState({
                    options: data.optionsMap[data.keyPrefix + this.props.field.fieldId]
                });
            }));
        }
    }
    activeSearchText() {
        this.refs.searchIcon.style.display = 'none';
        this.refs.searchText.style.display = 'block';
        this.refs.searchText.focus();
    }
    onBlurSearchText() {
        let text = this.refs.searchText.value;
        if(!text){
            this.refs.searchIcon.style.display = 'block';
            this.refs.searchText.style.display = 'none';
        }
    }
    filter(keyword) {

    }
    getValueItems() {
        if(this.props.field && this.props.field.optionKey){
            let regex = /^(\d+)@(\d+)$/;
            if(regex.test(this.props.field.optionKey)){
                let match = regex.exec(this.props.field.optionKey);
                let fieldId = match[1];
                let length = parseInt(match[2]);
                let items = new Array(length);
                let value = this.value;
                if(value){
                    let vs = value.split('->');
                    for(let i = 0; i < length; i++){
                        if(vs[i]){
                            items[i] = vs[i];
                        }else{
                            items[i] = '';
                        }
                    }
                }
                return items;
            }
        }
        return [];
    }
    selectLevel(level) {
        this.setState({activeLevel: level});
    }
    render() {
        if(!this.state.options){
            return <p>加载中...</p>
        }else{
            return (
                <div className={`field-input-component input-caselect`}>
                    <div className={`input-caselect-source`}>
                        {this.getValueItems().map((item, index)=>{
                            return <span key={index}
                                        onClick={()=>this.selectLevel(index)}
                                        className={`input-caselect-item ${index === this.state.activeLevel? 'active': ''}`}>
                                        <span>{item}</span>
                                        <span className="chevron"></span>
                                    </span>
                        })}
                    </div>
                    <div className={`input-caselect-search`}>
                        <input onBlur={this.onBlurSearchText} ref="searchText" type="search"/>
                        <span ref="searchIcon" onClick={this.activeSearchText} className={`search-icon`}><i className={`iconfont icon-search`}></i>搜索</span>
                    </div>
                    <div ref="list" className={`input-caselect-list`}>
                        <div ref="lcontainer" className={`input-caselect-list-container`}>
                            <div ref="wrapper" className={`input-caselect-list-wrapper`}>
                                {this.state.options.map((option, index)=>{
                                    return <div key={index} onClick={(e)=>this.selectOption(option, e)}>
                                        <label>{option.title}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default InputCaselect;