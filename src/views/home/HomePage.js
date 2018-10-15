import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './HomePage.css';
import AlertMenu,{MenuItem} from "../common/AlertMenu";
import store from '../../redux/store';
import {setTitle} from "../../redux/actions/page-actions";

class NavItem1 extends Component{
    constructor() {
        super();
        this.state = {
            expanded    : false
        };
        this.toggleExpand = this.toggleExpand.bind(this);

    }
    toggleExpand() {
        this.setState({
            expanded : !this.state.expanded
        });
    }
    render() {
        return (
            <li className={`nav-item-1 ${this.state.expanded? 'expanded' : ''}`} >
                <a onClick={this.toggleExpand}>
                    <span className="nav-item-title">{this.props.title}</span>
                    <span className="nav-item-arrow"></span>
                </a>
                {<ul>
                    {
                        this.props.children?this.props.children.map((item, index)=>{
                            return (<NavItem2 key={item.id} title={item.title} menuId={item.id} />)
                        }): ''
                    }
                </ul>}
            </li>
            )
    }
}

class NavItem2 extends Component{
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <li className="nav-item-2" >
                <Link to={`/entity/list/${this.props.menuId}`}>
                    <span className="nav-item-title">{this.props.title}</span>
                    <span className="nav-item-arrow"></span>
                </Link>
            </li>
            )
    }
}


class HomePage extends Component{
    constructor() {
        super();
        this.state = {
            menus   : []
        }
    }
    componentWillMount () {
        store.dispatch(setTitle('首页'));
    }
    componentDidMount() {
        fetch('/api/menu/getMenu').then((res)=>{
           res.json().then((data)=>{
               console.log(data);
               this.setState({
                  menus  : data.menus
               });
           });
        });
    }
    render() {
        let container = (
            <div id="app">
                <ul className="nav-list">
                    {this.state.menus.map((item)=>{
                        return (
                            <NavItem1 key={item.id} title={item.title} children={item.level2s}></NavItem1>
                        );
                    })}
                </ul>
                <AlertMenu>
                    <MenuItem href="/user" title="用户" iconfont="icon-user1"  />
                </AlertMenu>
            </div>
        );
        return container;
    }
}

export default HomePage;