import React, {Component} from 'react';
import {BrowserRouter , Route, Switch } from "react-router-dom";
import EntityList from './EntityList';
import EntityDetail from './EntityDetail';
import EntityUpdate from './EntityUpdate';
import PageNotFound from '../common/PageNotFound';

class EntityPage extends  Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/entity/list/:menuId" component={EntityList} />
                    <Route path="/entity/detail/:menuId/:code"  component={EntityDetail} />
                    <Route path="/entity/create/:menuId" component={EntityUpdate}  />
                    <Route path="/entity/update/:menuId/:code" component={EntityUpdate}  />
                    <Route component={PageNotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default EntityPage;