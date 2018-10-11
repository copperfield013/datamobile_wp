import React, {Component} from 'react';
import {BrowserRouter , Route, Switch } from "react-router-dom";
import EntityList from './EntityList';
import EntityDetail from './EntityDetail';
import EntityUpdate from './EntityUpdate';

class EntityPage extends  Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/entity/list/:menuId" render={(props)=>{
                        return <EntityList menuId={props.match.params.menuId} menuBinder={this.props.menuBinder} />
                    }} />
                    <Route path="/entity/detail/:menuId/:code" render={()=>{
                        return <EntityDetail onMenuIconClick={this.props.onMenuIconClick} />
                    }} />
                    <Route path="/entity/update/:menuId/:code" render={()=>{
                        return <EntityUpdate onMenuIconClick={this.props.onMenuIconClick} />
                    }} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default EntityPage;