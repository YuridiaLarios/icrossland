import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = (props) => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">icrossland</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link><Link to="/">Homepage</Link></Nav.Link>
          </Nav.Item>
          {props.auth.isAuthenticated() &&
          <Nav.Item>
            <Nav.Link><Link to="/secret">Profile</Link></Nav.Link>
          </Nav.Item>
          }
           {!props.auth.isAuthenticated() &&
          <Nav.Item>
            <Nav.Link><Link to="/" onClick={props.auth.login}>Login </Link></Nav.Link>
          </Nav.Item>
          }
          {props.auth.isAuthenticated() &&
          <Nav.Item>
            <Nav.Link><Link to="/" onClick={props.auth.logout}>Logout</Link></Nav.Link>
          </Nav.Item>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)
