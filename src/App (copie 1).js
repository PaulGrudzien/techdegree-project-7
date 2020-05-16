import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// App components
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

// api key from config.js
import apiKey from './config.js'

// main Topics
import mainTopics from './mainTopics.js'

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            photos: [],
            topic: null,
            isLoading: true
        };
    }

    performSearch = (topic) => {
        if (this.state.topic !== topic) {
            let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`;
            if (topic === "") {
                url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=24&format=json&nojsoncallback=1`
            }
            fetch(url)
                .then(response => response.json())
                .then( results => {this.setState({ photos: results.photos.photo, topic, isLoading: false } )})
                .catch(error => console.error('Error fetching and parsing data', error));
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <SearchForm />
                    <Nav />
                    <Switch>
                        {/* route for search */}
                        <Route exact path="/" render={ (props) => {
                            const topic=props.location.search.replace("?searchTopic=","")
                            this.performSearch(topic);
                            if (this.state.isLoading) {return <Loading />}
                            return <PhotoContainer photos={this.state.photos} topic={this.state.topic} />
                        }} />
                        {/* routes for main topics */}
                        {mainTopics.map( (topic) => {
                            return (
                                <Route exact key={topic} path={`/${topic}`} render={ (props) => {
                                    this.performSearch(topic);
                                    if (this.state.isLoading) {return <Loading />}
                                    return <PhotoContainer photos={this.state.photos} topic={this.state.topic} />
                                }} />
                            )
                        })}
                        {/* // other routes*/}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    };
};

export default App;
