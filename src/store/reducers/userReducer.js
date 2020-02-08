import { SET_USER } from '../actionTypes';
const initialState = {}

export default function userReducer(state = initialState, action) {  
    switch (action.type) {
        case SET_USER:
            return {
                ...action.data
            }
        default:
            return state
    }
}