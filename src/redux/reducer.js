import { combineReducers } from 'redux';
import dialogReducer from './reducers/dialog-reducer';


const allReducers = {
    dialog      : dialogReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;