import axios from 'axios';


export const userService = {
    login,
    logout,
    register,
    getUserTypes,
    getSftTypes
};

function login(user, password) {
    // console.log(user, password);
    const reqData = {
        "email": user,
        "password": password
    }
    console.log("reqData = ", reqData);

    return axios({
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        method: 'POST',
        withCredentials: false,
        url: 'http://localhost:8080/interview/auth/token/login',
        data: reqData
    })
        .then(handleResponse)
        .then(data => {
            console.log("Token is ", data.token)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', data.data);

            return JSON.stringify(data.data);
        });
}

function getUserTypes() {

    return axios({
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Accept': 'application/json'
        },
        method: 'GET',
        withCredentials: false,
        url: 'http://localhost:8080/interview/user/v1/get-user-types',
    })
        .then(handleResponse)
        .then(data => {
            console.log("data is ", data);
            return data.data;
        });
}

function getSftTypes() {
    return axios({
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Accept': 'application/json'
        },
        method: 'GET',
        withCredentials: false,
        url: 'http://localhost:8080/interview/user/v1/get-sft-roles',
    })
        .then(handleResponse)
        .then(data => {
            console.log("data is ", data);
            return data.data;
        });
}

function register(email, phone, fname, lname, confirmPass, utype, urole) {

    const reqData = {
        "email": email,
        "password": confirmPass,
        "sft_role_id": urole,
        "fname": fname,
        "lname": lname,
        "phone": phone,
        "user_type_id": utype

    }
    return axios({
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        method: 'POST',
        withCredentials: false,
        url: 'http://localhost:8080/interview/user/v1/register',
        data: reqData
    })
        .then(handleResponse)
        .then(data => {
            console.log("data is ", data.status)
            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function handleResponse(response) {
    console.log(response)
    const data = response.data;
    if (response.status !== 200) {
        logout();
        const error = (data && data.errorMsg) || response.status;
        return Promise.reject(error);
    }

    return data;

}