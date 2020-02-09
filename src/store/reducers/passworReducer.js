import {  
        GET_PASSWORDS, 
        GET_PASSWORD , 
        ONLOAD_PASSWORDS,
        ONLOAD_PASSWORD,
        STATUS_ACTION_PASSWORD,
        SAVE_PASSWORDS_TEMP
} from "../actionTypes";
const initialState = {
    passwords: [],
    save_password_temp: [],
    password: null,
    onload_password: false,
    onload_passwords: false,
    status_action_password: false,
}

export default function passwordReducer(state = initialState, action) {  
    switch (action.type) {
        case GET_PASSWORDS:
            return {
                ...state,
                onload_passwords: false,
                passwords: action.data,
                save_password_temp: action.data,
                status_action_password: false,
            }
        case SAVE_PASSWORDS_TEMP:
            return {
                ...state,
                onload_password: false,
                passwords: action.filter
            }
        case GET_PASSWORD:
            return {
                ...state,
                onload_password: false,
                password: action.data
            }
        case ONLOAD_PASSWORDS: 
            return {
                ...state,
                onload_passwords: true,
            }
        case ONLOAD_PASSWORD:
            return {
                ...state,
                onload_password: true,
            }
        case STATUS_ACTION_PASSWORD:
            return {
                ...state,
                status_action_password: true
            }
        default:
            return state
    }
}