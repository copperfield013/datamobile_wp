import React from 'react';

import EntityItem from './EntityItem';
import EntitySearch from './EntitySearch';
import Drawer from '../common/Drawer';
import store from '../../redux/store';
import {setTitle} from "../../redux/actions/page-actions";
import Loading from "../common/Loading";
import queryString from 'query-string';
import {MenuItem} from "../common/AlertMenu";
import AlertMenu from "../common/AlertMenu";


class EntityList extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            fetcting  : false,
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
                totalCount  : NaN

            },
            entities    : null,
            queryCriterias: {}
        };
        this.refreshStateFromProps = this.refreshStateFromProps.bind(this);
        this.refreshStateFromProps(props);
        this.hasPrevPage = this.hasPrevPage.bind(this);
        this.hasNextPage = this.hasNextPage.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
        this.goPrevPage = this.goPrevPage.bind(this);
        this.query = this.query.bind(this);
        this.search = this.search.bind(this);
        this.getLinkURL = this.getLinkURL.bind(this);
    }
    componentDidMount() {
        this.query();
    }
    query(param={}) {
        if(this.state.fetcting){return}
        let formData = new FormData();
        formData.append('pageNo', param.pageNo || this.state.pageInfo.pageNo);
        formData.append('pageSize', param.pageSize || this.state.pageInfo.pageSize);
        for(let key in this.state.queryCriterias){
            formData.append(key, this.state.queryCriterias[key]);
        }
        this.state.fetcting = true;
        fetch(`/api/entity/list/${this.props.match.params.menuId}`,
            {method: 'POST', body: formData}).then((res)=>res.json().then((data)=>{
            this.setState({
                module   : data.module,
                ltmpl    : data.ltmpl,
                entities : data.entities,
                criterias: data.criterias,
                pageInfo        : {
                    ...data.pageInfo,
                    totalCount: data.pageInfo.count
                }
            }, function(){
                store.dispatch(setTitle(`${this.state.ltmpl.title}-列表`));
                this.state.fetcting = false;
                this.refs.drawer.toggle(false);
            });
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
            this.props.history.push(
                this.getLinkURL({pageNo:this.state.pageInfo.pageNo - 1})
            );
        }
    }
    goNextPage() {
        console.log('goNextPage');
        if(this.hasNextPage()){
            this.props.history.push(
                this.getLinkURL({pageNo:this.state.pageInfo.pageNo + 1})
            );
        }
    }
    search(criterias) {
        this.props.history.push(this.getLinkURL(criterias));
    }
    getLinkURL(params={}) {
        let url = `/entity/list/${this.props.match.params.menuId}`;
        let p = Object.assign({
            pageNo  :  this.state.pageInfo.pageNo,
            pageSize: this.state.pageInfo.pageSize
        }, this.state.queryCriterias, params);
        let criteriaSearch = queryString.stringify(p);
        return url + '?' + criteriaSearch;
    }
    refreshStateFromProps(props) {
        const query = props.location.query || queryString.parse(props.location.search) || {};
        this.state.pageInfo.pageNo = query.pageNo || 1;
        this.state.pageInfo.pageSize = query.pageSize || 10;
        this.state.queryCriterias = {};
        Object.keys(query).forEach((key)=>{
            if(/^criteria_\d+$/.test(key)){
                this.state.queryCriterias[key] = query[key];
            }
        });
    }
    componentWillReceiveProps(props){
        console.log('componentWillReceiveProps');
        if(props.location.pathname !== this.props.location.pathname
            || props.location.search !== this.props.location.search){
            console.log('setEntityNull');
            this.state.entities = null;
            this.refreshStateFromProps(props);
        }
    }
    componentDidUpdate(props, state) {
        if(this.state.entities === null){
            this.query();
        }
    }
    render() {
        console.log('render');
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
                        {this.state.entities.map((entity, index)=>{
                            return <EntityItem menuId={this.props.match.params.menuId} entity={entity}
                                               removeMethod={()=>{
                                                   console.log(this.state.entities);
                                                   this.state.entities.splice(this.state.entities.indexOf(entity), 1);
                                                   console.log(this.state.entities);
                                                   this.setState({entities: this.state.entities});
                                               }}
                                               key={entity.code} />
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
                <AlertMenu>
                    <MenuItem onClick={()=>{this.refs.drawer.toggle(true)}} title="查询条件" iconfont="icon-search" />
                    <MenuItem href={`/entity/create/${this.props.match.params.menuId}`} title="创建" iconfont="icon-new" />
                    <MenuItem href="/" title="首页" iconfont="icon-home"  />
                    <MenuItem href="/user" title="用户页" iconfont="icon-user"  />
                </AlertMenu>
                <Drawer ref="drawer" registMenu={false}>
                    <EntitySearch ltmpl={this.state.ltmpl}
                                  menuId={this.props.match.params.menuId}
                                  search={this.search}
                                  pageInfo={this.state.pageInfo}
                                  criterias={this.state.criterias} />
                </Drawer>

            </div>

        );
    }
}

export default EntityList;