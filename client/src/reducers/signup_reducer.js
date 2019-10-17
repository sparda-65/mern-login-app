import { SIGNUP_ATTEMPTING,SIGNUP_SUCCESS,SIGNUP_FAILED, PROFILE_FETCHED } from '../actions/types';

const INITIAL_STATE = {
    attempting: false,
    isregister: false,
    profile: {},
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_ATTEMPTING:
            return {
                ...state,
                attempting: true,
                isregister: false,
                error: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                attempting: false,
                isregister: true,
                error: null
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                attempting: false,
                isregister: false,
                error: action.payload
            }
        case PROFILE_FETCHED:
            return {
                ...state,
                profile: action.payload,
            }
        default:
            return state
    }
}