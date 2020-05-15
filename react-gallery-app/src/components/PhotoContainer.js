import React from 'react';

// App components
import Photo from './Photo';
import NoResults from './NoResults';

function PhotoContainer({ photos, topic }) {
    if (photos.length===0) { return <ul><NoResults /></ul>}
    const photosComponents = photos.map( ({farm, server, id, secret}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return <Photo key={id} url={url}/>
    });
    return (
        <div className="photo-container">
            <h2>Search: {topic}</h2>
            <ul>
                {photosComponents}
            </ul>
        </div>
    )
};

export default PhotoContainer;
