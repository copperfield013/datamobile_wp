import React, {Component} from 'react';

import EntityItem from './EntityItem';
class EntityList extends Component{
    render() {
        return (
            <div className="entity-list-container">
                <div className="entity-list-wrapper">
                    <h1>menuId:{this.props.match.params.menuId}</h1>
                    <EntityItem />
                </div>
            </div>
        );
    }
}

export default EntityList;