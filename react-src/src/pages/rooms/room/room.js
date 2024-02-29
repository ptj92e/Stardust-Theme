import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageTitle from "../../../components/pageTItle/pageTitle";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Carousel from "react-bootstrap/Carousel";
import Spinner from 'react-bootstrap/Spinner';

import HTMLService from '../../../services/htmlService';
import RoomsService from '../../../services/roomsService';

import './room.css';

function RoomPage() {
    const [images, setImages] = useState([]);
    const [room, setRoom] = useState({});
    const { roomId } = useParams();
    const [index, setIndex] = useState(0);
    const [titleText, setTitleText] = useState("Loading");
    const [loading, setLoading] = useState(true);
    const [apiCall, setApiCall] = useState(false);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const navigate = useNavigate();

    useEffect(() => {
        async function getRoom(roomId) {
            const selectedRoom = await RoomsService.getRoom(roomId);
            setRoom(selectedRoom);
            setImages(HTMLService.sanatizeHTML(selectedRoom.excerpt.rendered).split(','));
            setApiCall(true)
        };

        getRoom(roomId);
    }, []);

    useEffect(() => {
        if (apiCall) {
            setLoading(false);
            setTitleText(JSON.stringify(room) !== '{}' ? room.title.rendered : "No Room Found");
        }
    }, [apiCall]);

    const handleReservation = (e) => {
        e.preventDefault();
        navigate(`/reservations/${room.title.rendered}`);
    }

    return (
        <>
            <PageTitle pageTitle={titleText} />
            <div id='room' className={loading ? 'addFlex' : ''}>
                {
                    loading
                        ?   <Spinner animation="border" variant="success" size="xl" />
                        :   room?.id  ? 
                                <>
                                    <Container>
                                        <Row className='justify-content-center roomInfo'>
                                            <Col xs={10} md={6}>
                                                <div className="image-container">
                                                    <Carousel className="roomCarousel" activeIndex={index} onSelect={handleSelect} interval={null}>
                                                        {
                                                            images.map((image) => {
                                                                return(
                                                                    <Carousel.Item>
                                                                        <div className="carouselImage" style={{ backgroundImage: `url(${image})` }}></div>
                                                                    </Carousel.Item>
                                                                )
                                                            })
                                                        }
                                                    </Carousel>
                                                </div>
                                            </Col>
                                            <Col xs={10} md={4}>
                                                <div className="description">
                                                    <p>{ HTMLService.sanatizeHTML(room.content.rendered) }</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center mt-3">
                                            <Button onClick={handleReservation}>Reserve this Room</Button>
                                        </Row>
                                    </Container>
                                </>
                            :
                                <>
                                    <Container>
                                        <p>Please try again. 
                                            If errors persist, please contact us at&nbsp;
                                            <span className="greenText" onClick={() => window.open("tel:+18002625077")}><strong>1(800)262-5077</strong></span></p>
                                    </Container>
                                </>       
                }
            </div>
        </>
    )
}

export default RoomPage;
