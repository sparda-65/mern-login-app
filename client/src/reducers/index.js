import {combineReducers} from 'redux';

import auth from './auth_reducer';
import register from './signup_reducer';
import pop from './pop_reducer';

export default combineReducers ({
    auth,
    register,
    pop
});