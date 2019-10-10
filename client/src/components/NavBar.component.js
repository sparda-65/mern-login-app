import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from 'reactstrap';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    //this._renderLoginOrLogout=this._renderLoginOrLogout.bind(this);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleButton() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  _renderLoginOrLogout() {
    const { isAuth } = this.props;
    if (isAuth) {
      return (
        <Nav className="ml-auto" navbar>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleButton}>
            <DropdownToggle caret color="link" size="sm">
              Welcome
        </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Nav>
      );
    }

    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/login" className="nav-link">Login</Link>
        </NavItem>
        <NavItem>
          <Link to="/signup" className="nav-link">Sign UP</Link>
        </NavItem>
      </Nav>
    );
  };
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link to="/" className="navbar-brand">Mern Login App</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            {this._renderLoginOrLogout()}

          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth
  };
};
const NavBar = connect(mapStateToProps)(NavBarComponent);

export { NavBar };