import React from 'react';

import EntityItem from './EntityItem';
import EntitySearch from './EntitySearch';
import Drawer from '../main/Drawer';
class EntityList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            module  : {
                title   : '测试'
            },
            menuId  : props.menuId,
            ltmpl   : {
                id          : 1,
                criterias   : [],
                columns     : [],
            },
            criteriaMap : {

            },
            entities    : [
                {
                    code    : "1",
                    title   : "张三",
                    index   : 0,
                    fields  : [
                        {
                            id      : 1,
                            title   : "姓名",
                            value   : "张三",
                        },
                        {
                            id      : 2,
                            title   : "编码",
                            value   : "1"
                        }
                    ]
                },
                {
                    code    : "2",
                    title   : "李四",
                    index   : 1,
                    fields  : [
                        {
                            id      : 1,
                            title   : "姓名",
                            value   : "李四",
                        },
                        {
                            id      : 2,
                            title   : "编码",
                            value   : "2"
                        }
                    ]
                },
                {
                    code    : "3",
                    title   : "李四",
                    index   : 2,
                    fields  : [
                        {
                            id      : 1,
                            title   : "姓名",
                            value   : "李四",
                        },
                        {
                            id      : 2,
                            title   : "编码",
                            value   : "3"
                        }
                    ]
                },
                {
                    code    : "4",
                    title   : "李四",
                    index   : 3,
                    fields  : [
                        {
                            id      : 1,
                            title   : "姓名",
                            value   : "李四",
                        },
                        {
                            id      : 2,
                            title   : "编码",
                            value   : "4"
                        }
                    ]
                },
                {
                    code    : "5",
                    title   : "李四",
                    index   : 4,
                    fields  : [
                        {
                            id      : 1,
                            title   : "姓名",
                            value   : "李四",
                        },
                        {
                            id      : 2,
                            title   : "编码",
                            value   : "5"
                        }
                    ]
                }
            ]
        };

    }
    componentDidMount () {
        this.props.menuBinder.setTitle(`易+(${this.state.module.title}列表)`);
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
                            return <EntityItem entity={entity} key={entity.code} />
                        })}
                    </div>
                </div>
                <Drawer drawer={this.props.menuBinder}>
                    <EntitySearch ltmpl={this.state.ltmpl} menuId={this.state.menuId} criteriaMap={this.state.criteriaMap} />
                </Drawer>
            </div>

        );
    }
}

export default EntityList;