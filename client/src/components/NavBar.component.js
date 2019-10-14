import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from 'reactstrap';

import { logUserOut } from '../actions';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);

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
    const { isAuth, logUserOut, profile } = this.props;
    if (isAuth) {
      return (
        <Nav className="ml-auto" navbar>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleButton}>
            <DropdownToggle caret color="link" size="sm">
              Welcome,{profile.username}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => logUserOut()}>Logout</DropdownItem>
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
          <Link to="/signup" className="nav-link">Sign Up</Link>
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
    isAuth: auth.isAuth,
    profile: auth.profile
  };
};
const NavBar = connect(mapStateToProps, { logUserOut })(NavBarComponent);

export { NavBar };