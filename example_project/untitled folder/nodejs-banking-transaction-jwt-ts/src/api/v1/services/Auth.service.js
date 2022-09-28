const Page = require('../models/Page.model');


let login = (socket, data) => {
    console.log("login: ==========");
    console.log(data)
    instanceAxios.post(Page.urls.login, data)
        .then(function (resp) {
            socket.emit("login-success", resp.data.token);
        })
        .catch(function (error) {
            socket.emit("login-error", error.response);
        });
}

let register = (socket, data) => {
    instanceAxios.post(Page.urls.register, data)
        .then(function () {
            socket.emit("register-success");
        })
        .catch(function (jqXHR) {
            let statusCode = null;

            console.log(jqXHR);

            if (jqXHR.response == undefined) {
                statusCode = 502;
            }
            else {
                statusCode = jqXHR.response.status;
            }

            let obj = {
                statusCode: statusCode,
                errors: null
            }

            if (statusCode === 400 || statusCode === 409) {
                obj.errors = jqXHR.response.data;
            }

            socket.emit("register-error", JSON.stringify(obj));
        });
}


let AuthService = {
    login,
    register
}

module.exports = AuthService;