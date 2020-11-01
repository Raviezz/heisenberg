import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getUserTypes
};

function login(user, password) {
    // console.log(user, password);
    const reqData = {
        "email": user,
        "password": password
    }
    console.log("reqData = ", reqData);
    const requestOptions = {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(reqData)
    };

    return axios({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        method: 'POST',
        withCredentials: false,
        url: 'http://localhost:8080/interview/auth/token/login',
        data: reqData
    })
        //.then(handleResponse)
        .then(data => {
            const user = data.data
            console.log("Token is ", user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(user.token));
            return user.data;
        });
}

function getUserTypes() {

    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

    return fetch('http://localhost:8080/interview/user/v1/get-user-types', requestOptions)
        .then(data => {

            return data.data;
        });
}

function register(email, phone, fname, lname, confirmPass, utype, urole) {

    const reqData = {
        "email": email,
        "password": confirmPass,
        "user_role": urole,
        "fname": fname,
        "lname": lname,
        "phone": phone,
        "user_type": utype

    }
    console.log("reqData = ", reqData);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
    };

    /* return fetch(`http://localhost:8080/bajaj/auth/register`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log("Registeration status  is ", response)
            return response;
        }); */

    setTimeout(function () { console.log("submitted returns"); }, 2000);
    return false;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function handleResponse(response) {
    console.log(response.status)
    const data = response.data;
    console.log("Final response is ", JSON.parse(data))
    //localStorage.setItem("response", data.status);

    if (response.status !== 200) {
        logout();
        const error = (data && data.errorMsg) || response.status;
        return Promise.reject(error);
    }

    return JSON.parse(data);

}