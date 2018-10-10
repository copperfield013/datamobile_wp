import React from 'react';

class MenuIcon extends React.Component{
    constructor() {
        super();

    }
    render(){
        return <a style={this.props.style} className="menu-icon weui-tabbar__item" onClick={this.props.onClick}>
            <i className="iconfont icon-menu2"></i>
        </a>
    }
}

export default MenuIcon;