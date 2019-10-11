import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, USER_LOGOUT } from './types';
import { apiLogin } from '../api/user'
const TOKEN_NAME = 'Login_app_token';

export const signIn = (request_data) => {
    return async dispatch => {
        try {
            dispatch({ type: AUTH_ATTEMPTING });
            const { data: { token } } = await apiLogin(request_data);
            dispatch(success(token));
        } catch (e) {
            const { response: { data } } = e;
            dispatch(error(data.error));
        }
    };
}

export const onLoadingSignIn = () => {
    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME);
            if (token === null || token === 'undefined') {
                return dispatch(error('Il faut vous identifier'));
            }
            dispatch(success(token));
        } catch (e) {
            console.error(e);
        }
    }
}

export const logUserOut = () => {
    localStorage.removeItem(TOKEN_NAME);
    return ({ type: USER_LOGOUT });
}

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
    return { type: AUTH_SUCCESS };
};

const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
};