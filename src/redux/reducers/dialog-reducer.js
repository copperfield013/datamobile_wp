import  { CONFIRM }  from '../actions/dialog-actions';
/*const hideDialogAndDo = (callback)=>{
    _this.setState({dialogConfirmParam: null});
    if(typeof callback === 'function'){
        callback();
    }
};*/
const initialState = {
    dialogConfirmParam: {
        title   : "确认",
        content : "[未设置内容]",
        buttons : [{
            type: 'default',
            label: '取消',
            onClick: ()=>{}
        },
            {
                type: 'primary',
                label: '确定',
                onClick: ()=>{}
            }]
    }
}
export default function(state=initialState, action) {
    switch (action.type) {
        case CONFIRM: {
            return {
                ...state,
                dialogConfirmParam: action.payload
            }
        }

        default:
            return state;
    }
}