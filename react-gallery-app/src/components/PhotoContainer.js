import React, { Component } from 'react';
import Photo from './Photo'

class PhotoContainer extends Component {
    state = {
        photos: [ {}, {}, {} ]
    }
    
    render() {
        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    {this.state.photos.map( photo =>
                        <Photo />
                    )}
                </ul>
            </div>
        );
    };
};

export default PhotoContainer;
