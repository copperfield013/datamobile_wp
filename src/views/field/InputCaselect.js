import React from 'react';
import Input from './Input';
import {Toast} from 'react-weui';
import SearchBar from '../common/SearchBar';
let SPLITER = '->';
class InputCaselect extends Input{
    constructor(props) {
        super(props);
        this.state = {
            multiple    : props.multiple === true,
            options     : [],
            activeLevel : null,
            showLoading : true
        };
        if(props.field && props.field.optionKey){
            let regex = /^(\d+)@(\d+)$/;
            if(regex.test(props.field.optionKey)){
                let match = regex.exec(props.field.optionKey);
                this.state.optionGroupId = match[1];
                this.state.maxLevel = parseInt(match[2]);
            }
        }
        this.value = props.fieldValue.getValue();
        this.selectOption = this.selectOption.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getValueItems = this.getValueItems.bind(this);
        this.onItemActivated = this.onItemActivated.bind(this);
    }
    selectOption(option, e) {
        if(option){
            let thisLevel = this.state.activeLevel;
            let thisLevelItem = this.getLevelItem(thisLevel);
            if(thisLevelItem){
                thisLevelItem.selectOption(option);
                if(thisLevel < this.state.maxLevel){
                    this.setLevelOptionGroupId(thisLevel + 1, option.id).then(()=>{
                        this.iterateLevelItem(thisLevel + 1, (item, level)=>{
                           item.unselectOption();
                           if(level > thisLevel + 1){
                               item.setOptionGroupId(null);
                           }
                        });
                        this.activateLevel(thisLevel + 1);
                    }, ()=>this.activateLevel(thisLevel + 1));
                }
            }
        }
    }
    getValue() {
        let value = '';
        this.iterateLevelItem((item)=>{
            let itemTitle = item.getTitle() || '';
            value += itemTitle + SPLITER;
        });
        if(value.endsWith(SPLITER)) {
            return value.substring(0, value.length - SPLITER.length);
        }
        return value;
    }

    getValueItems() {
        if(this.state.maxLevel){
            let items = new Array(this.state.maxLevel);
            let vs = this.value.split('->');
            for(let i = 0; i < this.state.maxLevel; i++){
                if(vs[i]){
                    items[i] = vs[i];
                }else{
                    items[i] = '';
                }
            }
            return items;
        }
        return [];
    }

    getLevelItem(level) {
        return this.refs[`item_${level}`];
    }
    setLevelOptionGroupId(level, optionGroupId){
        let levelItem = this.getLevelItem(level);
        if(levelItem){
            return levelItem.setOptionGroupId(optionGroupId);
        }else{
            return new Promise((resolve, reject)=>reject());
        }
    }
    activateLevel(level){
        if(this.state.activeLevel !== level){
            let levelItem = this.getLevelItem(level);
            if(levelItem){
                levelItem.activate();
            }
        }
    }
    iterateLevelItem(from, consumer){
        if(typeof from === 'function'){
            consumer = from;
            from = 1;
        }
        for(let i = from; i <= this.state.maxLevel; i++){
            let levelItem = this.getLevelItem(i);
            consumer(levelItem, i);
        }
    }
    onItemActivated(levelItem, level){
        if(levelItem){
            let _this = this;
            this.setState({
                activeLevel: level,
                showLoading: true
                });
            this.searchBar.setValue(levelItem.getCriteriKeyword());
            this.iterateLevelItem((item)=>{
                if(item !== levelItem){
                    item.inactivate();
                }
            });
            levelItem.loadOptionList().then((options)=>{
                _this.showOptionList(options);
            });
        }
    }
    showOptionList(options) {
        this.setState({options, showLoading: false});
    }
    initLevelItemFrom(level, optionGroupId, valueItems){
        let levelItem = this.getLevelItem(level);
        if(levelItem){
            let _this = this;
            levelItem.setOptionGroupId(optionGroupId).then(function(){
                levelItem.loadOptionList().then(function(options){
                    if(options){
                        let defValue = valueItems[level - 1];
                        for(let i = 0; i < options.length; i++){
                            if(options[i].title === defValue){
                                levelItem.setSelectedOption(options[i]);
                                _this.initLevelItemFrom(level + 1, options[i].id, valueItems);
                                return ;
                            }
                        }
                    }
                    _this.activateLevel(1);
                });
            });
        }else{
            this.activateLevel(1);
        }

    }
    componentDidMount() {
        let valueItems = this.getValueItems();
        this.initLevelItemFrom(1, this.state.optionGroupId, valueItems);
    }
    onSearch(text){
        let _this = this;
        let activeItem = this.getLevelItem(this.state.activeLevel);
        if(activeItem){
            let showOptions = function(){
                activeItem.loadOptionList().then((options)=>{
                    _this.showOptionList(options)
                });
            };
            if(text){
                activeItem
                    .setCriteria({keyword: text})
                    .then(showOptions);
            }else{
                activeItem
                    .setCriteria(null)
                    .then(showOptions);
            }
        }
    }
    render() {
        return (
            <div className={`field-input-component input-caselect`}>
                <div className={`input-caselect-source`}>
                    {this.getValueItems().map((item, index)=>{
                        let level = index + 1;
                        return <CaselectLevelItem
                                    key={index}
                                    ref={`item_${level}`}
                                    onActivate={(item)=>{this.onItemActivated(item, level)}}
                                />
                    })}
                </div>
                <div className={`input-caselect-search`}>
                    <SearchBar ref={(ins)=>this.searchBar = ins} onChange={this.onSearch.bind(this)} />
                </div>
                <div ref="list" className={`input-caselect-list`}>
                    <div ref="lcontainer" className={`input-caselect-list-container`}>
                        <div ref="wrapper" className={`input-caselect-list-wrapper`}>
                            {this.state.options?
                                this.state.options.map((option, index)=>{
                                return <div key={index} onClick={(e)=>this.selectOption(option, e)}>
                                    <label>{option.title}</label>
                                </div>
                            })
                                :null}
                        </div>
                    </div>
                </div>
                <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
            </div>
        )

    }
}
class CaselectLevelItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLast  : false,
            active  : false,
            selectedOption : null,
            optionGroupId: null,
            options: null
        }
        this.loadOptionList = this.loadOptionList.bind(this);
    }
    activate() {
        if(this.state.optionGroupId && !this.state.active){
            this.setState({active: true});
            (this.props.onActivate || function(){})(this);
        }
    }
    inactivate(){
        if(this.state.active){
            this.setState({active:false});
        }
    }
    unselectOption(){
        this.setState({
            selectedOption: null,
            options : null
        });
    }
    selectOption(option, e){
        this.setState({
            selectedOption: option
        });
    }
    setSelectedOption(option){
        this.setState({selectedOption: option});
    }
    setOptionGroupId(optionGroupId) {
        let _this = this;
        return new Promise(function(resolve, reject){
            if(_this.state.optionGroupId !== optionGroupId){
                _this.setState({optionGroupId: optionGroupId, options: null, criteria: null}, resolve);
            }else{
                reject();
            }
        });

    }
    getTitle() {
        if(this.state.selectedOption){
            return this.state.selectedOption.title;
        }
    }
    setCriteria(criteria){
        return new Promise((resolve, reject)=>{
            this.setState({criteria}, function(){
                resolve(criteria);
            });
        });
    }
    getCriteriKeyword(){
        if(this.state.criteria && this.state.criteria.keyword){
            return this.state.criteria.keyword;
        }else{
            return '';
        }
    }
    render(){
        return (
            <span onClick={()=>this.activate()}
                  className={`input-caselect-item ${this.state.active? 'active': ''}`}>
                <span ref={`item_text`} className="text">{this.getTitle()}</span>
                <span className="chevron"></span>
            </span>
        );
    }
    loadOptionList() {
        let _this = this;
        return new Promise((resolve, reject)=>{
            if(_this.state.options == null) {
                if(_this.state.optionGroupId){
                    fetch(`/api/field/cas_ops/${_this.state.optionGroupId}`).then((res)=>res.json().then((data)=>{
                        if(data.options != null){
                            _this.setState({options:data.options}, function(){
                                _this.loadOptionList().then((options)=>{
                                    resolve(options);
                                })
                            });
                        }
                    }));
                }
            }else{
                let fOptions = _this.state.options;
                if(_this.state.criteria){
                    let keyword = _this.state.criteria.keyword;
                    if(keyword){
                        fOptions = _this.state.options.filter((option)=>{
                            if(option && option.title.indexOf(keyword) >= 0){
                                return true;
                            }
                            return false;
                        });
                    }
                }
                resolve(fOptions);
            }
        });
    }
}


export default InputCaselect;