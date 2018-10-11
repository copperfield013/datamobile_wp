import React from 'react';
import {Form, FormCell, CellBody, CellFooter, Switch, Select} from 'react-weui';
import LinkIcon from '../main/LinkIcon'
class EntitySearch extends React.Component{
    constructor() {
        super();
        this.state = {
            reversed    : false
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({
           reversed:  !e.target.checked
        });
    }
    render() {
        return (
            <div className="entity-search">
                <div className="entity-search-container">
                    <div className="entity-search-wrapper">
                        <h3>顺序字段</h3>
                        <Form select="true">
                            <FormCell select>
                                <CellBody>
                                    <Select defaultValue="1">
                                        <option value="1">姓名</option>
                                        <option value="2">编码</option>
                                    </Select>
                                </CellBody>
                            </FormCell>
                        </Form>
                        <Form>
                            <FormCell switch>
                                <CellBody>{this.state.reversed? '逆序': '顺序'}</CellBody>
                                <CellFooter>
                                    <Switch defaultChecked={!this.state.reversed} onChange={this.onChange} />
                                </CellFooter>
                            </FormCell>
                        </Form>
                    </div>
                    <div className="entity-search-wrapper">
                        <h3>查询条件</h3>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                        <div className="entity-criteria-group">
                            <label className="criteria-title">姓名</label>
                            <div className="criteria-value">
                                <span>
                                    <input type="text" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="entity-search-operate-area">
                    <LinkIcon links={['home', 'user']}/>
                    <span>
                        <button className="weui-btn weui-btn_mini weui-btn_plain-primary" type="button" ref="resetButton" id="restButton" >重置</button>
                        <button className="weui-btn weui-btn_mini weui-btn_primary" type="button" ref="queryButton" id="queryButton" >查询</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default EntitySearch;