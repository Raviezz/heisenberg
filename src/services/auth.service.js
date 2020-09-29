

export const userService = {
    login,
    logout
};

function login(user, password) {
    console.log(user, password);
    const reqData = {
        "name": "raviteja",
        "userId": 123,
        "userRole": "admin"
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'App-Origin': '8' },
        body: JSON.stringify(reqData)
    };

    return fetch(`http://localhost:8080/bajaj/auth/token`, requestOptions)
        .then(handleResponse)
        .then(token => {
            console.log("Token is ", token)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(token.token));

            return token.token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}