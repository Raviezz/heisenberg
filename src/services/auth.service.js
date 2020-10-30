

export const userService = {
    login,
    logout,
    register
};

function login(user, password) {
    // console.log(user, password);
    const reqData = {
        "email": user,
        "password": password
    }
    console.log("reqData = ", reqData);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
    };

    return fetch(`http://localhost:8080/interview/auth/token`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log("Token is ", data.token)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(data.token));
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
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        //localStorage.setItem("response", data.status);

        if (!response.ok) {
            if (response.status === 401 || response.status === 500) {
                logout();

            }
            const error = (data && data.errorMsg) || response.status;
            return Promise.reject(error);
        }

        return data;
    });
}