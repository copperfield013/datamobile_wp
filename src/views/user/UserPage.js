import React, {Component} from 'react';
import {MenuItem} from "../common/AlertMenu";
import AlertMenu from "../common/AlertMenu";
import store from "../../redux/store";
import {setTitle} from "../../redux/actions/page-actions";

class UserPage extends Component{
    componentWillMount () {
        store.dispatch(setTitle(`用户管理`));
    }
    render() {
        return (
            <div>  
                <h1>用户页</h1>
                <AlertMenu >
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                </AlertMenu>
            </div>
        )
    }
}

export default UserPage;