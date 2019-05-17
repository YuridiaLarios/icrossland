import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import logo2 from "../globe-308800.svg";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background-color: rgb(41, 128, 185);
  }

  a,
  .navbar-nav .nav-link {
    margin: 0 15px;
    color: white;
    font-weight: bold;
    padding: 10px;

    &:hover {
      text-decoration: none;
      opacity: 0.9;
    }
  }

  .navbar-brand {
    font-size: 16px;
    margin: 0 10px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    &:hover {
      color: white;
      opacity: 0.8;
      text-decoration: none;
    }
  }

  .navbar-brand > img {
    margin-left: -20px;
    padding: 1px 28px;
  }
`;

const NavigationBar = props => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        icrossland{" "}
        <img
          src={logo2}
          style={{ width: 100, marginTop: -7 }}
          alt="logo: Planet Earth"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
         <Button variant="outline-success">Search</Button> */}
          </Form>
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <NavLink exact={true} activeClassName="is-active" to="/">
                Explore
              </NavLink>
            </Nav.Item>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <NavLink activeClassName="is-active" to="/dashboard">
                Dashboard
              </NavLink>
            </Nav.Item>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <NavLink activeClassName="is-active" to="/users">
                Users
              </NavLink>
            </Nav.Item>
          )}
          {!props.auth.isAuthenticated() && (
            <Button onClick={props.auth.login} variant="outline-primary">
              <NavLink to="#"> Login </NavLink>
            </Button>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <NavLink to="/" onClick={props.auth.logout}>
                Logout
              </NavLink>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default withRouter(NavigationBar);
