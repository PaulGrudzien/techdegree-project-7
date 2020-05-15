import React from 'react';
import { NavLink } from 'react-router-dom';

// main Topics
import mainTopics from '../mainTopics.js'

function Nav() {
    return (
      <nav className="main-nav">
        <ul>
            {mainTopics.map( (topic, index) => <li key={index}><NavLink to={`/${topic}`} key={index}>{topic}</NavLink></li>)}
        </ul>
      </nav>
    );
};

export default Nav;
