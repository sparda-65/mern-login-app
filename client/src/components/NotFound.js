import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/images/PageNotFound.png';

class NotFound extends Component {
    render() {
        return (
            <div>
                <img src={PageNotFound} alt="NotFound" style={{ width: 1100, height: 600, display: 'block', margin: 'auto', position: 'relative' }} />
                <center><Link to="/">Return to Home Page</Link></center>
            </div>
        );
    }
}
export { NotFound };