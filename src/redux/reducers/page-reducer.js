import {
    REGIST_MENU,
    UNREGIST_MENU,
    SET_TITLE
} from '../actions/page-actions';

export default function(state={}, action){
    switch (action.type) {
        case REGIST_MENU:
            console.log(111);
            console.log(state);
            let res = {
                ...state,
                onMenuClick: action.payload.onMenuClick
            }
            console.log(res);
            return res;
        case UNREGIST_MENU:{
            if(state.onMenuClick === action.payload.onMenuClick){
                return {
                    ...state,
                    onMenuClick: null
                }
            }
            return state
        }
        case SET_TITLE:{
            if(state.title !== action.payload){
                return {
                    ...state,
                    title: action.payload
                }
            }
            return state;
        }
        default:
            return state;
    }
}