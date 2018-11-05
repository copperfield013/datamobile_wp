import React from 'react';
import Input from './Input';
import SearchBar from "../common/SearchBar";
import utils from '../../utils/Utils';

class InputSelect extends Input{
    constructor(props) {
        super(props);
        this.state = {
            multiple    : props.multiple === true,
            options     : [],
            keyword     : ''
        };
        this.selectOption = this.selectOption.bind(this);
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
            utils.fetch(`/api/field/options`,formData).then((data)=>{
                this.setState({
                    options: data.optionsMap[data.keyPrefix + this.props.field.fieldId]
                });
            });
        }
    }
    onSearch(keyword) {
        this.setState({keyword: keyword});
    }
    render() {
        if(!this.state.options){
            return <p>加载中...</p>
        }else{
            console.log(this.state.options);
            return (
                <div className={`field-input-component input-select`}>
                    <div className={`input-caselect-search`}>
                        <SearchBar ref={(ins)=>this.searchBar = ins} onChange={this.onSearch.bind(this)} />
                    </div>
                    <div className={`input-select-list`}>
                        <div className={`input-select-list-wrapper`}>
                            {this.state.options.map((option, index)=>{
                                if(this.state.keyword && option.title){
                                    if(option.title.indexOf(this.state.keyword) < 0){
                                        return null;
                                    }
                                }
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