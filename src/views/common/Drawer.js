import React from 'react';
import './Drawer.css';
import store from '../../redux/store';
import {registMenu, unregistMenu, getContainer} from '../../redux/actions/page-actions';

/**
 * 用于在页面右侧创建一个抽屉式的模态工具页面
 */
class Drawer extends React.Component{
    constructor() {
        super();
        this.mainContainerScrollTop = 0;
        this.mainContainer = null;
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        console.log('drawer did mount');
        if(this.props.registMenu !== false){
            store.dispatch(registMenu(this.toggle));
        }
    }
    toggle(toShow) {
        this.refs.cover.classList.toggle('covered', toShow);
        toShow = this.refs.cover.classList.contains('covered');
        let $container = getContainer();
        if($container){
            if(toShow){
                if($container.parentElement.scrollTop > 0){
                    this.mainContainer = $container.parentElement;
                }else{
                    this.mainContainer = $container;
                }
                this.mainContainerScrollTop = this.mainContainer.scrollTop;
            }
            $container.classList.toggle('lock', toShow);
            if(toShow){
                $container.style.top = `${-this.mainContainerScrollTop}px`;
            }else{
                $container.style.top = null;
                if(this.mainContainer){
                    this.mainContainer.scrollTo(0, this.mainContainerScrollTop);
                }
            }
        }
        this.refs.toolbar.classList.toggle('shown-toolbar', toShow);
    }
    componentWillUnmount() {
        console.log('drawer will unmount');
        if(this.props.registMenu !== false){
            store.dispatch(unregistMenu(this.toggle));
            let $container = getContainer();
            if($container){
                $container.classList.remove('lock');
            }
        }
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
