import { authConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};


export function authentication(state = initialState, action) {
    console.log("store triggered", state, action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case authConstants.LOGIN_FAILURE:
            return { loggedIn: false };
        case authConstants.LOGOUT:
            return { ...state, loggedIn: false };
        default:
            return state;
    }
}