import React, {Component} from 'react';
import Navbar, {NavbarText} from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import {Image} from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <header>
                <Navbar expand={"lg"} variant={"light"} bg={"light"} fixed={"top"}>
                    <NavbarBrand className="font-libre" href={"/"}>
                        <Image src={require("../assests/icons/brand.png")}
                 height="30px" width="38px" />
                    </NavbarBrand>
                    <Navbar.Text className="d-none d-sm-block font-libre ">
                        <strong>Personal Project Management</strong>
                    </Navbar.Text>
                    <NavbarToggle aria-controls={"collapseableRegion"}/>
                    <NavbarCollapse id={"collapseableRegion"}>
                        <Nav className="ml-md-auto ">
                            <NavLink href={"/"}>
                                Dashboard
                            </NavLink>
                            <NavLink href={"/login"} >
                                Login
                            </NavLink>
                            <NavLink href={"/register"} >
                                Register
                            </NavLink>
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;