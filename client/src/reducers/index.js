import {combineReducers} from 'redux';

import auth from './auth_reducer';
import register from './signup_reducer';

export default combineReducers ({
    auth,
    register
});