import React, { useEffect, useState } from "react";

import './imageParallax.css';

function ImageParallax(props) {
    const [imageIndex, setImageIndex] = useState(0);

    const startImageFade = () => {
        const images = Array.from(document.querySelectorAll('.image'));
        
        setNextActiveImage(images);
    };

    const setNextActiveImage = (images) => {
        const activeImageIndex = images.indexOf(document.querySelector('.image.active'));
        const nextActiveImageIndex = activeImageIndex === props.images.length - 1 
            ? 0 
            : activeImageIndex + 1;
        
        images[activeImageIndex].className = '';
        images[activeImageIndex].classList.add('image', 'fadeOut');
        images[nextActiveImageIndex].classList.remove('fadeOut');
        images[nextActiveImageIndex].classList.add('active', 'fadeIn');

        setImageIndex(nextActiveImageIndex);
    };
    
    useEffect(() => {
        setTimeout(() => {
            startImageFade();
        }, 6000);
    }, [imageIndex]);

    return(
        <div id='parallax'>
            {
                props.images.map((img, index) => {
                    return (
                        index === 0 
                            ? <div key={index} style={{ backgroundImage:`url(${img})`}} className='image active' />
                            : <div key={index} style={{ backgroundImage:`url(${img})`}} className='image' />
                    )
                })
            }
        </div>
    )
}

export default ImageParallax;
