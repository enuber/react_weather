import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Get Weather - Using React Component State and Props
            </Link>
            <div className="right menu">
                <Link to="/" className="item">Home</Link>
            </div>
        </div>
    )
};

export default Header;