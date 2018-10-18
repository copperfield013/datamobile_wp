import React from 'react';

import EntityItem from './EntityItem';
import EntitySearch from './EntitySearch';
import Drawer from '../common/Drawer';
import store from '../../redux/store';
import {setTitle} from "../../redux/actions/page-actions";
import Loading from "../common/Loading";
import DragForLoad from '../common/DragForLoad';
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
            entities    : null
        };

    }

    componentDidMount() {
        fetch(`/api/entity/list/${this.props.match.params.menuId}`).then((res)=>res.json().then((data)=>{
            this.setState({
                entityLoaded    : true,
                entities : data.entities
            });
            store.dispatch(setTitle(`易+(${this.state.module.title}列表)`));
        }));
    }
    componentWillMount () {

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
                            <span className="entity-list-meta-count">共100条</span>
                        </div>
                        {this.state.entities.map((entity)=>{
                            return <EntityItem menuId={this.props.match.params.menuId} entity={entity} key={entity.code} />
                        })}
                    </div>
                    <DragForLoad container={()=>this.refs.entityListContainer} position="bottom" />
                </div>
                <Drawer drawer={this.props.menuBinder}>
                    <EntitySearch ltmpl={this.state.ltmpl} menuId={this.props.match.params.menuId} criteriaMap={this.state.criteriaMap} />
                </Drawer>

            </div>

        );
    }
}

export default EntityList;