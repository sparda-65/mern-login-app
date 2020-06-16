import {POP_SAVED,SAVING_FAILED,SAVING_ATTEMPTING} from '../actions/types';

const INITIAL_STATE = {
    saved:false,
    attempting: false,
    error:null,
    
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SAVING_ATTEMPTING:
            return {
                ...state,
                attempting: true,
                saved:false,
                error: null
        }    
        case POP_SAVED:
            return { 
                ...state, 
                attempting: false,
                saved:true
        }
        case SAVING_FAILED:
            return {
                ...state,
                saved:false,
                attempting: false,
                error: action.payload
            }    

    default:
        return state
    }
}
