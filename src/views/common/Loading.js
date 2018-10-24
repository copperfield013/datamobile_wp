import React from 'react';
import {setTitle} from "../../redux/actions/page-actions";
import store from "../../redux/store";

export default class Loading extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        store.dispatch(setTitle(`加载中...`));
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}