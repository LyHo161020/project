const cookie = require('cookie');
const jwtDecode = require("jwt-decode");
// import jwtDecode from "jwt-decode";

let isValidToken = (socket) => {

    let isValid = false;
    var jsonToken = socket.request.headers.cookie;
    var token = cookie.parse(jsonToken);
    let jwt = token.JWT;

    if (jwt) {
        try {
            jwt = jwtDecode(jwt);

            let exp = new Date(jwt.exp * 1000);
            let timeNow = new Date();

            if (exp < timeNow) {
                console.log("token expored");
                next(new Error("token expored"));
                // socket.res.status(401).json({
                //     message: 'Unauthorized - Your access token has expired or is not valid.',
                // });
            }
            else {
                console.log('Token is valid');

                isValid = true;
            }
        } catch (error) {
            console.log("token error");
            next(new Error("token error"));
            // socket.res.status(401).json({
            //     message: 'Unauthorized.',
            // });
        }
    }
    else {
        console.log("token not provided");
        next(new Error("token not provided"));
        // socket.res.status(403).send({
        //     message: 'No token provided.',
        // });
    }

    return isValid;
}

let SocketMiddleware = {
    isValidToken
}

module.exports = SocketMiddleware