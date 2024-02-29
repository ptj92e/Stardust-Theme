import React from 'react';

import HomeLanding from '../../components/homeLanding/homeLanding';
import RoomList from '../../components/roomList/roomList';

import './home.css';

function HomePage() {
    return (
        <div id='home'>
            <HomeLanding />
            <div id='so-header'>
                <h1>Stardust Owners Suites</h1>
            </div>
            <div id='amenities'>
                    <p>Whether you’re visiting South Lake Tahoe to hit the slopes or the beach, try your luck at the local
                        casinos or just revel in the stunning year round scenery, the Stardust Lodge is your home away from
                            home and just steps from the heart of Tahoe’s entertainment and shopping district.</p>
                    <p>Blending classic style and modern comfort in the heart of Lake Tahoe, we offer every amenity necessary
                        for a relaxing stay, including complimentary touches like daily donuts, coffee and hot popcorn, Wi-Fi
                        Internet, and DVD movie library.</p>
            </div>
            <RoomList />
        </div>
    )
}

export default HomePage;
