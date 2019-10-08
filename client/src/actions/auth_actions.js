import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED } from './types';
import axios from 'axios';

export const signIn = (request_data) => {
    return async dispatch => {
        try {
            const {data} = await axios.post('http://localhost:5000/api/v1/auth', request_data);
            console.log(data);
        } catch (e) {
            console.error(e.response.data);
        }
    };
}