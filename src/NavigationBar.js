import React, { Component } from 'react';
import {Nav, NavItem, NavLink, Navbar, NavbarBrand} from 'reactstrap';

class NavigationBar extends Component {
    state = {}

    render() {
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Hotels Managment App</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/hotels/">Hotels</NavLink>
                    </NavItem> 
                    <NavItem>
                      <NavLink href="/guests/">Guests</NavLink>
                    </NavItem> 
                    <NavItem>
                      <NavLink href="/orders/all">Orders</NavLink>
                    </NavItem> 
                  </Nav>
              </Navbar>
            </div>
        );
    }
}

export default NavigationBar;