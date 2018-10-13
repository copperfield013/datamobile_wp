import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
class EntityDetail extends React.Component{
    componentWillMount() {
        this.props.menuBinder.setTitle(`详情-张三`);
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
                    <div class="entity-field-group">
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
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                </AlertMenu>
            </div>
        );
    }
}

export default EntityDetail;