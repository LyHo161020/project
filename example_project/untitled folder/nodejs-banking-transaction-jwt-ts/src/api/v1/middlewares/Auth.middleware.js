const jwtDecode = require("jwt-decode");
// import jwtDecode from "jwt-decode";

let hasToken = (req, res, next) => {

    var token = req.cookies.JWT;

    if (token) {
        try {
            token = jwtDecode(token);

            let exp = new Date(token.exp * 1000);
            let timeNow = new Date();

            if (exp < timeNow) {
                res.redirect('/login');
            }

            next();
        } catch (error) {
            res.redirect('/login');
            // return res.status(401).json({
            //     message: 'Unauthorized.',
            // });
        }
    }
    else {
        res.redirect('/login');
        // return res.status(403).send({
        //     message: 'No token provided.',
        // });
    }   
}

let AuthMiddleware = {
    hasToken
}

module.exports = AuthMiddleware