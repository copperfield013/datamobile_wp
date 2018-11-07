import React from 'react';
import EntityItem from "../entity/EntityItem";
import Chooser from '../../utils/Chooser';
import DialogPage from "../common/DialogPage";
import Loading from "../common/Loading";
import utils from "../../utils/Utils";

export default class ArrayEntityItemList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading     : true,
            fetcting    : false,
            queryCriterias  : [],
            pageInfo    : {},
            selectedCount: 0
        }
        this.onComplete = this.onComplete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.hasPrevPage = this.hasPrevPage.bind(this);
        this.hasNextPage = this.hasNextPage.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
        this.chooser = new Chooser();
        this.chooser.bindSelect((chooser)=>{
            this.setState({selectedCount: chooser.selected.length});
        });
    }
    hasPrevPage() {
        if(this.state.pageInfo.totalCount){
            return this.state.pageInfo.pageNo > 1;
        }
        return false;
    }
    hasNextPage() {
        if(this.state.pageInfo.totalCount && this.state.pageInfo.pageSize > 0){
            return this.state.pageInfo.totalCount / this.state.pageInfo.pageSize > this.state.pageInfo.pageNo;
        }
        return false;
    }
    goPrevPage() {
        if(this.hasPrevPage()){
            this.query({
                pageNo: this.state.pageInfo.pageNo - 1
            });
        }
    }
    goNextPage() {
        if(this.hasNextPage()){
            this.query({
                pageNo: this.state.pageInfo.pageNo + 1
            });
        }
    }
    getReqFieldValueFunc(codes){
        const menuId = this.props.menuId,
            stmplId = this.props.stmplId;
        return function(fieldNames=[]){
            return new Promise(function(resolve){
                if(Array.isArray(codes) && codes.length > 0){
                    let formData = new FormData();
                    formData.append('fields', fieldNames.join());
                    formData.append('codes', codes.join());
                    utils.fetch(`/api/entity/load_entities/${menuId}/${stmplId}`, formData, {notAcceptableRedirect: false}).then((data)=>{
                       resolve(data);
                    });
                }
            });
        }
    }
    onComplete(){
        let codes = this.chooser.collectSelected((item)=>item.code);
        let req = this.getReqFieldValueFunc(codes);
        if(this.props.onComplete){
            this.props.onComplete(codes, req);
        }
    }
    onCancel(){
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }
    query(param={}){
        let formData = new FormData();
        formData.append('pageNo', param.pageNo || this.state.pageInfo.pageNo);
        formData.append('pageSize', param.pageSize || this.state.pageInfo.pageSize);
        formData.append('excepts', (this.props.excepts || []).join());
        for(let key in this.state.queryCriterias){
            formData.append(key, this.state.queryCriterias[key]);
        }
        this.setState({loading: true});
        utils.fetch(`/api/entity/selections/${this.props.menuId}/${this.props.stmplId}`,formData, {notAcceptableRedirect: false}).then((data)=>{
            this.setState({
                loading  : false,
                stmpl    : data.stmpl,
                entities : data.entities,
                criterias: data.criterias,
                pageInfo        : {
                    ...data.pageInfo,
                    totalCount: data.pageInfo.count
                }
            });
        });
    }
    componentDidMount(){
        this.query();
    }
    componentWillUpdate(props, state){
    }
    render() {
        return (
            <DialogPage ref={(ins)=>this.dialog = ins} show={true} onComplete={this.onComplete} onCancel={this.onCancel}>
                {
                    this.state.loading?
                        <Loading show={true}/>:
                    <div className="array-entity-item-list">
                        <div className="array-entity-item-list-header">
                            <div>已选择了{this.state.selectedCount}项</div>
                        </div>
                        <div className="array-entity-item-list-container">
                            <div className="array-entity-item-list-wrapper">
                                <div className="array-entity-item-list-meta">
                                    <div className="load-prev-page" onClick={this.goPrevPage}>
                                        {
                                            this.hasPrevPage()?
                                                <p>上一页</p>:
                                                null
                                        }
                                    </div>
                                    <span className="entity-list-meta-count">第{this.state.pageInfo.pageNo}页，共{this.state.pageInfo.totalCount}条</span>
                                </div>
                                {this.state.entities.map((entity, index)=>{
                                    return <EntityItem chooser={this.chooser} entity={entity} key={entity.code} />
                                })}
                            </div>
                            <div className="load-next-page" onClick={this.goNextPage}>
                                {
                                    this.hasNextPage()?
                                        <p>点击加载下一页</p>:
                                        <p>没有更多了</p>
                                }
                            </div>
                        </div>
                    </div>
                }
            </DialogPage>
        )
    }






}