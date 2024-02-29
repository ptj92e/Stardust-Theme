import React, { useEffect, useState } from "react";

import ActivitesService from "../../services/activitiesService";
import HTMLService from "../../services/htmlService";

import './activityList.css';

function ActivityList() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        async function fetchActivities() {
            const activityList = await ActivitesService.getActivities();
            setActivities(activityList);
        };

        fetchActivities();
    }, []);

    return (
        <div className='activity-list'>
            {
                activities.map(activity => {
                    return <div className="activity" key={activity.id}>
                                <div className="activity-image" style={{ backgroundImage: "url(" + HTMLService.sanatizeHTML(activity.excerpt.rendered) + ")" }} />
                                <p className="activity-title">{activity.title.rendered}</p>
                                <p>{HTMLService.sanatizeHTML(activity.content.rendered)}</p>
                            </div>
                })
            }
        </div>
    )
}

export default ActivityList;
