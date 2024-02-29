import React from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import navLogo from '../../assets/images/stardust_nav_logo.png';

import './navbar.css';

function StardustNavbar(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth-info');
        props.authChanger(false);

        navigate('/');
    }

    return (
        <Navbar id='navbar' expand='lg px-2'>
            <Col xs={4} sm={6} md={4} lg={2}>
                <Navbar.Brand href='/'>
                    <Image src={navLogo} alt='navigation logo' fluid />
                </Navbar.Brand>
            </Col>
            <Navbar.Toggle aria-controls="stardust-menu" />
            <Navbar.Collapse id="stardust-menu" className='justify-content-end'>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/activities">Activities</Nav.Link>
                    <Nav.Link href='/rooms'>Rooms</Nav.Link>
                    <Nav.Link href='/reservations'>Reservations</Nav.Link>
                    {
                        props.isAuthenticated ? 
                        <>
                            <Nav.Link href='/owners'>Owners</Nav.Link>
                        </>
                        :
                        <></>
                    }
                    {
                        props.isAuthenticated ? 
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        :
                        <Nav.Link href='/login'>Login</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default StardustNavbar;
