import React, {Component} from 'react';
import {BrowserRouter , Route, NavLink, Switch, Redirect } from "react-router-dom";
import EntityList from './EntityList';


class EntityPage extends  Component{
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/entity/list/:menuId" component={EntityList} />
                </div>
            </BrowserRouter>
        )
    }
}

export default EntityPage;