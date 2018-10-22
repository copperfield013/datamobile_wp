import React from 'react';
import {Form, FormCell, CellHeader, CellBody, CellFooter, Switch, Select, Input, Label} from 'react-weui';
import LinkIcon from '../common/LinkIcon'
class EntitySearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reversed    : false,
            criterias   : props.criterias
        };
        this.criteriaFields = [];
        this.onChange = this.onChange.bind(this);
        this.query = this.query.bind(this);
        this.getSearchCriterias = this.getSearchCriterias.bind(this);
        this.renderCriteriaGroup = this.renderCriteriaGroup.bind(this);
        this.renderCriteriaValue = this.renderCriteriaValue.bind(this);
    }
    componentWillUpdate(){
        this.criteriaFields = [];
    }
    onChange(e) {
        this.setState({
           reversed:  !e.target.checked
        });
    }
    query() {
        if(this.props.search){
            const criterias = this.getSearchCriterias();
            this.props.search(criterias);
        }
    }
    getSearchCriterias(){
        let criterias = {};
        this.criteriaFields.forEach((criteriaField)=>{
            criterias[criteriaField.getName()] = criteriaField.getValue();
        });
        return criterias;
    }
    renderCriteriaGroup(criteria){
        if(criteria != null
            && criteria.queryShow == 1
            && criteria.title){
            return (
                <div key={criteria.id} className={`entity-criteria-group ${criteria.fieldAvailable? '': 'field-unavailable'}`}>
                    <label className="criteria-title">{criteria.title}</label>
                    <div className="criteria-value">
                        {this.renderCriteriaValue(criteria)}
                    </div>
                </div>
            )
        }
    }
    renderCriteriaValue(criteria){
        let criteriaField = new CriteriaField(`criteria_${criteria.id}`);
        switch (criteria.inputType) {
            case 'text' :
                let $text = <input ref={criteriaField.getName()} type="text" placeholder={criteria.placeholder} defaultValue={criteria.value} />;
                criteriaField.setValueGetter(()=>this.refs[criteriaField.getName()].value)
                this.criteriaFields.push(criteriaField);
                return (
                    <span>{$text}</span>
                );
            default:
                return <span>(未知类型:{criteria.inputType})</span>;
        }
    }
    render() {
        return (
            <div className="entity-search">
                <div className="entity-search-container">
                    <div className="entity-search-wrapper">
                        <h3>页码/每页条数</h3>
                        <div className="entity-search-page-info">
                            <div>
                                <input type="number" defaultValue={this.props.pageInfo.pageNo} />
                            </div>
                            /
                            <div>
                                <input type="number"  defaultValue={this.props.pageInfo.pageSize} />
                            </div>
                        </div>
                    </div>
                    <div className="entity-search-wrapper">
                        <h3>顺序字段</h3>
                        <Form select="true">
                            <FormCell select>
                                <CellBody>
                                    <Select defaultValue="1">
                                        <option value="1">姓名</option>
                                        <option value="2">编码</option>
                                    </Select>
                                </CellBody>
                            </FormCell>
                        </Form>
                        <Form>
                            <FormCell switch>
                                <CellBody>{this.state.reversed? '逆序': '顺序'}</CellBody>
                                <CellFooter>
                                    <Switch defaultChecked={!this.state.reversed} onChange={this.onChange} />
                                </CellFooter>
                            </FormCell>
                        </Form>
                    </div>
                    <div className="entity-search-wrapper">
                        <h3>查询条件</h3>
                        {
                            this.state.criterias.map((criteria)=>{
                                return this.renderCriteriaGroup(criteria);
                            })
                        }
                    </div>
                </div>
                <div className="entity-search-operate-area">
                    <LinkIcon links={['home', 'user']}/>
                    <span>
                        <button className="weui-btn weui-btn_mini weui-btn_plain-primary" type="button" ref="resetButton" id="restButton" >重置</button>
                        <button className="weui-btn weui-btn_mini weui-btn_primary" onClick={this.query} type="button" ref="queryButton" id="queryButton" >查询</button>
                    </span>
                </div>
            </div>
        )
    }
}

class CriteriaField{
    constructor(name){
        this.name = name;
        this.valueGetter = null;
    }
    getName(){
        return this.name;
    }
    getValue(){
        if(this.valueGetter){
            return this.valueGetter();
        }
        return '';
    }
    setValueGetter(valGetter) {
        if(typeof valGetter === 'function'){
            this.valueGetter = valGetter;
        }
    }
}

export default EntitySearch;