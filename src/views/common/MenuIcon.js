import React from 'react';

class MenuIcon extends React.Component{
    componentDidMount() {
        let _this = this;
        this.refs.icon1.addEventListener('click', (e)=>{
            e.stopPropagation();
            _this.props.onClick.apply(this);
        })
    }
    render(){
        return <span ref="icon1" style={this.props.style} className="menu-icon weui-tabbar__item" >
            <i className="iconfont icon-menu2"></i>
        </span>
    }
}

export default MenuIcon;