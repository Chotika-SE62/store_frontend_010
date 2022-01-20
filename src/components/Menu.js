import React, {useState} from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink,
} from "reactstrap";

function Menu() {
    //คลิกแล้วย่อ ขยาย
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        expand="md">    {/* แบล็คกราวน์เป็นdark ฟิกส์ไว้ข้างบน */}
            <NavbarBrand href="/">SE Store</NavbarBrand>
            <NavbarToggler onClick={toggle} />  
            <Collapse isOpen={isOpen} navbar>    {/* หุบ ย่อ */}
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/home">Product List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/add">Add new Product</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Menu
