import axios from 'axios';

let rooms;
let room;
let roomTitles = [];

const RoomsService = {
    getRooms: async function() {
        const roomsUrl = `/wp-json/wp/v2/rooms?per_page=10`;
        await axios.get(roomsUrl).then((response) => {
            rooms = response.data;
        });

        return rooms;
    },
    getRoom: async function(roomId) {
        const roomUrl = `/wp-json/wp/v2/rooms/${roomId}`;
        await axios.get(roomUrl).then((response) => {
            room = response.data;
        });
        
        return room;
    },
    getRoomTitles: async function() {
        const roomsUrl = `/wp-json/wp/v2/rooms?_fields=title`;
        await axios.get(roomsUrl).then((response) => {
            if (response.data) {
                response.data.forEach(room => {
                    roomTitles.push({ label: room.title.rendered, value: room.title.rendered });
                });
            }
        });

        return roomTitles;
    }
};

export default RoomsService;
