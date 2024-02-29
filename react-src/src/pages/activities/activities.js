import React from 'react';

import ActivityList from '../../components/activityList/activityList';
import PageTitle from '../../components/pageTItle/pageTitle';

import Container from "react-bootstrap/Container";

import './activities.css';

function ActivitiesPage() {
    return(
        <div className='activities'>
            <PageTitle
                pageTitle="Activities"
            />
            <Container className="activityContent">
                <p>As always, here at Stardust, there are plenty of activities to keep you and the family engaged and entertained.</p>
                <p>Please contact the front office at <span style={{ color: 'rgb(61, 132, 7)', cursor: 'pointer'}} onClick={() => window.open("tel:+15305445211")}><strong>(530) 544-5211</strong></span> for information about this week’s activities.</p>
            </Container>
            <ActivityList />
        </div>
    )

}

export default ActivitiesPage;