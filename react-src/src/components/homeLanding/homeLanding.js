import React from "react";
import ImageParallax from "../imageParallax/imageParallax";

import './homeLanding.css';

import lakeSunsetImage from '../../assets/testImages/lake-sunset.jpg';
import northShoreImage from '../../assets/testImages/north-shore.jpg';
import newFireworksImage from '../../assets/testImages/fireworks.jpg';
import newSkiingImage from '../../assets/testImages/skiing.jpg';
import reflectionImage from '../../assets/testImages/reflection.jpg';

const homeImages = [lakeSunsetImage, northShoreImage, newFireworksImage, newSkiingImage, reflectionImage];

function HomeLanding() {
    const scrollToElement = () => {
        const scrollDiv = document.getElementById('so-header').offsetTop - 120;
        window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
    }

    return(
        <div id='landing'>
            <ImageParallax images={homeImages} />
            <div className='arrowDiv'>
                <button onClick={() => scrollToElement()} className='transparentButton'>
                    <i className='arrow down'></i>
                </button>
            </div>
        </div>
    )
}

export default HomeLanding;
