import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavBar.css";

const NavBar = ({ user, handleSignOut }) => {
  return (
    <Navbar expand="lg" bg="white" variant="light" sticky="top" className="shadow-sm">
      <Container className="position-relative">
      
        <Navbar.Brand as={Link} to="/" className="fw-bold brand-text">
          HomeHarbor
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <Nav className="w-100 d-flex flex-wrap align-items-center user-nav">
             
              <div className="center-links d-flex flex-column flex-lg-row justify-content-center w-100">
                <Nav.Link as={Link} to="/">  <span>Home</span></Nav.Link>
                <Nav.Link as={Link} to="/properties/new">  <span>Add Listing</span></Nav.Link>
                <Nav.Link as={Link} to="/properties">   <span>Properties List</span></Nav.Link>
                <Nav.Link as={Link} to="/profile">  <span>Profile</span></Nav.Link>
              </div>

         
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleSignOut}
                className="sign-out-link"
              >
                Sign Out
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/sign-up" className="sign-up-link me-3">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-in" className="sign-in-link">
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;