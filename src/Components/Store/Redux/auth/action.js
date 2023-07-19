
export const actionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    LOGINDETAILS:"LOGINDETAILS",
    REGISTERDATAS:"REGISTERDATAS",
    GETALLDATASTORE:"GETALLDATASTORE",
    PARTICULARDELETE:"PARTICULARDELETE",
    TIMESHEETS:"TIMESHEETS"
}
export function login() {
    return {type: actionTypes.LOGIN}
}
export function logout (){
    return{type:actionTypes.LOGOUT}
}
export function loginData (payload){
    return{type:actionTypes.LOGINDETAILS,payload}
}
export function registerStoreDetails(payload) {
    return{type:actionTypes.REGISTERDATAS,payload}
    
}
export function getAlldataStore(payload) {
    return{type:actionTypes.GETALLDATASTORE,payload}
    
}
export function deletDataUi(payload) {
    return{type:actionTypes.PARTICULARDELETE,payload}
    
}
export function timeSheet(payload) {
    return{type:actionTypes.TIMESHEETS,payload}
    
}
