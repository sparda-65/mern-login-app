import { POP_SAVED,SAVING_FAILED,SAVING_ATTEMPTING } from './types';
import { apisavePop} from '../api'

export const savePop = pop => {
    return async dispatch =>{
        try {
            dispatch({ type: SAVING_ATTEMPTING });
            const {data} = await apisavePop(pop);
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
    return { type: POP_SAVED };
};

const error = (error) => {
    return { type: SAVING_FAILED, payload: error }
};