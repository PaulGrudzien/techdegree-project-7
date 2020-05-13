import React from 'react';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

function App() {
    return (
        <div className="container">
            <SearchForm />
            <Nav />
            <PhotoContainer />
        </div>
    );
};

export default App;
