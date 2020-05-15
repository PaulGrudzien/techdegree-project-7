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

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            photos: [],
            topic: "",
            isLoading: true
        };
    }

    performSearch = (topic) => {
        if (this.state.topic !== topic) {
            const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${topic}&per_page=24&format=json&nojsoncallback=1`;
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
                    <SearchForm onSearch={this.performSearch}/>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={null} />
                        <Route exact path="/:topic" render={ (props) => {
                            this.performSearch(props.match.params.topic);
                            if (this.state.isLoading) {return <Loading />}
                            return <PhotoContainer photos={this.state.photos} topic={this.state.topic} />
                        }} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    };
};

export default App;
