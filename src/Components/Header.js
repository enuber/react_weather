import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/apps/weather_react/" className="item">
                Get Weather - Using React Class Based State and Props Only
            </Link>
            <div className="right menu">
                <Link to="/apps/weather_react/" className="item">Home</Link>
            </div>
        </div>
    )
};

export default Header;