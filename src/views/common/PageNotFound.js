import React from 'react';

export default class PageNotFound extends React.Component{
    render(){
        return (
            <div>
                <div className="page-not-found-main">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                    <p>页面不存在</p>
                </div>
                <div className="page-not-found-to-home">
                    <a href="/">返回首页</a>
                </div>
            </div>
        )
    }
}