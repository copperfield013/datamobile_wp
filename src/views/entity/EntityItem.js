import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Dialog from '../common/Dialog';
import utils from "../../utils/Utils";

class EntityItem extends Component{
    constructor() {
        super();
        this.state = {
            selected: false
        }
        this.removeEntity = this.removeEntity.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        if(this.props.chooser){
            let chooser = this.props.chooser;
            chooser.select(this.props.entity).then((selected)=>{
                this.setState({selected})
            });
        }
    }
    render() {
        let entity = this.props.entity;
        return (
            <div onClick={this.onClick} className={`entity-item ${this.state.selected?'selected':''}`}>
               <i className="entity-item-index">{entity.index + 1}</i>
               <div className="entity-item-fields">
                   {entity.fields.map((field)=>{
                      return <div className="entity-item-field-group" key={field.id}>
                          <label>{field.title}</label>
                          <span>{field.value}</span>
                      </div>
                   })}
               </div>
                {
                    this.props.chooser?null:
                        <div className="entity-operate-btn-area">
                            <Link className="btn-detail" to={`/entity/detail/${this.props.menuId}/${entity.code}`}>详情</Link>
                            <Link className="btn-update" to={`/entity/update/${this.props.menuId}/${entity.code}`}>修改</Link>
                            <a className="btn-remove" onClick={()=>{this.refs.dialog.confirm('确认删除', '删除', this.removeEntity)}}>删除</a>
                            <Dialog ref="dialog" />
                        </div>
                }
                {
                    this.state.selected?
                        <span className={`selected-mark`}><span></span><i className="iconfont icon-checked-simple"></i></span>:null
                }
            </div>
        )
    }

    /**
     * 发送请求从服务端移除当前实体
     */
    removeEntity() {
        utils.fetch(`/api/entity/remove/${this.props.menuId}/${this.props.entity.code}`, {
            method: 'DELETE'
        }).then((res)=>res.json().then((data)=>{
           if(data.status === 'suc'){
               this.refs.dialog.alert('删除成功').then(()=>{
                   if(typeof this.props.removeMethod === 'function'){
                        this.props.removeMethod();
                   }
               });
           }
        }));
    }

}

export default EntityItem;