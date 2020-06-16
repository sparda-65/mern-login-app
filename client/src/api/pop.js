import axios from 'axios';

export const apisavePop = pop =>{
    return axios.post('/api/v1/pop',pop);
}