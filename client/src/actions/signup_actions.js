import { SIGNUP_ATTEMPTING,SIGNUP_SUCCESS,SIGNUP_FAILED, PROFILE_FETCHED } from '../actions/types';
import { apiSignUp , getProfile,setAuthHeader} from '../api'
const TOKEN_NAME = 'Login_app_token';

export const signUp = (request_data) => {
    return async dispatch => {
        try {
            dispatch({ type: SIGNUP_ATTEMPTING });
            const data=await apiSignUp(request_data);
            console.log(data);
            dispatch(success());
        } catch (e) {
            const { response: { data } } = e;
            console.log(data.error);
            dispatch(error(data.error));
        }
    };
}

const success = () => {
    return { type: SIGNUP_SUCCESS };
};

const error = (error) => {
    return { type: SIGNUP_FAILED, payload: error }
};