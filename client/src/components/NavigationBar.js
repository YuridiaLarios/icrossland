import React from "react";
import { Link } from "react-router-dom";
import { Form, Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    margin: 0 15px;
    color: white;

    &:hover {
      color: #61dafb;
      text-decoration: none;
    }
  }
`;

const NavigationBar = props => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">icrossland</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
         <Button variant="outline-success">Search</Button> */}
          </Form>
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <Link to="/">Explore</Link>
            </Nav.Item>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <Link to="/dashboard">Dashboard</Link>
            </Nav.Item>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <Link to="/users">Users</Link>
            </Nav.Item>
          )}
          {!props.auth.isAuthenticated() && (
            <Nav.Item>
              <Link to="/" onClick={props.auth.login}>
                Login{" "}
              </Link>
            </Nav.Item>
          )}
          {props.auth.isAuthenticated() && (
            <Nav.Item>
              <Link to="/" onClick={props.auth.logout}>
                Logout
              </Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default withRouter(NavigationBar);
