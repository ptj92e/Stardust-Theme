import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

import './footer.css';

function Footer(props) {
    const [date, setDate] = useState(new Date());

    return (
        <div id='footer'>
            <div id='footer-content'>
                <Row className='justify-content-center'>
                    <Link  to='/'>Home</Link>
                    <Link to='/activities'>Activities</Link>
                    <Link to='/rooms'>Rooms</Link>
                    <Link to='/reservations'>Reservations</Link>
                    {
                        props.isAuthenticated ?
                            <>
                                <Link to='/owners'>Owners</Link>
                            </>
                        :
                            <></>
                    }
                </Row>
                <p>© 2009-{date.getFullYear()} Stardust Owners. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
