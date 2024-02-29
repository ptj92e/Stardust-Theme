import axios from 'axios';

let alerts;

const AlertsService = {
    getAlerts: async function() {
        const alertsUrl = `/wp-json/wp/v2/alerts`;
        await axios.get(alertsUrl).then((response) => {
            alerts = response.data;
        });

        return alerts;
    }
};

export default AlertsService;