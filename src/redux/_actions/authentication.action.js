import { authConstants } from '../_constants';
import { history } from '../_helpers';
import { userService } from '../../services';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

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
                    toastr.success("Login Successfull!");
                    dispatch(success(user));
                    localStorage.setItem('user', user);
                    setTimeout(function () {
                        history.push('/home');
                        window.location.reload();
                    }, 2000);

                },
                error => {
                    console.log("Failed to login", error.toString());
                    toastr.error(error.toString());
                    dispatch(failure(error.toString()));

                }
            );
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user: user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user: user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: authConstants.LOGOUT };
}