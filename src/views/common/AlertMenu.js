import React from 'react';
import './AlertMenu.css';
/**
 * 用于在页面右侧创建一个抽屉式的模态工具页面
 * 该组件需要一个参数drawer，drawer的值是一个对象，对象内有两个属性
 *      toggle          : (function)
 *                          该方法有两个参数，会由组件在不同情况下
 *                          第一个参数是当前组件在切换“显示/隐藏”时需要调用的方法，可以用来绑定外部组件的事件。
 *      getContainer    : (function) 获得页面的外框引用（即滚动区域的container）
 */
class AlertMenu extends React.Component{
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        if(this.props.menuBinder){
            this.props.menuBinder.toggle(this.toggle);
        }
    }
    toggle(toShow) {
        if(typeof toShow !== 'boolean'){
            toShow = !this.refs.menu.classList.contains('shown-alertmenu');
        }
        this.refs.menu.classList.toggle('shown-alertmenu', toShow);
        if(toShow && this.props.menuBinder){
            let $container = this.props.menuBinder.getContainer();
            if($container){
                let _this = this;
                $container.addEventListener('click', (e) => {
                    _this.toggle(false);
                }, {
                    once: true
                });
            }
        }
    }
    componentWillUnmount() {
        this.props.menuBinder.toggle(this.toggle, false);
    }
    render() {
        return (
            <div>
                <div className="alertmenu-menu" ref="menu">
                    <div>
                        {this.props.children}
                        <MenuItem href="/" title="退出" iconfont="icon-exit" />
                    </div>
                </div>
            </div>
        )
    }
}
class MenuItem extends React.Component{
    render() {
        return (
            <a href={this.props.href} title={this.props.title}>
                <span><i className={`iconfont ${this.props.iconfont}`}></i></span>
                <span>{this.props.title}</span>
            </a>
        );
    }
}


export default AlertMenu;
export {MenuItem};