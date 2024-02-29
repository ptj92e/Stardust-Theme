import axios from 'axios';

let activities;

const ActivitiesService = {
    getActivities: async function() {
        const activitiesUrl = `/wp-json/wp/v2/activities?per_page=25`;
        await axios.get(activitiesUrl).then((response) => {
            activities = response.data;
        });

        return activities;
    }
};

export default ActivitiesService;