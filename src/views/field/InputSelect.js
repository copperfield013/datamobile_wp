import React from 'react';
import Input from './Input';

class InputSelect extends Input{
    constructor(props) {
        super(props);
        this.state = {
            multiple    : props.multiple === true,
            options     : []
        };
        this.selectOption = this.selectOption.bind(this);
        this.activeSearchText = this.activeSearchText.bind(this);
        this.onBlurSearchText = this.onBlurSearchText.bind(this);
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
    render() {
        if(!this.state.options){
            return <p>加载中...</p>
        }else{
            console.log(this.state.options);
            return (
                <div className={`field-input-component input-select`}>
                    <div className={`input-select-search`}>
                        <input onBlur={this.onBlurSearchText} ref="searchText" type="search"/>
                        <span ref="searchIcon" onClick={this.activeSearchText} className={`search-icon`}><i className={`iconfont icon-search`}></i>搜索</span>
                    </div>
                    <div className={`input-select-list`}>
                        <div className={`input-select-list-wrapper`}>
                            {this.state.options.map((option, index)=>{
                                return <div key={index} onClick={(e)=>this.selectOption(option, e)}>
                                    <label>{option.title}</label>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default InputSelect;