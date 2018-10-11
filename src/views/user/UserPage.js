import React, {Component} from 'react';
import {MenuItem} from "../main/AlertMenu";
import AlertMenu from "../main/AlertMenu";

class UserPage extends Component{
    componentDidMount () {
        this.props.menuBinder.setTitle(`用户管理`);
    }
    render() {
        return (
            <div>  
                <h1>用户页</h1>
                <AlertMenu menuBinder={this.props.menuBinder} >
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                </AlertMenu>
            </div>
        )
    }
}

export default UserPage;