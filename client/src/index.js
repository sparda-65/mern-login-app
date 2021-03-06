import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {onLoadingSignIn} from './actions';

store.dispatch(onLoadingSignIn());

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.unregister();
