import React from 'react';
import './Drawer.css';
/**
 * 用于在页面右侧创建一个抽屉式的模态工具页面
 * 该组件需要一个参数drawer，drawer的值是一个对象，对象内有两个属性
 *      toggle          : (function)
 *                          该方法有两个参数，会由组件在不同情况下
 *                          第一个参数是当前组件在切换“显示/隐藏”时需要调用的方法，可以用来绑定外部组件的事件。
 *      getContainer    : (function) 获得页面的外框引用（即滚动区域的container）
 */
class Drawer extends React.Component{
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        if(this.props.drawer){
            this.props.drawer.toggle(this.toggle);
        }
    }
    toggle(toShow) {
        this.refs.toolbar.classList.toggle('shown-toolbar', toShow);
        this.refs.cover.classList.toggle('covered', toShow);
        let $container = this.props.drawer.getContainer();
        if($container){
            $container.classList.toggle('lock', this.refs.cover.classList.contains('covered'));
        }
    }
    componentWillUnmount() {
        this.props.drawer.toggle(this.toggle, false);
    }
    render() {
        return (
            <div>
                <div className="drawer-cover" ref="cover" onClick={()=>{this.toggle(false)}}></div>
                <div className="drawer-toolbar" ref="toolbar">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Drawer;
