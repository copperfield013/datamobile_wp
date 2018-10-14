import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {setTitle} from "../../redux/actions/page-actions";
import Drawer from "../common/Drawer";
import EntityHistory from './EntityHistory'
import {BrowserRouter, Route} from 'react-router-dom';

class EntityDetail extends React.Component{
    componentWillMount () {
        store.dispatch(setTitle(`详情-张三`));
    }
    render() {
        return(
            <div>
                <div className="entity-detail">
                    <div className="entity-field-group">
                        <h3 className="entity-field-group-title">基本信息</h3>
                        <div className="entity-field">
                            <label>姓名</label>
                            <div>张三</div>
                        </div>
                        <div className="entity-field">
                            <label>性别</label>
                            <div>男</div>
                        </div>
                        <div className="entity-field">
                            <label>生日</label>
                            <div>1996-09-30</div>
                        </div>
                    </div>
                    <div className="entity-field-group">
                        <h3 className="entity-field-group-title">就业信息</h3>
                        <div className="entity-field">
                            <label>工作单位</label>
                            <div>杭州娃哈哈集团有限公司</div>
                        </div>
                        <div className="entity-field">
                            <label>工号</label>
                            <div>9527</div>
                        </div>
                        <div className="entity-field">
                            <label>入职时间</label>
                            <div>1996-09-30</div>
                        </div>
                    </div>
                    <div className="entity-field-group">
                        <h3 className="entity-field-group-title">家庭成员</h3>
                        <Folder className="entity-field-group-array">
                            <em>1</em>
                            <div className="entity-field">
                                <label>关系</label>
                                <div>父亲</div>
                            </div>
                            <div className="entity-field">
                                <label>姓名</label>
                                <div>张大三</div>
                            </div>
                            <div className="entity-field">
                                <label>性别</label>
                                <div>男</div>
                            </div>
                        </Folder>
                        <Folder className="entity-field-group-array">
                            <em>2</em>
                            <div className="entity-field">
                                <label>关系</label>
                                <div>母亲</div>
                            </div>
                            <div className="entity-field">
                                <label>姓名</label>
                                <div>Mrs.张</div>
                            </div>
                            <div className="entity-field">
                                <label>性别</label>
                                <div>女</div>
                            </div>
                        </Folder>
                    </div>
                </div>
                <AlertMenu menuBinder={this.props.menuBinder} >
                    <MenuItem onClick={()=>{this.refs.drawer.toggle(true)}} title="历史" iconfont="icon-history" />
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                </AlertMenu>
                <Drawer ref="drawer" registMenu={false}>
                    <BrowserRouter>
                        <Route exact path="/entity/detail/:menuId/:code" component={EntityHistory} />
                    </BrowserRouter>
                </Drawer>
            </div>
        );
    }
}

export default EntityDetail;