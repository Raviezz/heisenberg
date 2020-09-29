export const openTokService = {
    getSessionDetails
};

function getSessionDetails() {

    const token = 'Bearer ' + localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token }
    };
    return fetch(`http://localhost:8080/bajaj/api/v1/get-opentok-session`, requestOptions)
        .then(data => {
            console.log("Session details are ", data)
            return data;
        });
}