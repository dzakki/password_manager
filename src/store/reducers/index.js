import { combineReducers } from "redux";
import user from "./userReducer";
import password from "./passworReducer";

const initialState = {
    success: null,
    errors: null
}
const general = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                success: action.data
            }
        case 'ERRORS':
            return {
                ...state,
                errors: action.data
            }
        default:
            return state
    }
}

export default combineReducers({
    general,
    password,
    user
})