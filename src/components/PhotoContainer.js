import React from 'react';
import { Redirect } from 'react-router-dom';

// App components
import Photo from './Photo';
import NoResults from './NoResults';
import Loading from './Loading';

// main Topics
import mainTopics from '../mainTopics.js'

function PhotoContainer (props) {
    if (props.topic === "") {return <Redirect to={`/${mainTopics[0]}`} />}
    props.onSearch(props.topic)
    if (props.isLoading) {return <Loading />}
    if (props.photos.length===0) { return <ul><NoResults /></ul>}
    
    /* make the list of Photo components */
    const photosComponents = props.photos.map( ({farm, server, id, secret}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return <Photo key={id} url={url}/>
    });
    
    return (
        <div className="photo-container">
            <h2>{props.topic}</h2>
            <ul>
                {photosComponents}
            </ul>
        </div>
    )
};

export default PhotoContainer;
