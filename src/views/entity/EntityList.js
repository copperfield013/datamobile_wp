import React from 'react';

import EntityItem from './EntityItem';
import EntitySearch from './EntitySearch';
import Drawer from '../common/Drawer';
import store from '../../redux/store';
import {setTitle} from "../../redux/actions/page-actions";
import {LoadMore } from 'react-weui';
class EntityList extends React.Component{
    constructor(props) {
        super(props);
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
            entities    : [
                /*{code    : "1",title   : "张三",index   : 0,fields  : [{id      : 1,title   : "姓名",value   : "张三"}]}*/
            ]
        };

    }

    componentDidMount() {
        fetch(`/api/entity/list/${this.props.match.params.menuId}`).then((res)=>res.json().then((data)=>{
            this.setState({
                entityLoaded    : true,
                entities : data.entities
            });
        }));
    }
    componentWillMount () {
        store.dispatch(setTitle(`易+(${this.state.module.title}列表)`));
    }
    render() {
        return (
            <div>
                <div className="entity-list-container" >
                    <div className="entity-list-wrapper">
                        <div className="entity-list-meta">
                            <span className="entity-list-meta-count">共100条</span>
                        </div>
                        {this.state.entities.map((entity)=>{
                            return <EntityItem menuId={this.props.match.params.menuId} entity={entity} key={entity.code} />
                        })}
                    </div>
                </div>
                <Drawer drawer={this.props.menuBinder}>
                    <EntitySearch ltmpl={this.state.ltmpl} menuId={this.props.match.params.menuId} criteriaMap={this.state.criteriaMap} />
                </Drawer>

            </div>

        );
    }
}

export default EntityList;