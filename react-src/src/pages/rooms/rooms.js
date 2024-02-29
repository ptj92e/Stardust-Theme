import React from 'react';

import PageTitle from '../../components/pageTItle/pageTitle';
import RoomList from '../../components/roomList/roomList';

import './rooms.css';

function RoomsPage() {
    return (
        <div id='rooms'>            
            <PageTitle
                pageTitle="Rooms"
            />
            <div id='roomInfo'>
                <p>Our cozy accommodations are just steps from the heart of Tahoe’s entertainment and shopping district.</p>
                <p>Blending classic style and modern comfort in the heart of Lake Tahoe, our suites offer every amenity necessary for a relaxing stay, including comfy seating areas, flat screen televisions, beautifully appointed bathrooms and kitchenettes with all the service and bakeware you need during vacation.</p>
            </div>
            <RoomList />
        </div>
    )
}

export default RoomsPage;
