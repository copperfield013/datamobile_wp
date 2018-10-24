import React from 'react';
import moment from 'moment';

export default class EntityHistory extends React.Component{
    render(){
        return (
            <div className="entity-history-container">
                <div className="entity-history-wrapper">
                    {
                        this.props.data.map((item)=>{
                            let m = moment(item.time);
                            return (
                                <div key={item.id} className={`entity-history-item ${item.current? 'current': ''}`}>
                                    <div className="entity-history-item-time">
                                        <p>{m.format('HH:mm:ss')}</p>
                                        <p>{m.format('YYYY-MM-DD')}</p>
                                    </div>
                                    <span className="entity-history-item-line">
                                        <em className="entity-history-item-dot"></em>
                                    </span>
                                    <div className="entity-history-item-text-wrap">
                                        <em></em>
                                        <a href={item.current? '#': `/entity/detail/${this.props.menuId}/${this.props.code}?hid=${item.id}`}>操作人：{item.userName}</a>
                                    </div>
                                </div>
                                )

                        })
                    }
                </div>
            </div>
        );
    }
}