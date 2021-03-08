import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import Add from './pages/Add';
import Edit from './pages/Edit';
import List from './pages/List';
import Example from './Example';

class AppRoute extends Component {

  render() {
        return (
            <Switch>
                <Route component={List} path='/' exact></Route>
                <Route component={Add} path='/add'></Route>
                <Route component={Edit} path='/edit/:id'></Route>
            </Switch>
        );
    }
}

export default AppRoute;
