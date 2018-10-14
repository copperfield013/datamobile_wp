import { combineReducers } from 'redux';
//import dialogReducer from './reducers/dialog-reducer';
import pageReducer from './reducers/page-reducer';

const allReducers = {
    page        : pageReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;