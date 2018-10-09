import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './HomePage.css';

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
                            return (<NavItem2 key={`c_${index}`} title={item} menuId={item} />)
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
        this.go = this.go.bind(this);

    }
    go() {
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
    componentDidMount () {
    }
    render() {
        let container = (
            <div id="app">
                <h1>导航</h1>
                <ul className="nav-list">
                    <NavItem1 title="Demo" children={[1,2,3]}></NavItem1>
                    <NavItem1 title="人口" ></NavItem1>
                    <NavItem1 title="地址" ></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                    <NavItem1 title="实例" children={['x', 'y', 'z']}></NavItem1>
                </ul>
            </div>
        );
        return container;
    }
}

export default HomePage;