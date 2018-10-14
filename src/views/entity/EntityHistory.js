import React from 'react';

export default class EntityHistory extends React.Component{
    render(){
        return (
            <div className="entity-history-container">
                <div className="entity-history-wrapper">
                    <div className="entity-history-item current">
                        <div className="entity-history-item-time">
                            <p>08:48:35</p>
                            <p>2018-05-15</p>
                        </div>
                        <span className="entity-history-item-line">
                            <em className="entity-history-item-dot"></em>
                        </span>
                        <div className="entity-history-item-text-wrap">
                            <em></em>
                            <a>操作人：户户户</a>
                        </div>
                    </div>
                    <div className="entity-history-item">
                        <div className="entity-history-item-time">
                            <p>08:48:35</p>
                            <p>2018-05-15</p>
                        </div>
                        <span className="entity-history-item-line">
                            <em className="entity-history-item-dot"></em>
                        </span>
                        <div className="entity-history-item-text-wrap">
                            <em></em>
                            <a href={`/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`}>操作人：户户户</a>
                        </div>
                    </div>
                    <div className="entity-history-item">
                        <div className="entity-history-item-time">
                            <p>08:48:35</p>
                            <p>2018-05-15</p>
                        </div>
                        <span className="entity-history-item-line">
                            <em className="entity-history-item-dot"></em>
                        </span>
                        <div className="entity-history-item-text-wrap">
                            <em></em>
                            <a href={`/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`}>操作人：户户户</a>
                        </div>
                    </div>
                    <div className="entity-history-item">
                        <div className="entity-history-item-time">
                            <p>08:48:35</p>
                            <p>2018-05-15</p>
                        </div>
                        <span className="entity-history-item-line">
                            <em className="entity-history-item-dot"></em>
                        </span>
                        <div className="entity-history-item-text-wrap">
                            <em></em>
                            <a href={`/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`}>操作人：户户户</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}