import React from 'react';
import ReactDOM from 'react-dom';

import AppRoute from './AppRoute';
import AppNav from './AppNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

function Main() {
    return (
      <BrowserRouter>
        <AppNav></AppNav>
        <AppRoute></AppRoute>
      </BrowserRouter>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
