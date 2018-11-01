import {
    REGIST_MENU,
    UNREGIST_MENU,
    SET_TITLE,
    SHOW_SHEET,
    HIDE_SHEET
} from '../actions/page-actions';

export default function(state={}, action){
    switch (action.type) {
        case REGIST_MENU:
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
        case SHOW_SHEET: {
            if(action.payload && Array.isArray(action.payload.menus) && action.payload.menus.length > 0){
                return {
                    ...state,
                    globalSheetMenus    : action.payload.menus,
                    globalSheetCallback : action.payload.callback,
                    showGlobalSheet : true
                }
            }
            return state;
        }
        case HIDE_SHEET: {
            return {
                ...state,
                showGlobalSheet : false,
                globalSheetMenus: []
            }
        }
        default:
            return state;
    }
}