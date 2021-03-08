import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class AppNav extends Component {

    render() {
        return (
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              {/* <NavLink to="/">Task List</NavLink>*/}
              <Route render={({ history }) => (
                <Button variant="primary" size="sm"
                  type='button'
                  onClick={() => { history.push('/') }}
                >
                  Task List
                </Button>
              )} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/*<NavLink to="/add">Add</NavLink>*/}
                <Route render={({ history }) => (
                  <Button variant="success" size="sm"
                    type='button'
                    onClick={() => { history.push('/add') }}
                  >
                    Add
                  </Button>
                )} />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
  }
}

export default AppNav;
