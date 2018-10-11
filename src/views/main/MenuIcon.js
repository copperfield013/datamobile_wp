import React from 'react';

class MenuIcon extends React.Component{
    render(){
        return <span style={this.props.style} className="menu-icon weui-tabbar__item" onClick={this.props.onClick}>
            <i className="iconfont icon-menu2"></i>
        </span>
    }
}

export default MenuIcon;