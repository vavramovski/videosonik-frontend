import {Nav, Navbar, NavDropdown} from "react-bootstrap/";
import '../bootstrap/bootstrap.min.css';
import React from "react";
import {Link} from "react-router-dom";
import jwt from "jwt-decode";


const Header = (props) => {
    var admin = null;
    if ((localStorage.getItem("token") != null) &&  jwt(localStorage.getItem("token")).ROLE.includes("ADMIN")) {
        admin = <NavDropdown title="ADMIN" id="collapsible-nav-dropdown">
            <Link to={"/admin/contacts"} className={"dropdown-item"}>Read e-mails</Link>
            <Link to={"/admin/panel"} className={"dropdown-item"}>Products</Link>
        </NavDropdown>
    }

    var registerLogin = null;

    if (localStorage.getItem("token") == null || jwt(localStorage.getItem("token")).sub == null)
        registerLogin =
            <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>;
                <Nav.Link href="/register">Register</Nav.Link>
            </React.Fragment>;
    else {
        registerLogin = <Nav.Link href="/logout">Logout</Nav.Link>;
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: '1.3rem'}}>
            <Navbar.Brand href="/">Videosonik</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/projects">Projects</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>

                    {/*<Nav.Link href="">Pricing</Nav.Link>*/}
                    <NavDropdown title="Products" id="collapsible-nav-dropdown">
                        <Link to={"/"} className={"dropdown-item"}>All</Link>
                        <Link to={"/led"} className={"dropdown-item"}>LED</Link>
                        <Link to={"/plumbing"} className={"dropdown-item"}>Plumbing</Link>
                        <Link to={"/computers"} className={"dropdown-item"}>Computers</Link>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="/wishlist">Wishlist</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    {registerLogin}
                    {admin}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default Header;

