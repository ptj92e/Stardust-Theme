import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import HTMLService from '../../services/htmlService';
import RoomsService from '../../services/roomsService';

import './roomList.css';

import RoomCard from '../roomCard/roomCard';

function RoomList() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getRooms() {
            const roomList = await RoomsService.getRooms();
            setRooms(roomList);
        };

        getRooms();
    }, []);

    return (
        <Container>
            <div id='room-list'>
                <div id='room-list-content'>
                    <div className='rooms'>
                        {
                            rooms.map((room) => {
                                return (
                                    <RoomCard
                                        key={room.id}
                                        id={room.id}
                                        title={HTMLService.sanatizeHTML(room.title.rendered)}
                                        images={HTMLService.sanatizeHTML(room.excerpt.rendered)}
                                        description={HTMLService.sanatizeHTML(room.content.rendered)}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <p><strong>Other property features include: </strong>Fitness Room, Free Onsite Laundry, 
                Free Public Computer and Printer, Free Bikes and Seasonal Equipment Like Sleds and Snowshoes
                BBQ Grills and Outdoor Fire Pits Year Round, Picnic Tables, Activites Center, Offering Daily Hosted Group Activities</p>
            <p style={{ color: '#01477F' }}>- OUR HEATED POOL &amp; SPAS ARE OPEN AND HEATED YEAR ROUND. WE OPEN
                OUR SECOND POOL IN THE SUMMER.</p>
        </Container>
    )
}

export default RoomList;
