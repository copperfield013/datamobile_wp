import React from 'react';

let urlMap = {
    'home'  : '/',
    'user'  : '/user'
};
let iconClassMap = {
    'home'  : 'icon-home',
    'user'  : 'icon-user'
}
class LinkIcon extends React.Component{
    constructor() {
        super();
        this.renderIcon = this.renderIcon.bind(this);
    }
    renderIcon(name) {
        let url = urlMap[name];
        let iconClass = iconClassMap[name];
        if(url && iconClass){
            return (
                <a href={url} ><i className={`iconfont ${iconClass}`}></i></a>
            );
        }
    }
    render() {
        return (
            <div className="linkicon-container">
                {this.props.links.map((name)=>this.renderIcon(name))}
            </div>
        )
    }
}
export default LinkIcon;