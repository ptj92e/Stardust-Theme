import React from 'react';

import lakeTahoeImage from '../../assets/images/Lake_Tahoe.jpeg';
import './pageTitle.css';

function PageTitle(props) {
    return(
        <div className='page-title' style={{ 
                backgroundImage: 'url(' + lakeTahoeImage + ')', 
                backgroundPosition: 'center center' 
        }}>
            <h1>{ props.pageTitle }</h1>
            <div className='layer'>&nbsp;</div>
        </div>

    )

}

export default PageTitle;