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
    renderIcon(name, key) {
        let url = urlMap[name];
        let iconClass = iconClassMap[name];
        if(url && iconClass){
            return (
                <a key={key} href={url} ><i className={`iconfont ${iconClass}`}></i></a>
            );
        }
    }
    render() {
        return (
            <div className="linkicon-container">
                {this.props.links.map((name, index)=>this.renderIcon(name, `link-${index}`))}
            </div>
        )
    }
}
export default LinkIcon;