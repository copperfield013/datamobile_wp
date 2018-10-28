import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {setTitle} from "../../redux/actions/page-actions";
import Drawer from "../common/Drawer";
import EntityHistory from './EntityHistory'
import FieldInput from '../field/FieldInput';
import Loading from "../common/Loading";
import queryString from 'query-string';

class EntityUpdate extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.history);
        this.state = {
            entityListURL: props.location.pathname,
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

        fetch(`/api/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`,
            {method: 'POST', body: formData}).then((res)=>res.json().then((data)=>{
            this.setState({
                entity : data.entity,
                history: data.history
            });
            store.dispatch(setTitle(`修改-${this.state.entity.title}`));
        }));
    }
    renderFields(fields) {
        return fields.map((field)=>
            <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'}`}>
                <label>{field.title}</label>
                <div>
                    <FieldInput field={field} />
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
                            <FieldInput field={field}/>
                        </div>
                        {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
                    </div>

                )}
            </Folder>
        );
    }
    render() {
        if(this.state.entity == null){
            return <Loading/>
        }
        return(
            <div>
                <div className="entity-update">
                    {
                        this.state.entity.fieldGroups.map((fieldGroup)=>
                            <div key={fieldGroup.id} className="entity-field-group">
                                <h3 className="entity-field-group-title">{fieldGroup.title}</h3>
                                {fieldGroup.fields != null?
                                    this.renderFields(fieldGroup.fields)
                                    : this.renderArray(fieldGroup.array)}
                            </div>
                        )
                    }
                </div>
                <AlertMenu menuBinder={this.props.menuBinder} >
                    <MenuItem onClick={()=>{this.refs.drawer.toggle(true)}} title="保存" iconfont="icon-save" />
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

export default EntityUpdate;