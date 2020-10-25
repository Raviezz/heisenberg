import { authConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('token'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case authConstants.LOGIN_FAILURE:
            return {loggedIn: false};
        case authConstants.LOGOUT:
            return {loggedIn: false};
        default:
            return state
    }
}