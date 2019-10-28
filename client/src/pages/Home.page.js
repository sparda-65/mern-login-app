import React, { Component } from 'react';
import { AddForm } from '../components/index.component'

class Home extends Component {
    render() {
        return (
            <div>
                Home
                <AddForm />
            </div>
        );
    }
}

export { Home };