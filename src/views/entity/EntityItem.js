import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Dialog} from 'react-weui';
import store from '../../redux/store';
import {confirm} from '../../redux/actions/dialog-actions';

class EntityItem extends Component{
    constructor() {
        super();
        this.state = {
        }
    }
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
                    <a className="btn-remove" onClick={()=>store.dispatch(confirm('删除', '确认删除'))}>删除</a>
                </div>
                <i className="entity-item-index">{entity.index + 1}</i>
            </div>
        )
    }

    /**
     * 发送请求从服务端移除当前实体
     */
    removeEntity() {

    }

}

export default EntityItem;