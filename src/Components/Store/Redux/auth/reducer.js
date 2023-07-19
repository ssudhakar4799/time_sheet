import { actionTypes } from "./action";


export const initialState = {
    isAuthentification: false,
    LoginDetails: [],
    getALLdatas: [],
    timesheet:[]
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                ...{ auth: {}, isAuthentification: true }
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{ auth: {}, isAuthentification: false }
            };
        case actionTypes.LOGINDETAILS:
            return {
                ...state,
                ...{ LoginDetails: action.payload }
            };
        case actionTypes.REGISTERDATAS:
            // let Registers={...action.payload};
            // state.RegisterDatas.push(Registers);
            return {
                ...state,
                ...{RegisterDatas:action.payload}
            };
            case actionTypes.GETALLDATASTORE:
                return {
                    ...state,
                    ...{ getALLdatas: action.payload }
                };
            case actionTypes.PARTICULARDELETE:
                    return {
                        ...state,
                        ...{ getALLdatas: state.getALLdatas.filter((task) => task.id !== action.payload)}
                    };
            case actionTypes.TIMESHEETS:
                return {
                    ...state,
                    ...{ timesheet: action.payload }
                };
            default:
            return state;
    };

}
export default reducer;