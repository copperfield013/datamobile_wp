import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {registScrollElementsFixed, setTitle} from "../../redux/actions/page-actions";
import Drawer from "../common/Drawer";
import EntityHistory from './EntityHistory'
import FieldValue from '../field/FieldValue';
import Loading from "../common/Loading";
import queryString from 'query-string';
import utils from "../../utils/Utils";

class EntityDetail extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.history);
        this.state = {
            entityListURL: `/entity/list/${props.match.params.menuId}`,
            entity: null
        };
    }
    componentWillMount () {

    }
    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        let formData = new FormData();
        if(query.hid){
            formData.append('historyId', query.hid);
        }

        utils.fetch(`/api/entity/curd/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`,formData)
            .then((data)=>{
                if(data.entity){
                    this.setState({
                        entity : data.entity,
                        history: data.history,
                        registScroll: true
                    }, ()=>{
                        store.dispatch(setTitle(`详情-${this.state.entity.title || ''}`));
                    });
                }
            });
    }
    renderFields(fields) {
        return fields.map((field)=>
            <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'}`}>
                <label>{field.title}</label>
                <div>
                    <FieldValue field={field} />
                </div>
                {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
            </div>
        )
    }
    renderArray(array) {
        return array.map((compositeEntity, index)=>
            <Folder key={`${compositeEntity.code}-${index}`} className="entity-field-group-array">
                <em>{index + 1}</em>
                {
                    compositeEntity.relation?
                        <div className="entity-field">
                            <label>关系</label>
                            <div>{compositeEntity.relation}</div>
                        </div>:''
                }
                {compositeEntity.fields.map((field)=>
                    <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'}`}>
                        <label>{field.title}</label>
                        <div>
                            <FieldValue field={field} />
                        </div>
                        {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
                    </div>

                )}
            </Folder>
        );
    }
    componentDidUpdate(props, state){
        console.log(`registScroll=${state.registScroll}`);
        if(state.registScroll){
            this.setState({
                registScroll: false
            }, ()=>{
                let t = this.$entityDetail.getElementsByClassName('entity-field-group-title');
                registScrollElementsFixed('EntityDetail', t);
            })
        }
    }
    render() {
        if(this.state.entity == null){
            return <Loading/>
        }
        return(
            <div>
                <div ref={(instance)=>this.$entityDetail = instance}  className="entity-detail">
                    {
                        this.state.entity.fieldGroups.map((fieldGroup)=>
                            <div key={fieldGroup.id} className="entity-field-group">
                                <div className="entity-field-group-title">
                                    <div><h3>{fieldGroup.title}</h3></div>
                                </div>
                                {fieldGroup.fields != null?
                                    this.renderFields(fieldGroup.fields)
                                    : this.renderArray(fieldGroup.array)}
                            </div>
                        )
                    }
                </div>
                <AlertMenu menuBinder={this.props.menuBinder} >
                    <MenuItem onClick={()=>{this.refs.drawer.toggle(true)}} title="历史" iconfont="icon-history" />
                    <MenuItem href={`/entity/update/${this.props.match.params.menuId}/${this.props.match.params.code}`}
                              title="修改" iconfont="icon-edit" />
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                    {
                        this.state.entityListURL?
                            <MenuItem href={this.state.entityListURL} title="返回列表" iconfont="icon-list"  />
                            : null
                    }
                </AlertMenu>
                <Drawer ref="drawer" registMenu={false}>
                    <EntityHistory data={this.state.history} code={this.props.match.params.code} menuId={this.props.match.params.menuId} />
                </Drawer>
            </div>
        );
    }
}

export default EntityDetail;