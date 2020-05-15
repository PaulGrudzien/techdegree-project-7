import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// App components
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import error404 from './components/error404';

// api key from config.js
import apiKey from './config.js'

// main Topics
import mainTopics from './mainTopics.js'

class App extends Component {
    
    constructor() {
        super();
        this.mainTopicsPhotos = {};
        this.state = {
            photos: []
        };
    }

    getMainTopicsPhotos = (topic) => this.mainTopicsPhotos[topic];

    fetchPhotos = (topic) => {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`
        const promise = fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error fetching and parsing data', error));
        return promise
    };

    performSearch = (topic) => {
        this.fetchPhotos(topic).then( results => {
            this.setState({ photos: results.photos.photo })
        })
    }

    async componentDidMount() {
        const promises = mainTopics.map(topic => this.fetchPhotos(topic));
        const results = await Promise.all(promises);
        for (let i=0; i<mainTopics.length; i+=1) {
            this.mainTopicsPhotos[mainTopics[i]] = results[i].photos.photo;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <SearchForm performSearch={this.performSearch}/>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={null} />
                        {mainTopics.map( topic => {
                            return (
                                <Route path={`/${topic}`} key={topic}>
                                    <PhotoContainer getPhotos={this.getMainTopicsPhotos} topic={topic}/>
                                </Route>
                            )
                        })}
                        <Route component={error404} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    };
};

export default App;
