import { authConstants } from '../_constants';
import { history } from '../_helpers';
import { userService } from '../../services';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        console.log("Dispactched request", username, password);
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/home');
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));

                }
            );
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: authConstants.LOGOUT };
}