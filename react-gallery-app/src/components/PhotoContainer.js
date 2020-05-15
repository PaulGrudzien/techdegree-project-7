import React from 'react';

// App components
import Photo from './Photo';
import NotFound from './NotFound';

function PhotoContainer({ photos, topic }) {
    if (photos.length===0) { return <ul><NotFound /></ul>}
    const photosComponents = photos.map( ({farm, server, id, secret}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return <Photo key={id} url={url}/>
    });
    if (photos.length===0) { return <ul><NotFound /></ul>}
    else {
        return (
            <div className="photo-container">
                <h2>{topic}</h2>
                <ul>
                    {photosComponents}
                </ul>
            </div>
        )
    }
};

export default PhotoContainer;
