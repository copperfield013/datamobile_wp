import React from 'react';

import EntityItem from './EntityItem';
import EntitySearch from './EntitySearch';
import Drawer from '../common/Drawer';
import store from '../../redux/store';
import {setTitle, go} from "../../redux/actions/page-actions";
import Loading from "../common/Loading";
import queryString from 'query-string';


class EntityList extends React.Component{
    constructor(props, context) {
        super(props, context);
        const query = props.location.query || queryString.parse(props.location.search) || {};
        console.log(query);
        this.state = {
            entityLoaded  : false,
            module  : {
                title   : '测试'
            },
            ltmpl   : {
                id          : 1,
                criterias   : [],
                columns     : [],
            },
            criteriaMap : {

            },
            pageInfo    : {
                pageNo      : query.pageNo || 1,
                pageSize    : query.pageSize || 10,
                totalCount  : NaN

            },
            entities    : null
        };
        this.hasPrevPage = this.hasPrevPage.bind(this);
        this.hasNextPage = this.hasNextPage.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.query = this.query.bind(this);
        this.queryFormData = this.queryFormData.bind(this);
    }
    componentDidMount() {
        this.query();
    }
    query(param={}, formData = new FormData()) {
        formData.append('pageNo', param.pageNo || this.state.pageInfo.pageNo);
        formData.append('pageSize', param.pageSize || this.state.pageInfo.pageSize);
        this.setState({entities: null});
        fetch(`/api/entity/list/${this.props.match.params.menuId}`,
            {method: 'POST', body: formData}).then((res)=>res.json().then((data)=>{
            this.setState({
                entityLoaded    : true,
                entities : data.entities,
                criterias: data.criterias,
                pageInfo        : {
                    ...data.pageInfo,
                    totalCount: data.pageInfo.count
                }
            });
            store.dispatch(setTitle(`易+(${this.state.module.title}列表)`));
        }));
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
    queryFormData(formData) {
        this.query(undefined, formData);
    }
    render() {
        if(this.state.entities == null){
            return <Loading/>
        }
        return (
            <div>
                <div ref="entityListContainer" className="entity-list-container" >
                    <div className="entity-list-wrapper">
                        <div className="entity-list-meta">
                            <div className="load-prev-page" onClick={this.goPrevPage}>
                                {
                                    this.hasPrevPage()?
                                        <p>上一页</p>:
                                        null
                                }
                            </div>
                            <span className="entity-list-meta-count">第{this.state.pageInfo.pageNo}页，共{this.state.pageInfo.totalCount}条</span>
                        </div>
                        {this.state.entities.map((entity)=>{
                            return <EntityItem menuId={this.props.match.params.menuId} entity={entity} key={entity.code} />
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
                <Drawer drawer={this.props.menuBinder}>
                    <EntitySearch ltmpl={this.state.ltmpl}
                                  menuId={this.props.match.params.menuId}
                                  query={this.queryFormData}
                                  criterias={this.state.criterias} />
                </Drawer>

            </div>

        );
    }
}

export default EntityList;