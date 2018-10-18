import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {setTitle} from "../../redux/actions/page-actions";
import Drawer from "../common/Drawer";
import EntityHistory from './EntityHistory'
import {BrowserRouter, Route} from 'react-router-dom';
import FieldValue from './FieldValue';
import Loading from "../common/Loading";

class EntityDetail extends React.Component{
    constructor() {
        super();
        this.state = {
            entity: null
        };
    }
    componentWillMount () {

    }
    componentDidMount() {
        fetch(`/api/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`).then((res)=>res.json().then((data)=>{
            this.setState({
                entity : data.entity
            });
            store.dispatch(setTitle(`详情-${this.state.entity.title}`));
        }));
    }
    renderFields(fields) {
        return fields.map((field)=>
            <div key={field.id} className="entity-field">
                <label>{field.title}</label>
                <div>
                    <FieldValue field={field} />
                </div>
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
                    <div key={field.id} className="entity-field">
                        <label>{field.title}</label>
                        <div>
                            <FieldValue field={field} />
                        </div>
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
                <div className="entity-detail">
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
                    <MenuItem onClick={()=>{this.refs.drawer.toggle(true)}} title="历史" iconfont="icon-history" />
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                </AlertMenu>
                <Drawer ref="drawer" registMenu={false}>
                    <BrowserRouter>
                        <Route exact path="/entity/detail/:menuId/:code" component={EntityHistory} />
                    </BrowserRouter>
                </Drawer>
            </div>
        );
    }
}

export default EntityDetail;