import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import './roomCard.css';

function RoomCard(props) {
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [href, setHref] = useState('');

    useEffect(() => {
        setImages(props.images.split(','));
        setHref(`/rooms/${props.id}`);
    }, []);

    const handleClick = () => {
        navigate(href);
    }

    return (
        <div className="room-card">
            <div className="room-image" style={{ backgroundImage: "url(" + images[0] + ")" }} alt={ props.alt }>
                <div className="roomLinkContainer">
                    <Nav.Link className="roomLink" onClick={handleClick}>Click Here to View This Room</Nav.Link>
                </div>
            </div>
            <p className="room-title">{ props.title }</p>
            <p>{ props.description }</p>
        </div>
    )
}

export default RoomCard;