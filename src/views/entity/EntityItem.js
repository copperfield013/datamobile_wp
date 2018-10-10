import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EntityItem extends Component{
    render() {
        let entity = this.props.entity;
        return (
            <div className="entity-item">
               <div className="entity-item-fields">
                   {entity.fields.map((field)=>{
                      return <div className="entity-item-field-group" key={field.id}>
                          <label>{field.title}</label>
                          <span>{field.value}</span>
                      </div>
                   })}
               </div>
                <div className="entity-operate-btn-area">
                    <Link className="btn-detail" to={`/entity/detail/${this.props.menuId}/${entity.code}`}>详情</Link>
                    <Link className="btn-update" to={`/entity/update/${this.props.menuId}/${entity.code}`}>修改</Link>
                    <a className="btn-remove" href="javascript:;">删除</a>
                </div>
                <i className="entity-item-index">{entity.index + 1}</i>
            </div>
        )
    }
}

export default EntityItem;