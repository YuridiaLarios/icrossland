import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    
    margin: 0 15px;
    color: white;

    &:hover {
      color: #61dafb;
      text-decoration: none;
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
            <Link to="/">Homepage</Link>
          </Nav.Item>
          {props.auth.isAuthenticated() &&
          <Nav.Item>
            <Link to="/secret">Secret</Link>
          </Nav.Item>
          }
          {props.auth.isAuthenticated() &&
          <Nav.Item>
            <Link to="/profile">Profile</Link>
          </Nav.Item>
          }
           {!props.auth.isAuthenticated() &&
          <Nav.Item>
            <Link to="/" onClick={props.auth.login}>Login </Link>
          </Nav.Item>
          }
          {props.auth.isAuthenticated() &&
          <Nav.Item>
            <Link to="/" onClick={props.auth.logout}>Logout</Link>
          </Nav.Item>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)
