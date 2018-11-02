import React from 'react';

export default class SearchBar extends React.Component{
    constructor(){
        super();
        this.clearKeyword = this.clearKeyword.bind(this);
        this.onBlurKeyword = this.onBlurKeyword.bind(this);
        this.onClickLabel = this.onClickLabel.bind(this);
        this.onInput = this.onInput.bind(this);
    }
    clearKeyword(){
        this.keyword.value = '';
        this.keyword.focus();
        this.onInput();
    }
    onBlurKeyword(){
        if(this.keyword.value === ''){
            this.label.style.display = 'block';
        }
    }
    onClickLabel(){
        this.label.style.display = 'none';
        this.keyword.focus();
    }
    onInput(){
        if(this.props.onChange){
            this.props.onChange(this.keyword.value);
        }
    }
    setValue(text){
        this.keyword.value = text;
        if(this.keyword.value){
            this.onClickLabel();
        }
    }
    render() {
        return (
            <div className={`search-bar`}>
                <div className="search-bar-box">
                    <i className="search-bar-icon iconfont icon-search"></i>
                    <input
                        onInput={this.onInput}
                        onBlur={this.onBlurKeyword}
                        ref={(instance)=>this.keyword = instance}
                        type="text"
                        className="search-bar-input"
                        placeholder="请输入关键字"
                        autoComplete="off"
                         />
                    <i onClick={this.clearKeyword} className="search-bar-clear iconfont icon-clear"></i>
                </div>
                <label onClick={this.onClickLabel} ref={(ins)=>this.label = ins} className ="search-bar-label" >
                    <i className = "iconfont icon-search" ></i>
                    <span>搜索</span>
                </label>
            </div>
        );
    }
}